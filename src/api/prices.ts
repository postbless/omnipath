export interface TokenPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
}

// Кэш для цен
let priceCache: TokenPrice[] = []
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 минут

// Сохранение в кэш
function cachePrices(prices: TokenPrice[]) {
  try {
    priceCache = prices
    cacheTime = Date.now()
    localStorage.setItem('omnipath_price_cache', JSON.stringify({
      prices,
      timestamp: cacheTime,
    }))
  } catch (error) {
    console.warn('Failed to cache prices:', error)
  }
}

// Получение из кэша
function getCachedPrices(): TokenPrice[] {
  // Пробуем localStorage
  if (priceCache.length === 0) {
    try {
      const cached = localStorage.getItem('omnipath_price_cache')
      if (cached) {
        const { prices, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_TTL) {
          priceCache = prices
          cacheTime = timestamp
        }
      }
    } catch (error) {
      console.warn('Failed to load cache:', error)
    }
  }

  // Проверяем актуальность
  if (Date.now() - cacheTime < CACHE_TTL) {
    return priceCache
  }

  // Возвращаем дефолтные данные если кэш устарел
  return [
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 2500, price_change_percentage_24h: 0, market_cap: 0, total_volume: 0, high_24h: 0, low_24h: 0 },
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 65000, price_change_percentage_24h: 0, market_cap: 0, total_volume: 0, high_24h: 0, low_24h: 0 },
  ]
}

// Основная функция получения цен
export async function getTokenPrices(
  ids: string[] = [
    'ethereum',
    'bitcoin',
    'polygon',
    'arbitrum',
    'optimism',
    'avalanche-2',
    'fantom',
    'cosmos',
    'bnb',
    'solana',
  ]
): Promise<TokenPrice[]> {
  try {
    const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
    url.searchParams.append('vs_currency', 'usd')
    url.searchParams.append('ids', ids.join(','))
    url.searchParams.append('order', 'market_cap_desc')
    url.searchParams.append('per_page', '100')
    url.searchParams.append('page', '1')
    url.searchParams.append('sparkline', 'false')
    url.searchParams.append('price_change_percentage', '24h')

    // Используем прокси для обхода CORS
    const proxyUrl = 'https://api.allorigins.win/raw?url='
    const targetUrl = encodeURIComponent(url.toString())

    const response = await fetch(proxyUrl + targetUrl, {
      cache: 'no-store',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 429) {
        // Rate limit - используем кэш
        console.warn('Coingecko rate limit, using cached data')
        return getCachedPrices()
      }
      throw new Error(`Coingecko API error: ${response.status}`)
    }

    const data = await response.json()
    cachePrices(data)
    return data
  } catch (error) {
    console.error('Error fetching prices:', error)
    return getCachedPrices()
  }
}

// Получение цены одного токена
export async function getTokenPrice(id: string): Promise<number> {
  const prices = await getTokenPrices([id])
  return prices.find(p => p.id === id)?.current_price || 0
}

// Получение цен для портфолио
export async function getPortfolioPrices(addresses: string[]): Promise<Record<string, number>> {
  // Простая реализация через Coingecko
  // Для production лучше использовать Moralis или Alchemy
  const prices: Record<string, number> = {}
  
  for (const address of addresses) {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`
      )
      if (response.ok) {
        const data = await response.json()
        prices[address] = data.market_data?.current_price?.usd || 0
      }
    } catch (error) {
      console.warn(`Failed to fetch price for ${address}:`, error)
      prices[address] = 0
    }
  }
  
  return prices
}

// История цен для графика
export async function getTokenPriceHistory(
  id: string,
  days: number = 7
): Promise<{ timestamp: number; price: number }[]> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    )
    
    if (!response.ok) throw new Error('Failed to fetch history')
    
    const data = await response.json()
    return data.prices.map((item: [number, number]) => ({
      timestamp: item[0],
      price: item[1],
    }))
  } catch (error) {
    console.error('Error fetching price history:', error)
    return []
  }
}

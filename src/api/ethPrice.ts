// Кэш для цены ETH
let ethPriceCache: number = 2500
let cacheTime: number = 0
const CACHE_TTL = 60 * 1000 // 1 минута

/**
 * Получение реальной цены ETH через публичные API без CORS
 */
export async function getETHPrice(): Promise<number> {
  // Проверяем кэш
  if (Date.now() - cacheTime < CACHE_TTL && ethPriceCache > 0) {
    return ethPriceCache
  }

  // Список API которые работают без CORS
  const apis = [
    // Binance public API (без CORS)
    'https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT',
    // Coinbase public API
    'https://api.coinbase.com/v2/prices/ETH-USD/spot',
  ]

  for (const url of apis) {
    try {
      const response = await fetch(url, { cache: 'no-store' })
      if (!response.ok) continue

      const data = await response.json()
      
      let price: number
      if ('price' in data) {
        price = parseFloat(data.price)
      } else if ('data' in data && 'amount' in data.data) {
        price = parseFloat(data.data.amount)
      } else {
        continue
      }

      if (price > 0) {
        ethPriceCache = price
        cacheTime = Date.now()
        return price
      }
    } catch (error) {
      console.warn(`Failed to fetch from ${url}:`, error)
      continue
    }
  }

  // Fallback к кэшу
  console.warn('All APIs failed, using cached:', ethPriceCache)
  return ethPriceCache || 2500
}

/**
 * Конвертация Gwei в USD
 * @param gwei - цена в Gwei
 * @param ethPrice - цена ETH в USD (опционально)
 */
export function gweiToUSD(gwei: number, ethPrice?: number): number {
  const price = ethPrice || ethPriceCache
  // 1 Gwei = 0.000000001 ETH
  return gwei * 0.000000001 * price
}

/**
 * Конвертация Gwei в ETH
 */
export function gweiToETH(gwei: number): number {
  return gwei * 0.000000001
}

/**
 * Форматирование цены в USD
 */
export function formatUSD(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(price)
}

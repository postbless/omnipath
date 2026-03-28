// Кэш для цены ETH
let ethPriceCache: number = 2500
let cacheTime: number = 0
const CACHE_TTL = 60 * 1000 // 1 минута

/**
 * Получение реальной цены ETH из Coingecko
 */
export async function getETHPrice(): Promise<number> {
  // Проверяем кэш
  if (Date.now() - cacheTime < CACHE_TTL && ethPriceCache > 0) {
    return ethPriceCache
  }

  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      { cache: 'no-store' }
    )

    if (!response.ok) {
      throw new Error('Coingecko API error')
    }

    const data = await response.json()
    const price = data.ethereum?.usd || 2500

    // Обновляем кэш
    ethPriceCache = price
    cacheTime = Date.now()

    return price
  } catch (error) {
    console.warn('Failed to fetch ETH price, using cached:', ethPriceCache)
    return ethPriceCache || 2500
  }
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

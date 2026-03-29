// Кэш для данных Tron
let tronCache: { energyPrice: number; bandwidthPrice: number } | null = null
let tronCacheTime = 0
const TRON_CACHE_TTL = 60 * 1000 // 1 минута

/**
 * Получение данных о газе Tron (дефолтные значения - API не поддерживает CORS)
 */
export async function getTronGasData(): Promise<{
  energyPrice: number  // в Sun
  bandwidthPrice: number  // в Sun
  energyFeeInTRX: number
}> {
  // Проверяем кэш
  if (tronCache && Date.now() - tronCacheTime < TRON_CACHE_TTL) {
    return {
      ...tronCache,
      energyFeeInTRX: tronCache.energyPrice * 420,
    }
  }

  // Используем дефолтные значения (TronGrid API не поддерживает CORS из браузера)
  const energyPrice = 420
  const bandwidthPrice = 1000

  // Кэшируем
  tronCache = { energyPrice, bandwidthPrice }
  tronCacheTime = Date.now()

  return {
    energyPrice,
    bandwidthPrice,
    energyFeeInTRX: energyPrice * 420 / 1_000_000,
  }
}

/**
 * Конвертация Sun в TRX
 * 1 TRX = 1,000,000 Sun
 */
export function sunToTRX(sun: number): number {
  return sun / 1_000_000
}

/**
 * Конвертация TRX в USD
 */
export async function getTRXPrice(): Promise<number> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd',
      { cache: 'no-store' }
    )
    const data = await response.json()
    return data.tron?.usd || 0.12
  } catch {
    return 0.12
  }
}

// Кэш для данных Tron
let tronCache: { energyPrice: number; bandwidthPrice: number } | null = null
let tronCacheTime = 0
const TRON_CACHE_TTL = 60 * 1000 // 1 минута

/**
 * Получение реальных данных о газе Tron из API
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
      energyFeeInTRX: tronCache.energyPrice * 420, // примерное значение
    }
  }

  try {
    // TronGrid API - получаем параметры сети
    const [energyResponse, bandwidthResponse] = await Promise.all([
      fetch('https://api.trongrid.io/wallet/getchainparameters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }).catch(() => null),
      fetch('https://api.trongrid.io/wallet/getnetworkinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      }).catch(() => null),
    ])

    let energyPrice = 420 // дефолт в Sun
    let bandwidthPrice = 1000 // дефолт в Sun

    if (energyResponse?.ok) {
      const data = await energyResponse.json()
      // energy_fee в Sun
      energyPrice = data.energy_fee || 420
    }

    if (bandwidthResponse?.ok) {
      const data = await bandwidthResponse.json()
      // bandwidth_price в Sun
      bandwidthPrice = data.bandwidth_price || 1000
    }

    // Кэшируем
    tronCache = { energyPrice, bandwidthPrice }
    tronCacheTime = Date.now()

    return {
      energyPrice,
      bandwidthPrice,
      energyFeeInTRX: energyPrice * 420 / 1_000_000, // конвертируем в TRX
    }
  } catch (error) {
    console.warn('Failed to fetch Tron gas data:', error)
    return {
      energyPrice: 420,
      bandwidthPrice: 1000,
      energyFeeInTRX: 0.176,
    }
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

# 🔌 OmniPath Бесплатные API - Полное Руководство

## 📊 Обзор API

### Реальное время (Бесплатно)

| API | Данные | Лимиты | WebSocket |
|-----|--------|--------|-----------|
| **Etherscan** | Газ Ethereum | 5/sec | ❌ |
| **Gas Now** | Газ Ethereum | Безлимит | ❌ |
| **L2Fees** | Газ L2 сетей | Безлимит | ❌ |
| **Li.Fi** | Мосты | 1000/day | ❌ |
| **Coingecko** | Цены | 10-50/min | ❌ |
| **EthGasStation** | Газ Ethereum | Безлимит | ❌ |
| **Blocknative** | Газ (мемпул) | 3/sec | ✅ |
| **Socket** | Мосты | Безлимит | ❌ |

---

## 🚀 Быстрый старт

### Шаг 1: Создайте `.env.local`

```env
# D:\dashboard 2\.env.local

# Etherscan (обязательно)
VITE_ETHERSCAN_API_KEY=your_key_here

# Gas Now (не требуется ключ)
# EthGasStation (не требуется ключ)

# L2Fees (не требуется ключ)

# Coingecko (опционально)
VITE_COINGECKO_API_KEY=your_key_here

# Li.Fi (опционально)
VITE_LIFI_API_KEY=your_key_here

# Blocknative (опционально)
VITE_BLOCKNATIVE_API_KEY=your_key_here
```

### Шаг 2: Получите ключи

#### Etherscan API Key (1 минута)
1. https://etherscan.io/myapikey
2. Sign up / Login
3. Create API Key → Rate-Limited
4. Копируйте ключ

#### Coingecko API Key (5 минут)
1. https://www.coingecko.com/api/pricing
2. Выберите "Demo" план
3. Зарегистрируйтесь
4. Ключ придёт на email

#### Li.Fi API Key (24 часа)
1. https://li.fi/
2. Footer → "Get API Key"
3. Заполните форму
4. Ждите email

---

## 📡 Реализация API

### 1. Gas Prices (Ethereum)

#### Вариант A: Etherscan (требуется ключ)

```typescript
// src/api/gas.ts

const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY

export interface GasOracle {
  SafeGasPrice: string
  ProposeGasPrice: string
  FastGasPrice: string
  suggestBaseFee: string
  gasUsedRatio: string
}

export async function getEtherscanGasPrice(): Promise<GasOracle> {
  const response = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
  )
  
  const data = await response.json()
  
  if (data.status !== '1') {
    throw new Error(data.message || 'Etherscan API Error')
  }
  
  return data.result
}

// Использование
const gas = await getEtherscanGasPrice()
console.log('Slow:', gas.SafeGasPrice, 'Gwei')
console.log('Fast:', gas.FastGasPrice, 'Gwei')
```

#### Вариант B: Gas Now (без ключа) ⭐ РЕКОМЕНДУЮ

```typescript
// src/api/gas.ts

export interface GasNowData {
  code: number
  data: {
    rapid: number
    fast: number
    standard: number
    slow: number
    timestamp: number
  }
}

export async function getGasNowPrice(): Promise<GasNowData> {
  const response = await fetch(
    'https://www.gasnow.org/api/v3/gas/price'
  )
  
  return await response.json()
}

// Использование
const gas = await getGasNowPrice()
console.log('Fast:', gas.data.fast / 1e9, 'Gwei') // конвертируем из Wei
```

#### Вариант C: EthGasStation (без ключа)

```typescript
// src/api/gas.ts

export interface EthGasStationData {
  fast: number
  fastest: number
  safeLow: number
  average: number
  blockNum: number
}

export async function getEthGasStationPrice(): Promise<EthGasStationData> {
  const response = await fetch(
    'https://ethgasstation.info/json/ethgasAPI.json'
  )
  
  return await response.json()
}

// Использование
const gas = await getEthGasStationPrice()
console.log('Fast:', gas.fast / 10, 'Gwei') // делим на 10
```

---

### 2. L2 Gas Prices (Arbitrum, Optimism, Base, Polygon)

#### L2Fees.info (без ключа) ⭐ РЕКОМЕНДУЮ

```typescript
// src/api/l2fees.ts

export interface L2FeeData {
  id: string
  name: string
  symbol: string
  txFee: number
  avgTxFee: number
  usdTokenPrice: number
}

export async function getL2Fees(): Promise<L2FeeData[]> {
  const response = await fetch(
    'https://l2fees.info/api/data.json'
  )
  
  return await response.json()
}

// Использование
const fees = await getL2Fees()
fees.forEach(network => {
  console.log(`${network.name}: $${network.txFee.toFixed(2)}`)
})
```

#### L2Beat (без ключа)

```typescript
// src/api/l2beat.ts

export async function getL2BeatData() {
  const response = await fetch(
    'https://api.l2beat.com/api/tvl'
  )
  
  return await response.json()
}
```

---

### 3. Token Prices (Coingecko)

#### Coingecko Free API (без ключа для базовых запросов)

```typescript
// src/api/prices.ts

export interface TokenPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

export async function getTokenPrices(ids: string[] = ['ethereum', 'bitcoin', 'polygon']): Promise<TokenPrice[]> {
  const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
  url.searchParams.append('vs_currency', 'usd')
  url.searchParams.append('ids', ids.join(','))
  url.searchParams.append('order', 'market_cap_desc')
  url.searchParams.append('per_page', '100')
  url.searchParams.append('page', '1')
  url.searchParams.append('sparkline', 'false')
  
  const response = await fetch(url.toString())
  
  if (!response.ok) {
    // Rate limit - ждём
    if (response.status === 429) {
      await new Promise(r => setTimeout(r, 1000))
      return getTokenPrices(ids)
    }
    throw new Error('Coingecko API Error')
  }
  
  return await response.json()
}

// Использование
const prices = await getTokenPrices(['ethereum', 'bitcoin', 'polygon', 'arbitrum', 'optimism'])
const ethPrice = prices.find(p => p.id === 'ethereum')?.current_price || 0
console.log('ETH Price:', ethPrice)
```

#### Coingecko Pro (с ключом)

```typescript
// src/api/prices.ts

const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

export async function getCoingeckoProPrices(ids: string[]) {
  const url = new URL('https://pro-api.coingecko.com/api/v3/coins/markets')
  url.searchParams.append('vs_currency', 'usd')
  url.searchParams.append('ids', ids.join(','))
  
  const response = await fetch(url.toString(), {
    headers: {
      'x-cg-pro-api-key': COINGECKO_API_KEY,
    },
  })
  
  return await response.json()
}
```

---

### 4. Bridge Routes (Li.Fi)

```typescript
// src/api/bridges.ts

const LIFI_API_KEY = import.meta.env.VITE_LIFI_API_KEY

export interface LiFiRoute {
  id: string
  fromChainId: number
  toChainId: number
  fromTokenAddress: string
  toTokenAddress: string
  fromAmount: string
  toAmount: string
  fee: string
  estimatedTime: number
  steps: any[]
}

export async function getLiFiRoutes(params: {
  fromChain: number
  toChain: number
  fromToken: string
  toToken: string
  amount: string
}): Promise<LiFiRoute[]> {
  const url = new URL('https://li.quest/v1/advanced/routes')
  url.searchParams.append('fromChain', params.fromChain.toString())
  url.searchParams.append('toChain', params.toChain.toString())
  url.searchParams.append('fromToken', params.fromToken)
  url.searchParams.append('toToken', params.toToken)
  url.searchParams.append('fromAmount', params.amount)
  
  const headers: Record<string, string> = {}
  if (LIFI_API_KEY) {
    headers['x-lifi-api-key'] = LIFI_API_KEY
  }
  
  const response = await fetch(url.toString(), { headers })
  
  if (!response.ok) {
    throw new Error('Li.Fi API Error')
  }
  
  const data = await response.json()
  return data.routes || []
}

// Использование
const routes = await getLiFiRoutes({
  fromChain: 1, // Ethereum
  toChain: 42161, // Arbitrum
  fromToken: '0x0000000000000000000000000000000000000000', // ETH
  toToken: '0x0000000000000000000000000000000000000000', // ETH
  amount: '1000000000000000000', // 1 ETH в Wei
})
```

---

### 5. Socket API (альтернатива Li.Fi)

```typescript
// src/api/bridges.ts

export async function getSocketRoutes(params: {
  fromChainId: number
  toChainId: number
  fromTokenAddress: string
  toTokenAddress: string
  userAddress: string
  fromAmount: string
}) {
  const url = new URL('https://api.socket.tech/v2/routes')
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  
  const response = await fetch(url.toString())
  return await response.json()
}
```

---

## 🔄 Интеграция в проект

### Обновите `src/api/gas.ts`

```typescript
// src/api/gas.ts

import type { GasPrice, AIPrediction } from '../types'

// === API Функции ===

async function getEtherscanGas() {
  const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY
  const response = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
  )
  const data = await response.json()
  if (data.status !== '1') throw new Error(data.message)
  return data.result
}

async function getGasNow() {
  const response = await fetch('https://www.gasnow.org/api/v3/gas/price')
  const data = await response.json()
  return data.data
}

async function getEthGasStation() {
  const response = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
  return await response.json()
}

// === Основная функция ===

export async function getGasPrices(): Promise<{
  success: boolean
  data: GasPrice[]
  predictions: Record<number, AIPrediction>
  lastUpdated: number
}> {
  try {
    // Пробуем разные источники
    let ethGasPrice = 25 // дефолт
    
    try {
      const gasNow = await getGasNow()
      ethGasPrice = gasNow.fast / 1e9 // конвертируем в Gwei
    } catch {
      try {
        const ethGasStation = await getEthGasStation()
        ethGasPrice = ethGasStation.fast / 10
      } catch {
        try {
          const etherscan = await getEtherscanGas()
          ethGasPrice = parseFloat(etherscan.FastGasPrice)
        } catch {
          console.warn('All gas APIs failed, using default')
        }
      }
    }

    // L2 Fees
    const l2Response = await fetch('https://l2fees.info/api/data.json')
    const l2Fees = await l2Response.json()
    
    // Формируем данные
    const gasData: GasPrice[] = [
      {
        chainId: 1,
        chainName: 'Ethereum',
        timestamp: Date.now(),
        prices: {
          slow: {
            maxPriorityFeePerGas: 0.5,
            maxFeePerGas: ethGasPrice * 0.8,
            estimatedTime: '~5 min',
          },
          average: {
            maxPriorityFeePerGas: 1.2,
            maxFeePerGas: ethGasPrice,
            estimatedTime: '~2 min',
          },
          fast: {
            maxPriorityFeePerGas: 2.5,
            maxFeePerGas: ethGasPrice * 1.2,
            estimatedTime: '~30 sec',
          },
        },
        baseFee: ethGasPrice,
        trend: ethGasPrice < 30 ? 'down' : ethGasPrice > 50 ? 'up' : 'stable',
      },
      // L2 сети из API
      ...l2Fees.map((network: any) => ({
        chainId: getChainId(network.name),
        chainName: network.name,
        timestamp: Date.now(),
        prices: {
          slow: {
            maxPriorityFeePerGas: network.txFee * 0.8,
            maxFeePerGas: network.txFee,
            estimatedTime: '~3 min',
          },
          average: {
            maxPriorityFeePerGas: network.txFee,
            maxFeePerGas: network.txFee * 1.2,
            estimatedTime: '~1 min',
          },
          fast: {
            maxPriorityFeePerGas: network.txFee * 1.5,
            maxFeePerGas: network.txFee * 2,
            estimatedTime: '~30 sec',
          },
        },
        baseFee: network.txFee,
        trend: 'stable' as const,
      })),
    ]

    // AI Predictions
    const predictions: Record<number, AIPrediction> = {}
    gasData.forEach(gas => {
      predictions[gas.chainId] = {
        recommendation: gas.baseFee < 30 ? 'buy' : gas.baseFee > 50 ? 'urgent' : 'wait',
        message: gas.baseFee < 30 
          ? 'Низкий газ - отличное время для транзакции!' 
          : gas.baseFee > 50 
          ? 'Высокий газ - рассмотрите ожидание'
          : 'Газ в норме',
        expectedChange: gas.trend === 'down' ? -10 : gas.trend === 'up' ? 15 : 0,
        timeUntilOptimal: '15-30 мин',
        confidence: 75,
      }
    })

    return {
      success: true,
      data: gasData,
      predictions,
      lastUpdated: Date.now(),
    }
  } catch (error) {
    console.error('Error fetching gas prices:', error)
    return {
      success: false,
      data: [],
      predictions: {},
      lastUpdated: Date.now(),
    }
  }
}

function getChainId(name: string): number {
  const chains: Record<string, number> = {
    'Arbitrum': 42161,
    'Optimism': 10,
    'Base': 8453,
    'Polygon': 137,
  }
  return chains[name] || 1
}
```

---

### Обновите `src/api/prices.ts`

```typescript
// src/api/prices.ts

export interface TokenPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

export async function getTokenPrices(ids: string[] = [
  'ethereum',
  'bitcoin',
  'polygon',
  'arbitrum',
  'optimism',
  'avalanche-2',
  'fantom',
  'cosmos'
]): Promise<TokenPrice[]> {
  try {
    const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
    url.searchParams.append('vs_currency', 'usd')
    url.searchParams.append('ids', ids.join(','))
    url.searchParams.append('order', 'market_cap_desc')
    url.searchParams.append('per_page', '100')
    url.searchParams.append('page', '1')
    url.searchParams.append('sparkline', 'false')
    
    const response = await fetch(url.toString())
    
    if (!response.ok) {
      if (response.status === 429) {
        // Rate limit - возвращаем кэш или дефолт
        console.warn('Coingecko rate limit, using cached data')
        return getCachedPrices()
      }
      throw new Error('Coingecko API Error')
    }
    
    const data = await response.json()
    cachePrices(data)
    return data
  } catch (error) {
    console.error('Error fetching prices:', error)
    return getCachedPrices()
  }
}

// Кэширование
let priceCache: TokenPrice[] = []
let cacheTime = 0

function cachePrices(prices: TokenPrice[]) {
  priceCache = prices
  cacheTime = Date.now()
}

function getCachedPrices(): TokenPrice[] {
  // Если кэш старше 5 минут - возвращаем дефолт
  if (Date.now() - cacheTime > 5 * 60 * 1000) {
    return [
      { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 2500, price_change_percentage_24h: 0, market_cap: 0 },
    ]
  }
  return priceCache
}
```

---

### Автообновление данных

```typescript
// src/hooks/useRealTimeData.ts

import { useState, useEffect, useCallback } from 'react'
import { getGasPrices } from '../api/gas'
import { getTokenPrices } from '../api/prices'

export function useRealTimeData() {
  const [gasData, setGasData] = useState<any>(null)
  const [tokenPrices, setTokenPrices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [gas, prices] = await Promise.all([
        getGasPrices(),
        getTokenPrices(),
      ])

      setGasData(gas)
      setTokenPrices(prices)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Первоначальная загрузка
    fetchData()

    // Автообновление каждые 30 секунд
    const interval = setInterval(fetchData, 30000)

    return () => clearInterval(interval)
  }, [fetchData])

  return {
    gasData,
    tokenPrices,
    isLoading,
    error,
    refresh: fetchData,
  }
}
```

---

## 📊 Мониторинг и отладка

### Проверка API

```typescript
// src/api/test.ts

export async function testAllAPIs() {
  const results = {
    etherscan: false,
    gasnow: false,
    ethgasstation: false,
    l2fees: false,
    coingecko: false,
  }

  // Etherscan
  try {
    const res = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`
    )
    const data = await res.json()
    results.etherscan = data.status === '1'
  } catch { results.etherscan = false }

  // GasNow
  try {
    const res = await fetch('https://www.gasnow.org/api/v3/gas/price')
    results.gasnow = res.ok
  } catch { results.gasnow = false }

  // EthGasStation
  try {
    const res = await fetch('https://ethgasstation.info/json/ethgasAPI.json')
    results.ethgasstation = res.ok
  } catch { results.ethgasstation = false }

  // L2Fees
  try {
    const res = await fetch('https://l2fees.info/api/data.json')
    results.l2fees = res.ok
  } catch { results.l2fees = false }

  // Coingecko
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/ping')
    results.coingecko = res.ok
  } catch { results.coingecko = false }

  console.table(results)
  return results
}

// Запустить в консоли браузера:
// import { testAllAPIs } from './api/test'
// testAllAPIs()
```

---

## 💡 Советы

### 1. Rate Limiting

```typescript
// Добавляйте задержку между запросами
async function fetchWithDelay(url: string, delay = 1000) {
  await new Promise(r => setTimeout(r, delay))
  return fetch(url)
}
```

### 2. Кэширование

```typescript
// Используйте localStorage для кэша
function setCache(key: string, data: any, ttl = 300000) {
  localStorage.setItem(key, JSON.stringify({
    data,
    timestamp: Date.now(),
    ttl,
  }))
}

function getCache(key: string) {
  const cached = localStorage.getItem(key)
  if (!cached) return null
  
  const { data, timestamp, ttl } = JSON.parse(cached)
  if (Date.now() - timestamp > ttl) return null
  
  return data
}
```

### 3. Fallback цепочка

```typescript
// Всегда имейте запасной вариант
async function getGasPrice() {
  try {
    return await getGasNow() // приоритет 1
  } catch {
    try {
      return await getEthGasStation() // приоритет 2
    } catch {
      return await getEtherscanGas() // приоритет 3
    }
  }
}
```

---

## 🔗 Ссылки

- [Etherscan API Docs](https://docs.etherscan.io/)
- [Gas Now](https://www.gasnow.org/)
- [EthGasStation](https://ethgasstation.info/)
- [L2Fees](https://l2fees.info/)
- [Coingecko API](https://www.coingecko.com/en/api/documentation)
- [Li.Fi API](https://docs.li.fi/)

---

**Последнее обновление:** Март 2026

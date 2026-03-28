import { useState, useEffect, useCallback } from 'react'
import { getGasPrices } from '../api/gas'
import { getTokenPrices } from '../api/prices'
import type { GasApiResponse } from '../types'
import type { TokenPrice } from '../api/prices'

interface RealTimeData {
  gasData: GasApiResponse | null
  tokenPrices: TokenPrice[]
  isLoading: boolean
  error: string | null
  lastUpdated: number
  refresh: () => Promise<void>
}

export function useRealTimeData(refreshInterval = 30000): RealTimeData {
  const [gasData, setGasData] = useState<GasApiResponse | null>(null)
  const [tokenPrices, setTokenPrices] = useState<TokenPrice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState(0)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      
      const [gas, prices] = await Promise.all([
        getGasPrices(),
        getTokenPrices(),
      ])

      setGasData(gas)
      setTokenPrices(prices)
      setLastUpdated(Date.now())
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data'
      setError(errorMessage)
      console.error('Error fetching real-time data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Первоначальная загрузка
    fetchData()

    // Автообновление
    const interval = setInterval(fetchData, refreshInterval)

    // Обновление при возврате на вкладку
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchData()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [fetchData, refreshInterval])

  return {
    gasData,
    tokenPrices,
    isLoading,
    error,
    lastUpdated,
    refresh: fetchData,
  }
}

// Хук для конкретной сети
export function useChainGas(chainId: number) {
  const { gasData, isLoading, error, lastUpdated, refresh } = useRealTimeData()
  
  const chainGas = gasData?.data.find(g => g.chainId === chainId)
  const prediction = gasData?.predictions[chainId]

  return {
    gasPrice: chainGas || null,
    prediction,
    isLoading,
    error,
    lastUpdated,
    refresh,
  }
}

// Хук для цен токенов
export function useTokenPrices(ids?: string[]) {
  const { tokenPrices, isLoading, error, lastUpdated, refresh } = useRealTimeData()
  
  const filteredPrices = ids 
    ? tokenPrices.filter(p => ids.includes(p.id))
    : tokenPrices

  const getPrice = (id: string) => filteredPrices.find(p => p.id === id)?.current_price || 0
  const getPriceChange = (id: string) => filteredPrices.find(p => p.id === id)?.price_change_percentage_24h || 0

  return {
    prices: filteredPrices,
    getPrice,
    getPriceChange,
    isLoading,
    error,
    lastUpdated,
    refresh,
  }
}

// Хук для ETH цены
export function useETHPrice() {
  const { getPrice, getPriceChange, ...rest } = useTokenPrices(['ethereum'])
  
  return {
    price: getPrice('ethereum'),
    change24h: getPriceChange('ethereum'),
    ...rest,
  }
}

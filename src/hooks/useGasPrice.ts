import { useState, useEffect, useCallback } from 'react'
import type { GasPrice, AIPrediction } from '../types'
import { getGasPrices } from '../api/gas'
import { DEFAULT_VALUES } from '../utils/constants'

interface UseGasPriceReturn {
  gasPrices: GasPrice[]
  selectedChainGas: GasPrice | null
  prediction: AIPrediction | null
  isLoading: boolean
  error: string | null
  refreshGasPrices: () => Promise<void>
  lastUpdated: number
}

/**
 * Хук для получения и управления данными о газе
 */
export function useGasPrice(chainId?: number): UseGasPriceReturn {
  const [gasPrices, setGasPrices] = useState<GasPrice[]>([])
  const [selectedChainGas, setSelectedChainGas] = useState<GasPrice | null>(null)
  const [prediction, setPrediction] = useState<AIPrediction | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number>(0)

  const fetchGasData = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await getGasPrices()
      
      if (response.success) {
        setGasPrices(response.data)
        setLastUpdated(response.lastUpdated)
        
        if (chainId) {
          const chainGas = response.data.find(g => g.chainId === chainId)
          setSelectedChainGas(chainGas || null)
          
          const chainPrediction = response.predictions[chainId]
          setPrediction(chainPrediction || null)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gas prices')
    } finally {
      setIsLoading(false)
    }
  }, [chainId])

  useEffect(() => {
    fetchGasData()
    
    // Автообновление каждые 30 секунд
    const interval = setInterval(fetchGasData, DEFAULT_VALUES.GAS_REFRESH_INTERVAL)
    
    return () => clearInterval(interval)
  }, [fetchGasData])

  return {
    gasPrices,
    selectedChainGas,
    prediction,
    isLoading,
    error,
    refreshGasPrices: fetchGasData,
    lastUpdated,
  }
}

/**
 * Хук для получения газа по конкретной сети
 */
export function useChainGasPrice(chainId: number) {
  const { selectedChainGas, isLoading, error, refreshGasPrices, lastUpdated } = useGasPrice(chainId)
  
  return {
    gasPrice: selectedChainGas,
    isLoading,
    error,
    refresh: refreshGasPrices,
    lastUpdated,
  }
}

export default useGasPrice

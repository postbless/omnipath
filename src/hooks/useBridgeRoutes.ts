import { useState, useCallback } from 'react'
import type { BridgeRoute } from '../types'
import { searchBridgeRoutes } from '../api/bridges'
import { useDashboardStore } from '../store'
import { DEFAULT_VALUES } from '../utils/constants'

interface UseBridgeRoutesReturn {
  routes: BridgeRoute[]
  isLoading: boolean
  error: string | null
  searchRoutes: (params: {
    fromChain: string
    toChain: string
    amount: number
  }) => Promise<void>
  totalRoutes: number
  lastUpdated: number
}

/**
 * Хук для поиска и управления маршрутами мостов
 */
export function useBridgeRoutes(): UseBridgeRoutesReturn {
  const [routes, setRoutes] = useState<BridgeRoute[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalRoutes, setTotalRoutes] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(0)
  
  const { setSelectedRoute, setLoading, setError: setStoreError } = useDashboardStore()

  const searchRoutes = useCallback(async (params: {
    fromChain: string
    toChain: string
    amount: number
  }) => {
    try {
      setIsLoading(true)
      setLoading(true)
      setError(null)
      setStoreError(null)
      
      // Дебаунс можно добавить при необходимости
      
      const response = await searchBridgeRoutes({
        fromChain: params.fromChain,
        toChain: params.toChain,
        fromToken: 'ETH',
        toToken: 'ETH',
        amount: params.amount,
      })
      
      if (response.success) {
        setRoutes(response.data)
        setTotalRoutes(response.totalRoutes)
        setLastUpdated(response.lastUpdated)
        
        // Выбираем первый маршрут по умолчанию
        if (response.data.length > 0) {
          setSelectedRoute(response.data[0])
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search routes'
      setError(errorMessage)
      setStoreError(errorMessage)
      setRoutes([])
      setTotalRoutes(0)
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }, [setSelectedRoute, setLoading, setStoreError])

  return {
    routes,
    isLoading,
    error,
    searchRoutes,
    totalRoutes,
    lastUpdated,
  }
}

export default useBridgeRoutes

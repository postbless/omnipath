import type { BridgeRoute, BridgeApiResponse } from '../types'
import BridgeAggregator, { MOCK_BRIDGE_ROUTES } from '../components/BridgeAggregator'

/**
 * Поиск маршрутов для моста
 * Временно использует моковые данные
 */
export async function searchBridgeRoutes(params: {
  fromChain: string
  toChain: string
  fromToken: string
  toToken: string
  amount: number
}): Promise<BridgeApiResponse> {
  // Симуляция задержки сети
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Фильтрация моковых данных по выбранным сетям
  const filteredRoutes = MOCK_BRIDGE_ROUTES.filter((route: BridgeRoute) =>
    route.fromChain.toLowerCase() === params.fromChain.toLowerCase() &&
    route.toChain.toLowerCase() === params.toChain.toLowerCase()
  )

  // Если нет подходящих маршрутов, возвращаем все (для демо)
  const routes = filteredRoutes.length > 0 ? filteredRoutes : MOCK_BRIDGE_ROUTES

  // Пересчитываем суммы на основе введенного amount
  const adjustedRoutes: BridgeRoute[] = routes.map((route: BridgeRoute) => ({
    ...route,
    fromAmount: params.amount,
    toAmount: params.amount * (route.toAmount / route.fromAmount),
  }))
  
  return {
    success: true,
    data: adjustedRoutes,
    totalRoutes: adjustedRoutes.length,
    lastUpdated: Date.now(),
  }
}

/**
 * Получение доступных мостов
 */
export async function getAvailableBridges(): Promise<string[]> {
  return ['Li.Fi', 'Hop Protocol', 'Across', 'Stargate', 'Synapse']
}

/**
 * Реальное получение маршрутов из Li.Fi API (для будущего использования)
 * Требует API ключ Li.Fi
 */
export async function fetchLiFiRoutes(params: {
  fromChain: number
  toChain: number
  fromToken: string
  toToken: string
  amount: number
  fromAddress: string
}): Promise<BridgeRoute[]> {
  const apiKey = import.meta.env.VITE_LIFI_API_KEY
  
  const url = new URL('https://li.quest/v1/advanced/routes')
  url.searchParams.append('fromChain', params.fromChain.toString())
  url.searchParams.append('toChain', params.toChain.toString())
  url.searchParams.append('fromToken', params.fromToken)
  url.searchParams.append('toToken', params.toToken)
  url.searchParams.append('fromAmount', params.amount.toString())
  url.searchParams.append('fromAddress', params.fromAddress)
  
  const response = await fetch(url.toString(), {
    headers: {
      'x-lifi-api-key': apiKey || '',
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch Li.Fi routes')
  }
  
  const data = await response.json()
  
  return data.routes.map((route: any) => ({
    id: route.id,
    bridgeName: route.steps[0]?.toolDetails?.name || 'Unknown',
    bridgeLogo: route.steps[0]?.toolDetails?.logoURI || '',
    fromChain: route.fromChain.name,
    toChain: route.toChain.name,
    fromToken: route.fromToken.symbol,
    toToken: route.toToken.symbol,
    fromAmount: parseFloat(route.fromAmount) / 10 ** route.fromToken.decimals,
    toAmount: parseFloat(route.toAmountMin) / 10 ** route.toToken.decimals,
    fee: parseFloat(route.steps[0]?.fee?.amount || '0'),
    estimatedTime: `${Math.round(route.estimate.executionDuration / 60000)}-${Math.round(route.estimate.executionDuration / 60000) + 5} мин`,
    estimatedTimeMinutes: Math.round(route.estimate.executionDuration / 60000),
    route: [route.fromChain.name, route.toChain.name],
    steps: route.steps.map((step: any) => ({
      type: step.type,
      protocol: step.tool,
      fromChain: step.action.fromChain.name,
      toChain: step.action.toChain?.name,
      fromToken: step.action.fromToken.symbol,
      toToken: step.action.toToken?.symbol,
      fromAmount: parseFloat(step.action.fromAmount) / 10 ** step.action.fromToken.decimals,
      toAmount: parseFloat(step.estimate.toAmountMin) / 10 ** step.action.toToken?.decimals,
      fee: parseFloat(step.fee?.amount || '0'),
    })),
  }))
}

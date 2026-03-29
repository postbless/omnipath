import type { BridgeRoute, BridgeApiResponse } from '../types'

/**
 * Поиск маршрутов для моста через Li.Fi API
 */
export async function searchBridgeRoutes(params: {
  fromChain: string
  toChain: string
  fromToken: string
  toToken: string
  amount: number
}): Promise<BridgeApiResponse> {
  const apiKey = import.meta.env.VITE_LIFI_API_KEY

  // Если нет API ключа, возвращаем моковые данные
  if (!apiKey) {
    console.log('[Bridges] No Li.Fi API key, using mock data')
    return {
      success: true,
      data: getMockRoutes(params.fromChain, params.toChain, params.amount),
      totalRoutes: 3,
      lastUpdated: Date.now(),
    }
  }

  try {
    // Маппинг названий сетей в Chain ID
    const chainIdMap: Record<string, number> = {
      'ethereum': 1,
      'arbitrum': 42161,
      'optimism': 10,
      'base': 8453,
      'polygon': 137,
      'avalanche': 43114,
      'fantom': 250,
      'bsc': 56,
      'gnosis': 100,
    }

    const fromChainId = chainIdMap[params.fromChain.toLowerCase()]
    const toChainId = chainIdMap[params.toChain.toLowerCase()]

    if (!fromChainId || !toChainId) {
      throw new Error(`Unknown chain: ${params.fromChain} or ${params.toChain}`)
    }

    // Маппинг токенов в адреса (нативные токены)
    const tokenAddressMap: Record<string, string> = {
      'ETH': '0x0000000000000000000000000000000000000000',
      'USDC': '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      'USDT': '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      'DAI': '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      'WBTC': '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    }

    const fromTokenAddress = tokenAddressMap[params.fromToken.toUpperCase()] || tokenAddressMap['ETH']
    const toTokenAddress = tokenAddressMap[params.toToken.toUpperCase()] || tokenAddressMap['ETH']

    // Конвертируем amount в наименьшие единицы (для ETH это 18 знаков)
    const amountWei = BigInt(Math.floor(params.amount * 1e18)).toString()

    // URL для Li.Fi API
    const url = new URL('https://li.quest/v1/advanced/routes')
    url.searchParams.append('fromChain', fromChainId.toString())
    url.searchParams.append('toChain', toChainId.toString())
    url.searchParams.append('fromToken', fromTokenAddress)
    url.searchParams.append('toToken', toTokenAddress)
    url.searchParams.append('fromAmount', amountWei)

    const response = await fetch(url.toString(), {
      headers: {
        'x-lifi-api-key': apiKey,
      },
    })

    if (!response.ok) {
      console.warn('Li.Fi API error, using mock data')
      return {
        success: false,
        data: getMockRoutes(params.fromChain, params.toChain, params.amount),
        totalRoutes: 3,
        lastUpdated: Date.now(),
      }
    }

    const data = await response.json()

    // Конвертируем маршруты в наш формат
    const routes: BridgeRoute[] = (data.routes || []).map((route: any) => {
      const fromTokenDecimals = route.fromToken?.decimals || 18
      const toTokenDecimals = route.toToken?.decimals || 18

      return {
        id: route.id,
        bridgeName: route.steps[0]?.toolDetails?.name || 'Unknown',
        bridgeLogo: route.steps[0]?.toolDetails?.logoURI || '',
        fromChain: route.fromChain.name,
        toChain: route.toChain.name,
        fromToken: route.fromToken.symbol,
        toToken: route.toToken.symbol,
        fromAmount: params.amount,
        toAmount: parseFloat(route.toAmount) / 10 ** toTokenDecimals,
        fee: parseFloat(route.steps[0]?.fee?.amount || '0') / 10 ** fromTokenDecimals,
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
          toAmount: parseFloat(step.estimate.toAmount) / 10 ** step.action.toToken?.decimals,
          fee: parseFloat(step.fee?.amount || '0'),
        })),
      }
    })

    return {
      success: true,
      data: routes,
      totalRoutes: routes.length,
      lastUpdated: Date.now(),
    }
  } catch (error) {
    console.error('Error fetching bridge routes:', error)
    
    // Fallback к моковым данным при ошибке
    return {
      success: false,
      data: getMockRoutes(params.fromChain, params.toChain, params.amount),
      totalRoutes: 3,
      lastUpdated: Date.now(),
    }
  }
}

/**
 * Получение доступных мостов
 */
export async function getAvailableBridges(): Promise<string[]> {
  return ['Li.Fi', 'Hop Protocol', 'Across', 'Stargate', 'Synapse']
}

// Моковые данные для fallback (если нет API ключа)
const MOCK_BRIDGE_ROUTES = [
  {
    id: '1',
    bridgeName: 'Li.Fi',
    bridgeLogo: 'lifi',
    fromChain: 'Ethereum',
    toChain: 'Arbitrum',
    fromToken: 'ETH',
    toToken: 'ETH',
    fromAmount: 1,
    toAmount: 0.9985,
    fee: 4.50,
    estimatedTime: '5-10 мин',
    estimatedTimeMinutes: 7,
    route: ['Ethereum', 'Arbitrum'],
    steps: [{ type: 'bridge', protocol: 'Li.Fi', fromChain: 'Ethereum', toChain: 'Arbitrum', fromToken: 'ETH', toToken: 'ETH', fromAmount: 1, toAmount: 0.9985, fee: 4.50 }],
  },
  {
    id: '2',
    bridgeName: 'Hop Protocol',
    bridgeLogo: 'hop',
    fromChain: 'Ethereum',
    toChain: 'Arbitrum',
    fromToken: 'ETH',
    toToken: 'ETH',
    fromAmount: 1,
    toAmount: 0.9978,
    fee: 6.20,
    estimatedTime: '3-5 мин',
    estimatedTimeMinutes: 4,
    route: ['Ethereum', 'Arbitrum'],
    steps: [{ type: 'bridge', protocol: 'Hop', fromChain: 'Ethereum', toChain: 'Arbitrum', fromToken: 'ETH', toToken: 'ETH', fromAmount: 1, toAmount: 0.9978, fee: 6.20 }],
  },
  {
    id: '3',
    bridgeName: 'Across',
    bridgeLogo: 'across',
    fromChain: 'Ethereum',
    toChain: 'Arbitrum',
    fromToken: 'ETH',
    toToken: 'ETH',
    fromAmount: 1,
    toAmount: 0.9982,
    fee: 5.10,
    estimatedTime: '4-8 мин',
    estimatedTimeMinutes: 6,
    route: ['Ethereum', 'Arbitrum'],
    steps: [{ type: 'bridge', protocol: 'Across', fromChain: 'Ethereum', toChain: 'Arbitrum', fromToken: 'ETH', toToken: 'ETH', fromAmount: 1, toAmount: 0.9982, fee: 5.10 }],
  },
] as any[]

/**
 * Получение моковых маршрутов (fallback)
 */
function getMockRoutes(fromChain: string, toChain: string, amount: number): BridgeRoute[] {
  return MOCK_BRIDGE_ROUTES.map((route: any) => ({
    ...route,
    fromAmount: amount,
    toAmount: amount * route.toAmount,
    fee: route.fee * amount,
  }))
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

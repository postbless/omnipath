// Типы для данных о газе
export interface GasPrice {
  chainId: number
  chainName: string
  timestamp: number
  prices: {
    slow: {
      maxPriorityFeePerGas: number
      maxFeePerGas: number
      estimatedTime: string
    }
    average: {
      maxPriorityFeePerGas: number
      maxFeePerGas: number
      estimatedTime: string
    }
    fast: {
      maxPriorityFeePerGas: number
      maxFeePerGas: number
      estimatedTime: string
    }
  }
  baseFee: number
  trend: 'up' | 'down' | 'stable'
}

// Тип для ИИ-прогноза
export interface AIPrediction {
  recommendation: 'buy' | 'wait' | 'urgent'
  message: string
  expectedChange: number
  timeUntilOptimal: string
  confidence: number
}

// Тип для данных моста
export interface BridgeRoute {
  id: string
  bridgeName: string
  bridgeLogo: string
  fromChain: string
  toChain: string
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  fee: number
  estimatedTime: string
  estimatedTimeMinutes: number
  route: string[]
  steps: BridgeStep[]
}

export interface BridgeStep {
  type: 'swap' | 'bridge' | 'deposit' | 'withdraw'
  protocol: string
  fromChain: string
  toChain?: string
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  fee: number
}

// Тип для состояния дашборда
export interface DashboardState {
  selectedFromChain: string | null
  selectedToChain: string | null
  amount: string
  selectedRoute: BridgeRoute | null
  isLoading: boolean
  error: string | null
}

// Тип для ответа API газа
export interface GasApiResponse {
  success: boolean
  data: GasPrice[]
  predictions: Record<number, AIPrediction>
  lastUpdated: number
}

// Тип для ответа API мостов
export interface BridgeApiResponse {
  success: boolean
  data: BridgeRoute[]
  totalRoutes: number
  lastUpdated: number
}

// Тип для контекста сети
export interface NetworkContext {
  chainId: number
  chainName: string
  symbol: string
  gasPrice: GasPrice | null
  prediction: AIPrediction | null
}

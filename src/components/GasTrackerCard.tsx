import React from 'react'
import { TrendingDown, TrendingUp, Minus, Clock, Zap, Leaf } from 'lucide-react'
import type { GasPrice, AIPrediction } from '../types'
import { formatGasPrice, getGasStatusColor, getGasStatusBgColor } from '../utils/formatters'

// Моковые данные для газа
const MOCK_GAS_PRICES: Record<string, GasPrice> = {
  ethereum: {
    chainId: 1,
    chainName: 'Ethereum',
    timestamp: Date.now(),
    prices: {
      slow: {
        maxPriorityFeePerGas: 0.5,
        maxFeePerGas: 24.5,
        estimatedTime: '~5 min',
      },
      average: {
        maxPriorityFeePerGas: 1.2,
        maxFeePerGas: 26.8,
        estimatedTime: '~2 min',
      },
      fast: {
        maxPriorityFeePerGas: 2.5,
        maxFeePerGas: 30.2,
        estimatedTime: '~30 sec',
      },
    },
    baseFee: 24,
    trend: 'down',
  },
  arbitrum: {
    chainId: 42161,
    chainName: 'Arbitrum',
    timestamp: Date.now(),
    prices: {
      slow: {
        maxPriorityFeePerGas: 0.01,
        maxFeePerGas: 0.08,
        estimatedTime: '~2 min',
      },
      average: {
        maxPriorityFeePerGas: 0.02,
        maxFeePerGas: 0.12,
        estimatedTime: '~45 sec',
      },
      fast: {
        maxPriorityFeePerGas: 0.05,
        maxFeePerGas: 0.18,
        estimatedTime: '~15 sec',
      },
    },
    baseFee: 0.1,
    trend: 'stable',
  },
}

// Моковые данные для ИИ-прогноза
const MOCK_AI_PREDICTION: AIPrediction = {
  recommendation: 'wait',
  message: 'Выгодно: Ожидается снижение газа на 15% через 20 минут',
  expectedChange: -15,
  timeUntilOptimal: '20 мин',
  confidence: 78,
}

interface TransactionType {
  name: string
  icon: React.ReactNode
  price: number
  time: string
  description: string
}

const GasTrackerCard: React.FC = () => {
  const gasData = MOCK_GAS_PRICES.ethereum
  const prediction = MOCK_AI_PREDICTION

  const transactionTypes: TransactionType[] = [
    {
      name: 'Eco',
      icon: <Leaf className="w-4 h-4" />,
      price: gasData.prices.slow.maxFeePerGas,
      time: gasData.prices.slow.estimatedTime,
      description: 'Медленно',
    },
    {
      name: 'Fast',
      icon: <Clock className="w-4 h-4" />,
      price: gasData.prices.average.maxFeePerGas,
      time: gasData.prices.average.estimatedTime,
      description: 'Средне',
    },
    {
      name: 'Instant',
      icon: <Zap className="w-4 h-4" />,
      price: gasData.prices.fast.maxFeePerGas,
      time: gasData.prices.fast.estimatedTime,
      description: 'Быстро',
    },
  ]

  const getTrendIcon = () => {
    switch (gasData.trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-rose-500" />
      case 'down':
        return <TrendingDown className="w-5 h-5 text-emerald-500" />
      default:
        return <Minus className="w-5 h-5 text-amber-500" />
    }
  }

  const getRecommendationColor = () => {
    switch (prediction.recommendation) {
      case 'buy':
        return 'text-emerald-500 bg-emerald-500/20 border-emerald-500/50'
      case 'wait':
        return 'text-amber-500 bg-amber-500/20 border-amber-500/50'
      case 'urgent':
        return 'text-rose-500 bg-rose-500/20 border-rose-500/50'
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Основная карточка с градиентной обводкой */}
      <div className="relative p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-glow-indigo">
        <div className="relative bg-slate-900 rounded-2xl p-6 backdrop-blur-xl">
          {/* Заголовок */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Иконка Ethereum */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4 12l8 10 8-10L12 2zm0 3.5L17.5 12 12 18.5 6.5 12 12 5.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{gasData.chainName}</h3>
                <p className="text-sm text-slate-400">Gas Tracker</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${
                gasData.trend === 'down' ? 'text-emerald-500' :
                gasData.trend === 'up' ? 'text-rose-500' : 'text-amber-500'
              }`}>
                {gasData.trend === 'down' ? '↓' : gasData.trend === 'up' ? '↑' : '→'}
              </span>
            </div>
          </div>

          {/* Основная цена газа */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl font-bold text-white">
                {formatGasPrice(gasData.baseFee)}
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30">
                <DollarSign className="w-4 h-4 text-orange-400" />
                <span className="text-lg font-bold text-orange-400">
                  {(gasData.baseFee * 0.000001 * 2500).toFixed(2)}
                </span>
              </div>
            </div>
            <p className="text-sm text-zinc-500">Base Fee</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="text-zinc-600">≈ {(gasData.baseFee * 1000000000).toFixed(0)} Gwei</span>
              <span className="text-zinc-700">|</span>
              <span className="text-zinc-600">≈ ${(gasData.baseFee * 0.000001 * 2500).toFixed(4)} USDT</span>
            </div>
          </div>

          {/* Типы транзакций */}
          <div className="space-y-3 mb-6">
            {transactionTypes.map((type) => (
              <div
                key={type.name}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-200 hover:scale-[1.02] cursor-pointer ${getGasStatusBgColor(type.price)}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getGasStatusColor(type.price)} bg-zinc-900/50`}>
                    {type.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{type.name}</p>
                    <p className="text-xs text-zinc-500">{type.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <p className={`text-lg font-bold ${getGasStatusColor(type.price)}`}>
                      {formatGasPrice(type.price)}
                    </p>
                    <span className="text-xs text-orange-400 font-medium">
                      ${(type.price * 0.000001 * 2500).toFixed(3)}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{type.time} • {(type.price * 1000000000).toFixed(0)} Gwei</p>
                </div>
              </div>
            ))}
          </div>

          {/* ИИ-совет */}
          <div className={`p-4 rounded-xl border ${getRecommendationColor()} backdrop-blur-sm`}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/10">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">AI Insight</p>
                <p className="text-sm opacity-90">{prediction.message}</p>
                <div className="flex items-center gap-4 mt-2 text-xs">
                  <span className="opacity-75">
                    Изменение: <span className={prediction.expectedChange < 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {prediction.expectedChange > 0 ? '+' : ''}{prediction.expectedChange}%
                    </span>
                  </span>
                  <span className="opacity-75">
                    Через: {prediction.timeUntilOptimal}
                  </span>
                  <span className="opacity-75">
                    Точность: {prediction.confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Последнее обновление */}
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              Обновлено: {new Date(gasData.timestamp).toLocaleTimeString('ru-RU')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GasTrackerCard
export { MOCK_GAS_PRICES, MOCK_AI_PREDICTION }

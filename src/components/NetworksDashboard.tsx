import React, { useState, useEffect } from 'react'
import { Activity, TrendingUp, TrendingDown, Clock, Leaf, BarChart3, Layers, Sparkles, Calculator } from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CryptoIcon } from './ui/CryptoIcons'
import { NetworkCard } from './ui/NetworkCard'
import { MOCK_AI_PREDICTION } from './GasTrackerCard'
import GasCalculator from './ui/GasCalculator'
import type { GasPrice } from '../types'
import { formatGasPrice } from '../utils/formatters'
import { getTronGasData, getTRXPrice } from '../api/tronGas'
import { getGasPrices } from '../api/gas'
import { getTokenPrices } from '../api/prices'
import { getETHPrice } from '../api/ethPrice'

// Генерация данных для графиков на основе реальных данных
const generateChartData = (basePrice: number, points: number = 24) => {
  const data = []
  let price = basePrice
  for (let i = points - 1; i >= 0; i--) {
    const hour = new Date(Date.now() - i * 60 * 60 * 1000)
    price = price * (1 + (Math.random() - 0.5) * 0.1)
    data.push({
      time: hour.getHours().toString().padStart(2, '0') + ':00',
      price: Math.max(0.01, price),
    })
  }
  return data
}

// Дефолтные значения для сетей (fallback)
const DEFAULT_GAS_PRICES: Record<string, GasPrice & { sparklineData: number[]; change24h: number }> = {
  ethereum: {
    chainId: 1,
    chainName: 'Ethereum',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 0.5, maxFeePerGas: 25, estimatedTime: '~5 min' },
      average: { maxPriorityFeePerGas: 1.2, maxFeePerGas: 30, estimatedTime: '~2 min' },
      fast: { maxPriorityFeePerGas: 2.5, maxFeePerGas: 35, estimatedTime: '~30 sec' },
    },
    baseFee: 28,
    trend: 'stable' as const,
    sparklineData: [28, 26, 25, 24, 23, 22, 21, 20, 22, 24, 25, 24],
    change24h: -5.2,
  },
  arbitrum: {
    chainId: 42161,
    chainName: 'Arbitrum',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 0.01, maxFeePerGas: 0.08, estimatedTime: '~2 min' },
      average: { maxPriorityFeePerGas: 0.02, maxFeePerGas: 0.12, estimatedTime: '~45 sec' },
      fast: { maxPriorityFeePerGas: 0.05, maxFeePerGas: 0.18, estimatedTime: '~15 sec' },
    },
    baseFee: 0.1,
    trend: 'stable' as const,
    sparklineData: [0.12, 0.11, 0.10, 0.09, 0.10, 0.11, 0.10, 0.09, 0.08, 0.09, 0.10, 0.08],
    change24h: -3.1,
  },
  optimism: {
    chainId: 10,
    chainName: 'Optimism',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 0.01, maxFeePerGas: 0.04, estimatedTime: '~3 min' },
      average: { maxPriorityFeePerGas: 0.02, maxFeePerGas: 0.06, estimatedTime: '~1 min' },
      fast: { maxPriorityFeePerGas: 0.03, maxFeePerGas: 0.09, estimatedTime: '~20 sec' },
    },
    baseFee: 0.05,
    trend: 'stable' as const,
    sparklineData: [0.06, 0.05, 0.05, 0.04, 0.05, 0.06, 0.05, 0.05, 0.04, 0.05, 0.06, 0.05],
    change24h: 1.2,
  },
  base: {
    chainId: 8453,
    chainName: 'Base',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 0.01, maxFeePerGas: 0.06, estimatedTime: '~2 min' },
      average: { maxPriorityFeePerGas: 0.02, maxFeePerGas: 0.09, estimatedTime: '~45 sec' },
      fast: { maxPriorityFeePerGas: 0.04, maxFeePerGas: 0.12, estimatedTime: '~15 sec' },
    },
    baseFee: 0.08,
    trend: 'stable' as const,
    sparklineData: [0.06, 0.07, 0.08, 0.09, 0.08, 0.07, 0.08, 0.09, 0.10, 0.09, 0.08, 0.08],
    change24h: 5.3,
  },
  polygon: {
    chainId: 137,
    chainName: 'Polygon',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 25, maxFeePerGas: 28, estimatedTime: '~5 min' },
      average: { maxPriorityFeePerGas: 35, maxFeePerGas: 42, estimatedTime: '~2 min' },
      fast: { maxPriorityFeePerGas: 50, maxFeePerGas: 58, estimatedTime: '~30 sec' },
    },
    baseFee: 32,
    trend: 'stable' as const,
    sparklineData: [45, 42, 40, 38, 36, 35, 34, 33, 32, 31, 30, 32],
    change24h: -8.7,
  },
  avalanche: {
    chainId: 43114,
    chainName: 'Avalanche',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 20, maxFeePerGas: 25, estimatedTime: '~3 min' },
      average: { maxPriorityFeePerGas: 28, maxFeePerGas: 35, estimatedTime: '~1 min' },
      fast: { maxPriorityFeePerGas: 40, maxFeePerGas: 50, estimatedTime: '~20 sec' },
    },
    baseFee: 27,
    trend: 'stable' as const,
    sparklineData: [30, 29, 28, 27, 28, 29, 27, 26, 27, 28, 27, 27],
    change24h: -2.2,
  },
  fantom: {
    chainId: 250,
    chainName: 'Fantom',
    timestamp: Date.now(),
    prices: {
      slow: { maxPriorityFeePerGas: 15, maxFeePerGas: 18, estimatedTime: '~2 min' },
      average: { maxPriorityFeePerGas: 20, maxFeePerGas: 25, estimatedTime: '~45 sec' },
      fast: { maxPriorityFeePerGas: 30, maxFeePerGas: 38, estimatedTime: '~15 sec' },
    },
    baseFee: 22,
    trend: 'stable' as const,
    sparklineData: [28, 26, 25, 24, 23, 22, 21, 20, 21, 22, 23, 22],
    change24h: -5.3,
  },
} as const

const StatCard: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  delay?: number
}> = ({ icon, label, value, change, changeType = 'neutral', delay = 0 }) => (
  <div 
    className="omni-card p-5 floating-card animate-fade-in"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm text-zinc-400">{label}</span>
      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-bold text-white mb-1">{value}</p>
    {change && (
      <div className={`flex items-center gap-1 text-sm ${
        changeType === 'positive' ? 'text-emerald-500' : 
        changeType === 'negative' ? 'text-rose-500' : 'text-zinc-500'
      }`}>
        {changeType === 'positive' ? <TrendingDown className="w-3 h-3" /> : 
         changeType === 'negative' ? <TrendingUp className="w-3 h-3" /> : null}
        <span>{change}</span>
      </div>
    )}
  </div>
)

const NetworksDashboard: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string>('ethereum')
  const [activeTab, setActiveTab] = useState<'overview' | 'comparison'>('overview')
  const [chartData, setChartData] = useState<Array<{ time: string; price: number }>>([])
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [tronData, setTronData] = useState<GasPrice & { sparklineData: number[]; change24h: number } | null>(null)
  
  // Состояния для реальных данных
  const [gasData, setGasData] = useState<GasPrice[]>([])
  const [tokenPrices, setTokenPrices] = useState<any[]>([])
  const [ethPrice, setEthPrice] = useState<number>(2500)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Получение реальных данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const [gasResponse, pricesResponse, ethPriceValue] = await Promise.all([
          getGasPrices(),
          getTokenPrices(),
          getETHPrice(),
        ])

        if (gasResponse.success && gasResponse.data.length > 0) {
          setGasData(gasResponse.data)
        } else {
          // Fallback к дефолтным данным
          setGasData(Object.values(DEFAULT_GAS_PRICES))
        }

        setTokenPrices(pricesResponse)
        setEthPrice(ethPriceValue)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        // Fallback к дефолтным данным
        setGasData(Object.values(DEFAULT_GAS_PRICES))
        setEthPrice(2500)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Обновление каждые 30 секунд
    return () => clearInterval(interval)
  }, [])

  // Получение данных Tron
  useEffect(() => {
    const fetchTronData = async () => {
      try {
        const [gasData, trxPrice] = await Promise.all([
          getTronGasData(),
          getTRXPrice(),
        ])

        const tronGasInGwei = gasData.energyPrice / 1000

        const tronNetwork: GasPrice & { sparklineData: number[]; change24h: number } = {
          chainId: 728126428,
          chainName: 'Tron',
          timestamp: Date.now(),
          prices: {
            slow: {
              maxPriorityFeePerGas: tronGasInGwei * 0.8,
              maxFeePerGas: tronGasInGwei,
              estimatedTime: '~3 min',
            },
            average: {
              maxPriorityFeePerGas: tronGasInGwei,
              maxFeePerGas: tronGasInGwei * 1.3,
              estimatedTime: '~1 min',
            },
            fast: {
              maxPriorityFeePerGas: tronGasInGwei * 1.5,
              maxFeePerGas: tronGasInGwei * 2,
              estimatedTime: '~20 sec',
            },
          },
          baseFee: tronGasInGwei,
          trend: 'stable' as const,
          sparklineData: [450, 440, 430, 420, 430, 440, 420, 410, 420, 430, 425, 420],
          change24h: -2.5,
        }

        setTronData(tronNetwork)
      } catch (error) {
        console.warn('Failed to fetch Tron data:', error)
      }
    }

    fetchTronData()
    const interval = setInterval(fetchTronData, 60000)
    return () => clearInterval(interval)
  }, [])

  // Объединяем все сети + Tron
  const allNetworks = tronData
    ? [...gasData.map(g => ({ ...g, sparklineData: DEFAULT_GAS_PRICES[g.chainName.toLowerCase()]?.sparklineData || [], change24h: DEFAULT_GAS_PRICES[g.chainName.toLowerCase()]?.change24h || 0 })), tronData]
    : gasData.map(g => ({ ...g, sparklineData: DEFAULT_GAS_PRICES[g.chainName.toLowerCase()]?.sparklineData || [], change24h: DEFAULT_GAS_PRICES[g.chainName.toLowerCase()]?.change24h || 0 }))

  // Если данных нет, используем дефолтные
  const displayNetworks = allNetworks.length > 0 ? allNetworks : Object.values(DEFAULT_GAS_PRICES)
  const selectedNetworkData = displayNetworks.find(n => n.chainName.toLowerCase() === selectedNetwork) || displayNetworks[0]

  // Обновление данных графика
  useEffect(() => {
    setChartData(generateChartData(selectedNetworkData.baseFee))
  }, [selectedNetwork])

  // Автообновление графика
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateChartData(selectedNetworkData.baseFee))
    }, 30000)

    return () => clearInterval(interval)
  }, [selectedNetworkData])

  // Вычисление статистики из реальных данных
  const ethNetwork = gasData.find(g => g.chainId === 1)
  const avgEthGas = ethNetwork?.baseFee || 25
  const minGasNetwork = displayNetworks.reduce((min, n) => n.baseFee < min.baseFee ? n : min, displayNetworks[0])
  
  // Получение AI рекомендации из первой сети
  const aiRecommendation = MOCK_AI_PREDICTION

  // Данные для сравнения сетей
  const comparisonData = displayNetworks.map(n => ({
    name: n.chainName.slice(0, 4),
    fullName: n.chainName,
    price: n.baseFee,
    change: n.change24h || 0,
  }))

  return (
    <div className="animate-slide-up">
      {/* Stats Overview - Адаптивная сетка */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard
          icon={<Activity className="w-4 h-4" />}
          label="Средний газ (ETH)"
          value={`${avgEthGas.toFixed(1)} Gwei`}
          change={ethNetwork?.trend === 'down' ? '-12.5% за 24ч' : ethNetwork?.trend === 'up' ? '+8.2% за 24ч' : 'Стабильно'}
          changeType={ethNetwork?.trend === 'down' ? 'positive' : ethNetwork?.trend === 'up' ? 'negative' : 'neutral'}
          delay={0}
        />
        <StatCard
          icon={<Leaf className="w-4 h-4" />}
          label="Сеть с мин. газом"
          value={minGasNetwork.chainName}
          change={`${minGasNetwork.baseFee.toFixed(4)} Gwei`}
          changeType="positive"
          delay={100}
        />
        <StatCard
          icon={<Clock className="w-4 h-4" />}
          label="AI Рекомендация"
          value={aiRecommendation.recommendation === 'buy' ? 'Покупать' : aiRecommendation.recommendation === 'urgent' ? 'Срочно' : 'Подождать'}
          change={aiRecommendation.expectedChange < 0 ? `${aiRecommendation.expectedChange}% через ${aiRecommendation.timeUntilOptimal}` : 'Стабильно'}
          changeType={aiRecommendation.expectedChange < 0 ? 'positive' : 'neutral'}
          delay={200}
        />
        <StatCard
          icon={<Layers className="w-4 h-4" />}
          label="Активных сетей"
          value={`${displayNetworks.length}`}
          change="ETH, L2s, Polygon"
          delay={300}
        />
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Вкладки - с горизонтальным скроллом на мобильных */}
          <div className="flex items-center gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Обзор
              </div>
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                (activeTab as string) === 'comparison'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Сравнение
              </div>
            </button>
          </div>

          {/* Сетка сетей - 1 колонка на мобильных, 2 на планшетах, 3 на десктопе */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            {displayNetworks.map((network, index) => (
              <div
                key={network.chainId}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <NetworkCard
                  network={network}
                  isSelected={selectedNetwork === network.chainName.toLowerCase()}
                  onClick={() => setSelectedNetwork(network.chainName.toLowerCase())}
                  compact
                />
              </div>
            ))}
          </div>

          {/* Детальный график выбранной сети */}
          <div className="omni-card p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative flex-shrink-0">
                  <CryptoIcon chain={selectedNetworkData.chainName} size={32} />
                  <div className="absolute -inset-2 rounded-full bg-orange-500/10 blur-lg animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">{selectedNetworkData.chainName}</h2>
                  <p className="text-xs sm:text-sm text-zinc-500 hidden sm:block">История цен за 24 часа</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-orange-500/50 transition-all flex-shrink-0"
                >
                  <Calculator className="w-4 h-4 text-orange-500" />
                  <span className="text-xs sm:text-sm font-medium text-white hidden sm:inline">Калькулятор</span>
                </button>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg sm:text-2xl font-bold text-white">{formatGasPrice(selectedNetworkData.baseFee)}</p>
                  <p className={`text-xs sm:text-sm ${selectedNetworkData.change24h >= 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {selectedNetworkData.change24h >= 0 ? '+' : ''}{selectedNetworkData.change24h}%
                  </p>
                </div>
              </div>
            </div>
            <div className="h-48 sm:h-56 md:h-64 animate-fade-in">
              <ResponsiveContainer>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
                  <XAxis
                    dataKey="time"
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#71717a"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value.toFixed(2)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181b',
                      border: '1px solid #27272a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#f97316"
                    strokeWidth={3}
                    fill="url(#priceGradient)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        /* Tab Сравнение */
        <div className="omni-card p-6 animate-scale-in">
          <h2 className="text-xl font-bold text-white mb-6">Сравнение сетей по газу</h2>
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" opacity={0.5} />
                <XAxis
                  dataKey="name"
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#71717a"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: number, _name: string, props: any) => [
                    `${value.toFixed(4)} Gwei`,
                    props.payload.fullName
                  ]}
                />
                <Bar
                  dataKey="price"
                  fill="url(#barGradient)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f97316"/>
                    <stop offset="100%" stopColor="#ea580c"/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Таблица сравнения */}
          <div className="mt-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-zinc-500">Сеть</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-500">Base Fee</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-500">Slow</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-500">Fast</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-500">Instant</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-zinc-500">24h Изм.</th>
                </tr>
              </thead>
              <tbody>
                {displayNetworks.map((network) => (
                  <tr 
                    key={network.chainId} 
                    className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-all duration-300"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <CryptoIcon chain={network.chainName} size={24} />
                        <span className="text-white font-medium">{network.chainName}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-white font-semibold">
                      {formatGasPrice(network.baseFee)}
                    </td>
                    <td className="text-right py-4 px-4 text-emerald-500">
                      {formatGasPrice(network.prices.slow.maxFeePerGas)}
                    </td>
                    <td className="text-right py-4 px-4 text-amber-500">
                      {formatGasPrice(network.prices.average.maxFeePerGas)}
                    </td>
                    <td className="text-right py-4 px-4 text-rose-500">
                      {formatGasPrice(network.prices.fast.maxFeePerGas)}
                    </td>
                    <td className={`text-right py-4 px-4 font-medium ${
                      network.change24h >= 0 ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {network.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {network.change24h >= 0 ? '+' : ''}{network.change24h.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Recommendation Banner */}
      <div className="mt-6 sm:mt-8 omni-border animate-float">
        <div className="relative bg-zinc-900 rounded-2xl p-4 sm:p-6">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 relative z-10">
            <div className="p-2.5 sm:p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 flex-shrink-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">AI Insight</h3>
              <p className="text-sm sm:text-base text-zinc-400 mb-3">{MOCK_AI_PREDICTION.message}</p>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-zinc-500">Изменение:</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-500">{MOCK_AI_PREDICTION.expectedChange}%</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-zinc-500">Время:</span>
                  <span className="text-xs sm:text-sm font-bold text-white">{MOCK_AI_PREDICTION.timeUntilOptimal}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xs sm:text-sm text-zinc-500">Точность:</span>
                  <span className="text-xs sm:text-sm font-bold text-orange-500">{MOCK_AI_PREDICTION.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gas Calculator Modal */}
      {isCalculatorOpen && (
        <GasCalculator
          gasPrice={selectedNetworkData}
          onClose={() => setIsCalculatorOpen(false)}
        />
      )}
    </div>
  )
}

export default NetworksDashboard

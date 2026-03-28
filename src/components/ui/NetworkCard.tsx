import React from 'react'
import { TrendingUp, TrendingDown, Minus, Activity, Zap, Clock, CheckCircle, DollarSign } from 'lucide-react'
import { CryptoIcon } from './CryptoIcons'
import { MiniSparkline } from './GasChart'
import type { GasPrice } from '../../types'
import { formatGasPrice, getGasStatusColor } from '../../utils/formatters'

interface NetworkCardProps {
  network: GasPrice & {
    sparklineData?: number[]
    change24h?: number
  }
  onClick?: () => void
  isSelected?: boolean
  compact?: boolean
}

export const NetworkCard: React.FC<NetworkCardProps> = ({
  network,
  onClick,
  isSelected = false,
  compact = false,
}) => {
  const trend = network.trend
  const change24h = network.change24h || 0
  const sparklineData = network.sparklineData || [25, 24, 26, 23, 25, 24, 22, 21, 23, 24]
  
  const getTrendColor = () => {
    if (trend === 'down') return '#10b981'
    if (trend === 'up') return '#f43f5e'
    return '#f59e0b'
  }

  const getTrendIcon = () => {
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />
    return <Minus className="w-4 h-4" />
  }

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`omni-card p-4 cursor-pointer group ${
          isSelected ? 'border-orange-500/50 bg-orange-500/10' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="group-hover:scale-110 transition-transform duration-300">
              <CryptoIcon chain={network.chainName} size={32} />
            </div>
            <div>
              <h3 className="text-white font-semibold">{network.chainName}</h3>
              <p className="text-xs text-zinc-500">Layer {network.chainId === 1 ? '1' : '2'}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{formatGasPrice(network.baseFee)}</p>
            <p className="text-xs text-orange-400 font-medium">
              ${(network.baseFee * 0.000001 * 2500).toFixed(3)} USDT
            </p>
            <div className={`flex items-center justify-center gap-1 text-xs ${
              trend === 'down' ? 'text-emerald-500' : trend === 'up' ? 'text-rose-500' : 'text-amber-500'
            }`}>
              {getTrendIcon()}
              <span>{change24h > 0 ? '+' : ''}{change24h.toFixed(1)}%</span>
            </div>
          </div>
        </div>
        <MiniSparkline
          data={sparklineData}
          color={getTrendColor()}
          width={120}
          height={35}
          trend={trend}
        />
      </div>
    )
  }

  return (
    <div
      onClick={onClick}
      className={`omni-card p-6 cursor-pointer group ${
        isSelected ? 'border-orange-500/50 bg-orange-500/10' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative group-hover:scale-110 transition-transform duration-300">
            <CryptoIcon chain={network.chainName} size={48} />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
              trend === 'down' ? 'bg-emerald-500' : trend === 'up' ? 'bg-rose-500' : 'bg-amber-500'
            }`}>
              {getTrendIcon()}
            </div>
            <div className="absolute -inset-2 rounded-full bg-orange-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{network.chainName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500">Chain ID: {network.chainId}</span>
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">
                Layer {network.chainId === 1 ? '1' : '2'}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-1">
            <Activity className={`w-5 h-5 ${getGasStatusColor(network.baseFee)}`} />
            <p className="text-3xl font-bold text-white">{formatGasPrice(network.baseFee)}</p>
          </div>
          <div className="flex items-center justify-end gap-2 text-xs">
            <span className="text-orange-400 font-medium">
              ${(network.baseFee * 0.000001 * 2500).toFixed(4)} USDT
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500">{(network.baseFee * 1000000000).toFixed(0)} Gwei</span>
          </div>
          <p className={`text-sm font-medium mt-1 ${
            trend === 'down' ? 'text-emerald-500' : trend === 'up' ? 'text-rose-500' : 'text-amber-500'
          }`}>
            {change24h > 0 ? '+' : ''}{change24h.toFixed(2)}% (24h)
          </p>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-6">
        <MiniSparkline
          data={sparklineData}
          color={getTrendColor()}
          width={200}
          height={50}
          trend={trend}
        />
      </div>

      {/* Gas Prices */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-500">Slow</span>
          </div>
          <p className="text-lg font-bold text-emerald-500">
            {formatGasPrice(network.prices.slow.maxFeePerGas)}
          </p>
          <p className="text-xs text-zinc-600">{network.prices.slow.estimatedTime}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-500">Fast</span>
          </div>
          <p className="text-lg font-bold text-amber-500">
            {formatGasPrice(network.prices.average.maxFeePerGas)}
          </p>
          <p className="text-xs text-zinc-600">{network.prices.average.estimatedTime}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-zinc-500" />
            <span className="text-xs text-zinc-500">Instant</span>
          </div>
          <p className="text-lg font-bold text-rose-500">
            {formatGasPrice(network.prices.fast.maxFeePerGas)}
          </p>
          <p className="text-xs text-zinc-600">{network.prices.fast.estimatedTime}</p>
        </div>
      </div>

      {/* Status indicator */}
      <div className="mt-4 flex items-center gap-2">
        <CheckCircle className={`w-4 h-4 ${
          network.baseFee < 20 ? 'text-emerald-500' : network.baseFee < 50 ? 'text-amber-500' : 'text-rose-500'
        }`} />
        <span className={`text-sm font-medium ${
          network.baseFee < 20 ? 'text-emerald-500' : network.baseFee < 50 ? 'text-amber-500' : 'text-rose-500'
        }`}>
          {network.baseFee < 20 ? 'Низкий газ - выгодно!' : 
           network.baseFee < 50 ? 'Средний газ' : 'Высокий газ - лучше подождать'}
        </span>
      </div>
    </div>
  )
}

export default NetworkCard

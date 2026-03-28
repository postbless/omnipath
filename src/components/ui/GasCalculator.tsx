import React, { useState } from 'react'
import { Calculator, TrendingUp, TrendingDown, Zap, Clock, DollarSign, X, Coins } from 'lucide-react'
import type { GasPrice } from '../../types'
import { formatGasPrice, formatCurrency } from '../../utils/formatters'

interface GasCalculatorProps {
  gasPrice: GasPrice
  onClose: () => void
}

const GasCalculator: React.FC<GasCalculatorProps> = ({ gasPrice, onClose }) => {
  const [gasLimit, setGasLimit] = useState<string>('21000')
  const [transactionType, setTransactionType] = useState<'slow' | 'average' | 'fast'>('average')

  const selectedGas = gasPrice.prices[transactionType]
  const gasLimitNum = parseFloat(gasLimit) || 0
  const totalGas = (selectedGas.maxFeePerGas * gasLimitNum) / 1000000000 // Convert to ETH
  const totalUSD = totalGas * 2500 // Approximate ETH price

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md omni-card p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10">
              <Calculator className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Калькулятор Газа</h3>
              <p className="text-sm text-zinc-500">Рассчитайте стоимость транзакции</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Тип транзакции */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-3">Скорость транзакции</label>
          <div className="grid grid-cols-3 gap-2">
            {(['slow', 'average', 'fast'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTransactionType(type)}
                className={`py-3 px-4 rounded-xl border transition-all duration-300 ${
                  transactionType === type
                    ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                    : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-600'
                }`}
              >
                <div className="text-sm font-medium capitalize">{type}</div>
                <div className="text-xs mt-1">{gasPrice.prices[type].estimatedTime}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Лимит газа */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Gas Limit</label>
          <div className="relative">
            <input
              type="number"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              className="omni-input text-lg font-medium"
              placeholder="21000"
            />
          </div>
          <div className="flex gap-2 mt-2">
            {[
              { label: 'Transfer', value: '21000' },
              { label: 'ERC20', value: '65000' },
              { label: 'NFT', value: '150000' },
              { label: 'Swap', value: '200000' },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setGasLimit(preset.value)}
                className="flex-1 py-2 px-3 rounded-lg bg-zinc-800/50 border border-zinc-700 text-xs text-zinc-400 hover:border-orange-500/50 hover:text-orange-400 transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Результаты */}
        <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-400">Цена газа</span>
            <div className="text-right">
              <span className="text-white font-semibold block">{formatGasPrice(selectedGas.maxFeePerGas)}</span>
              <span className="text-xs text-zinc-500">{(selectedGas.maxFeePerGas * 1000000000).toFixed(0)} Gwei</span>
            </div>
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-zinc-400">Gas Limit</span>
            <span className="text-white font-semibold">{gasLimitNum.toLocaleString()}</span>
          </div>
          <div className="border-t border-zinc-700 my-3 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Итого (ETH)</span>
              <span className="text-orange-400 font-bold">{totalGas.toFixed(6)} ETH</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Итого (USDT)</span>
              <span className="text-emerald-400 font-bold">{formatCurrency(totalUSD)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">В Gwei</span>
              <span className="text-zinc-500 font-mono text-sm">{(totalGas * 1000000000).toFixed(0)} Gwei</span>
            </div>
          </div>
        </div>

        {/* Инфо о тренде */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
          {gasPrice.trend === 'down' ? (
            <TrendingDown className="w-5 h-5 text-emerald-500" />
          ) : gasPrice.trend === 'up' ? (
            <TrendingUp className="w-5 h-5 text-rose-500" />
          ) : (
            <Zap className="w-5 h-5 text-amber-500" />
          )}
          <span className="text-sm text-zinc-400">
            {gasPrice.trend === 'down' 
              ? 'Газ снижается - хорошее время для транзакции!' 
              : gasPrice.trend === 'up'
              ? 'Газ растёт - рассмотрите ожидание'
              : 'Газ стабилен'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default GasCalculator

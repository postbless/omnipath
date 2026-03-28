import React, { useState } from 'react'
import { ArrowDown, Search, Check, ExternalLink, Clock, DollarSign, ArrowRight, Shield, TrendingUp } from 'lucide-react'
import { CryptoIcon } from './ui/CryptoIcons'
import type { BridgeRoute } from '../types'
import { formatCurrency, formatNumber } from '../utils/formatters'

// Моковые данные для сетей
const SUPPORTED_NETWORKS = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH', color: '#28A0F0' },
  { id: 'optimism', name: 'Optimism', symbol: 'ETH', color: '#FF0420' },
  { id: 'base', name: 'Base', symbol: 'ETH', color: '#0052FF' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
] as const

// Моковые данные для мостов
const MOCK_BRIDGE_ROUTES: BridgeRoute[] = [
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
    steps: [
      {
        type: 'bridge',
        protocol: 'Li.Fi',
        fromChain: 'Ethereum',
        toChain: 'Arbitrum',
        fromToken: 'ETH',
        toToken: 'ETH',
        fromAmount: 1,
        toAmount: 0.9985,
        fee: 4.50,
      },
    ],
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
    steps: [
      {
        type: 'bridge',
        protocol: 'Hop',
        fromChain: 'Ethereum',
        toChain: 'Arbitrum',
        fromToken: 'ETH',
        toToken: 'ETH',
        fromAmount: 1,
        toAmount: 0.9978,
        fee: 6.20,
      },
    ],
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
    steps: [
      {
        type: 'bridge',
        protocol: 'Across',
        fromChain: 'Ethereum',
        toChain: 'Arbitrum',
        fromToken: 'ETH',
        toToken: 'ETH',
        fromAmount: 1,
        toAmount: 0.9982,
        fee: 5.10,
      },
    ],
  },
]

interface NetworkSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  networks: typeof SUPPORTED_NETWORKS
  exclude?: string
}

const NetworkSelect: React.FC<NetworkSelectProps> = ({ label, value, onChange, networks, exclude }) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedNetwork = networks.find(n => n.id === value)
  const filteredNetworks = networks.filter(n => n.id !== exclude)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-zinc-400 mb-2">{label}</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
      >
        {selectedNetwork ? (
          <div className="flex items-center gap-3">
            <CryptoIcon chain={selectedNetwork.id} size={32} />
            <div className="text-left">
              <p className="text-white font-medium">{selectedNetwork.name}</p>
              <p className="text-xs text-zinc-500">{selectedNetwork.symbol}</p>
            </div>
          </div>
        ) : (
          <span className="text-zinc-500">Выберите сеть</span>
        )}
        <ArrowDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 p-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl backdrop-blur-xl max-h-64 overflow-y-auto animate-scale-in">
          {filteredNetworks.map((network) => (
            <button
              key={network.id}
              onClick={() => {
                onChange(network.id)
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-700/50 transition-colors"
            >
              <CryptoIcon chain={network.id} size={28} />
              <div className="text-left flex-1">
                <p className="text-white font-medium">{network.name}</p>
                <p className="text-xs text-zinc-500">{network.symbol}</p>
              </div>
              {value === network.id && (
                <Check className="w-5 h-5 text-orange-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const BridgeAggregator: React.FC = () => {
  const [fromChain, setFromChain] = useState<string>('ethereum')
  const [toChain, setToChain] = useState<string>('arbitrum')
  const [amount, setAmount] = useState<string>('')
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = () => {
    if (!fromChain || !toChain || !amount) return

    setIsSearching(true)
    setHasSearched(true)

    // Симуляция поиска маршрутов
    setTimeout(() => {
      setIsSearching(false)
    }, 1500)
  }

  const handleSelectRoute = (routeId: string) => {
    setSelectedRoute(routeId)
  }

  const numericAmount = parseFloat(amount) || 0
  const displayRoutes = hasSearched ? MOCK_BRIDGE_ROUTES : []

  // Лучший маршрут (с минимальной комиссией)
  const bestRoute = displayRoutes.length > 0 
    ? displayRoutes.reduce((min, route) => route.fee < min.fee ? route : min)
    : null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Левая панель - Форма поиска */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <div className="omni-border">
            <div className="relative bg-zinc-900 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full animated-gradient flex items-center justify-center shadow-glow-orange">
                  <ArrowDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Bridge Search</h3>
                  <p className="text-sm text-zinc-500">Найти лучший маршрут</p>
                </div>
              </div>

              {/* Поля ввода */}
              <div className="space-y-4 mb-6">
                <NetworkSelect
                  label="Откуда"
                  value={fromChain}
                  onChange={setFromChain}
                  networks={SUPPORTED_NETWORKS}
                  exclude={toChain}
                />
                
                <div className="relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 border-4 border-zinc-900 flex items-center justify-center animate-float-fast">
                      <ArrowDown className="w-4 h-4 text-orange-500" />
                    </div>
                  </div>
                </div>

                <NetworkSelect
                  label="Куда"
                  value={toChain}
                  onChange={setToChain}
                  networks={SUPPORTED_NETWORKS}
                  exclude={fromChain}
                />
              </div>

              {/* Поле суммы */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-400 mb-2">Сумма</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="omni-input text-lg font-medium"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <span className="text-zinc-500 text-sm">
                      {SUPPORTED_NETWORKS.find(n => n.id === fromChain)?.symbol || 'ETH'}
                    </span>
                  </div>
                </div>
                {numericAmount > 0 && (
                  <div className="mt-2 flex items-center justify-between">
                    <p className="text-sm text-zinc-500">
                      ≈ {formatCurrency(numericAmount * 2500)} USD
                    </p>
                    <button
                      onClick={() => setAmount((parseFloat(amount) || 0.1).toString())}
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      MAX
                    </button>
                  </div>
                )}
              </div>

              {/* Кнопка поиска */}
              <button
                onClick={handleSearch}
                disabled={!fromChain || !toChain || !amount || isSearching}
                className="w-full py-4 px-6 rounded-xl omni-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Поиск маршрутов...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Найти мосты</span>
                  </>
                )}
              </button>

              {/* Информация о безопасности */}
              <div className="mt-6 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/50">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Безопасный бридж</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Все маршруты проверены и используют аудированные смарт-контракты
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Правая панель - Результаты */}
      <div className="lg:col-span-2">
        {!hasSearched && !isSearching && (
          <div className="h-full flex items-center justify-center min-h-[400px] animate-fade-in">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center animate-float">
                <Search className="w-10 h-10 text-zinc-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Найдите лучшие маршруты</h3>
              <p className="text-zinc-500 max-w-md">
                Выберите сети и введите сумму для поиска оптимальных маршрутов через различные мосты
              </p>
              
              {/* Популярные маршруты */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { from: 'Ethereum', to: 'Arbitrum', icon: '⚡' },
                  { from: 'Ethereum', to: 'Optimism', icon: '🔴' },
                  { from: 'Ethereum', to: 'Base', icon: '🔵' },
                ].map((route, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const fromNet = SUPPORTED_NETWORKS.find(n => n.name === route.from)
                      const toNet = SUPPORTED_NETWORKS.find(n => n.name === route.to)
                      if (fromNet && toNet) {
                        setFromChain(fromNet.id)
                        setToChain(toNet.id)
                        setAmount('1')
                      }
                    }}
                    className="p-3 rounded-xl omni-card hover:scale-105 transition-transform duration-300"
                  >
                    <span className="text-2xl mb-1 block">{route.icon}</span>
                    <p className="text-xs text-zinc-500">{route.from}</p>
                    <ArrowRight className="w-3 h-3 text-zinc-600 my-1 mx-auto" />
                    <p className="text-xs text-zinc-500">{route.to}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isSearching && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800" />
                  <div className="flex-1">
                    <div className="h-4 bg-zinc-800 rounded w-32 mb-2" />
                    <div className="h-3 bg-zinc-800 rounded w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-12 bg-zinc-800 rounded-xl" />
                  <div className="h-12 bg-zinc-800 rounded-xl" />
                  <div className="h-12 bg-zinc-800 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        )}

        {displayRoutes.length > 0 && !isSearching && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Доступные маршруты</h2>
                <p className="text-sm text-zinc-500">{displayRoutes.length} маршрутов найдено</p>
              </div>
              {bestRoute && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-500">
                    Лучший: {bestRoute.bridgeName}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {displayRoutes.map((route, index) => {
                const isBest = bestRoute?.id === route.id
                const isSelected = selectedRoute === route.id

                return (
                  <div
                    key={route.id}
                    onClick={() => handleSelectRoute(route.id)}
                    className={`p-6 rounded-2xl border transition-all duration-500 cursor-pointer hover:scale-[1.01] ${
                      isBest
                        ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/50 shadow-glow-emerald'
                        : isSelected
                        ? 'bg-orange-500/20 border-orange-500/50 shadow-glow-orange'
                        : 'omni-card'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center border border-orange-500/30">
                            <span className="text-lg font-bold text-white">{route.bridgeName.charAt(0)}</span>
                          </div>
                          {isBest && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-semibold">{route.bridgeName}</p>
                            {isBest && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-xs font-medium text-emerald-500">
                                Лучший выбор
                              </span>
                            )}
                            {index === 0 && !isBest && (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-xs font-medium text-amber-500">
                                Быстрый
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                            <div className="flex items-center gap-1">
                              <CryptoIcon chain={route.fromChain.toLowerCase()} size={16} />
                              <span>{route.fromChain}</span>
                            </div>
                            <ArrowRight className="w-3 h-3" />
                            <div className="flex items-center gap-1">
                              <CryptoIcon chain={route.toChain.toLowerCase()} size={16} />
                              <span>{route.toChain}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30">
                          <Check className="w-4 h-4 text-orange-400" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-zinc-500" />
                          <span className="text-xs text-zinc-500">Время</span>
                        </div>
                        <p className="text-white font-semibold">{route.estimatedTime}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-zinc-500" />
                          <span className="text-xs text-zinc-500">Комиссия</span>
                        </div>
                        <p className={`font-semibold ${isBest ? 'text-emerald-500' : 'text-white'}`}>
                          ${route.fee.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                        <div className="text-xs text-zinc-500 mb-1">Получите</div>
                        <p className="text-orange-400 font-bold">
                          {formatNumber(route.toAmount, 4)} {route.toToken}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSelectRoute(route.id)
                      }}
                      className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                        isSelected
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      {isSelected ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" />
                          Выбрано
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Выбрать маршрут
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Кнопка продолжения */}
            {selectedRoute && (
              <button className="w-full mt-6 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 animate-scale-in">
                <span>Продолжить с {MOCK_BRIDGE_ROUTES.find(r => r.id === selectedRoute)?.bridgeName}</span>
                <ExternalLink className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BridgeAggregator

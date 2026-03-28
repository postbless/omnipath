import React, { useState } from 'react'
import { Calendar, Clock, TrendingUp, Zap, Shield, Globe, Users, ChevronRight, X, Filter } from 'lucide-react'

export interface BlockchainEvent {
  id: string
  title: string
  description: string
  date: string
  time?: string
  network: string
  type: 'upgrade' | 'hardfork' | 'unlock' | 'conference' | 'aml' | 'governance' | 'mainnet'
  impact: 'low' | 'medium' | 'high'
  link?: string
}

// Моковые данные событий
const MOCK_EVENTS: BlockchainEvent[] = [
  {
    id: '1',
    title: 'Ethereum Dencun Upgrade',
    description: 'Major network upgrade implementing EIP-4844 (Proto-Danksharding) for reduced L2 costs',
    date: '2024-03-13',
    time: '13:55 UTC',
    network: 'ethereum',
    type: 'upgrade',
    impact: 'high',
    link: 'https://ethereum.org',
  },
  {
    id: '2',
    title: 'Arbitrum DAO Governance Vote',
    description: 'Community voting on treasury allocation for ecosystem development',
    date: '2024-03-15',
    time: '00:00 UTC',
    network: 'arbitrum',
    type: 'governance',
    impact: 'medium',
  },
  {
    id: '3',
    title: 'Optimism Token Unlock',
    description: 'Scheduled unlock of 25M OP tokens (~$75M) from investor allocation',
    date: '2024-03-18',
    network: 'optimism',
    type: 'unlock',
    impact: 'high',
  },
  {
    id: '4',
    title: 'ETH Denver 2024',
    description: 'Major Ethereum community conference with announcements expected',
    date: '2024-03-20',
    time: '09:00 MST',
    network: 'ethereum',
    type: 'conference',
    impact: 'medium',
    link: 'https://ethdenver.com',
  },
  {
    id: '5',
    title: 'Base Network Upgrade',
    description: 'Network upgrade to improve transaction throughput and reduce fees',
    date: '2024-03-22',
    time: '18:00 UTC',
    network: 'base',
    type: 'upgrade',
    impact: 'medium',
  },
  {
    id: '6',
    title: 'Polygon 2.0 Roadmap Announcement',
    description: 'Expected announcement of Polygon 2.0 implementation timeline',
    date: '2024-03-25',
    network: 'polygon',
    type: 'upgrade',
    impact: 'high',
  },
  {
    id: '7',
    title: 'zkSync Era Mainnet Alpha',
    description: 'Launch of zkSync Era mainnet alpha with zkEVM capabilities',
    date: '2024-03-28',
    time: '12:00 UTC',
    network: 'zkSync',
    type: 'mainnet',
    impact: 'high',
  },
  {
    id: '8',
    title: 'BSC Greenfield Integration',
    description: 'Integration of BSC Greenfield decentralized storage solution',
    date: '2024-04-01',
    network: 'bsc',
    type: 'upgrade',
    impact: 'medium',
  },
  {
    id: '9',
    title: 'Solana Breakpoint 2024',
    description: 'Annual Solana developer conference',
    date: '2024-04-05',
    time: '09:00 SGT',
    network: 'solana',
    type: 'conference',
    impact: 'low',
  },
  {
    id: '10',
    title: 'Ethereum Pectra Upgrade',
    description: 'Combined Prague + Electra upgrade with account abstraction improvements',
    date: '2024-04-10',
    network: 'ethereum',
    type: 'hardfork',
    impact: 'high',
  },
  {
    id: '11',
    title: 'Mantle Ecosystem Fund Launch',
    description: 'Launch of $200M ecosystem development fund',
    date: '2024-04-15',
    network: 'mantle',
    type: 'aml',
    impact: 'medium',
  },
  {
    id: '12',
    title: 'Linea Mainnet Beta',
    description: 'ConsenSys zkEVM rollup Linea mainnet beta launch',
    date: '2024-04-20',
    time: '14:00 UTC',
    network: 'lineal',
    type: 'mainnet',
    impact: 'high',
  },
]

interface EventCalendarProps {
  isOpen: boolean
  onClose: () => void
}

const EventCalendar: React.FC<EventCalendarProps> = ({ isOpen, onClose }) => {
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  if (!isOpen) return null

  const today = new Date()
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const eventDate = new Date(event.date)
    
    // Filter by time range
    if (filter === 'week' && eventDate > weekFromNow) return false
    if (filter === 'month' && eventDate > monthFromNow) return false
    
    // Filter by type
    if (typeFilter !== 'all' && event.type !== typeFilter) return false
    
    return true
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const getEventTypeIcon = (type: BlockchainEvent['type']) => {
    switch (type) {
      case 'upgrade': return <Zap className="w-4 h-4" />
      case 'hardfork': return <TrendingUp className="w-4 h-4" />
      case 'unlock': return <Shield className="w-4 h-4" />
      case 'conference': return <Users className="w-4 h-4" />
      case 'aml': return <Globe className="w-4 h-4" />
      case 'governance': return <Users className="w-4 h-4" />
      case 'mainnet': return <Zap className="w-4 h-4" />
    }
  }

  const getEventTypeColor = (type: BlockchainEvent['type']) => {
    switch (type) {
      case 'upgrade': return 'text-blue-500 bg-blue-500/10'
      case 'hardfork': return 'text-rose-500 bg-rose-500/10'
      case 'unlock': return 'text-amber-500 bg-amber-500/10'
      case 'conference': return 'text-purple-500 bg-purple-500/10'
      case 'aml': return 'text-emerald-500 bg-emerald-500/10'
      case 'governance': return 'text-indigo-500 bg-indigo-500/10'
      case 'mainnet': return 'text-orange-500 bg-orange-500/10'
    }
  }

  const getImpactColor = (impact: BlockchainEvent['impact']) => {
    switch (impact) {
      case 'low': return 'text-zinc-500 bg-zinc-800'
      case 'medium': return 'text-amber-500 bg-amber-500/10'
      case 'high': return 'text-rose-500 bg-rose-500/10'
    }
  }

  const getDaysUntil = (date: string) => {
    const eventDate = new Date(date)
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Сегодня'
    if (diffDays === 1) return 'Завтра'
    if (diffDays < 0) return 'Прошло'
    return `Через ${diffDays} дн.`
  }

  const eventTypes = [
    { value: 'all', label: 'Все типы' },
    { value: 'upgrade', label: 'Обновления' },
    { value: 'hardfork', label: 'Хардфорки' },
    { value: 'unlock', label: 'Разблокировки' },
    { value: 'conference', label: 'Конференции' },
    { value: 'governance', label: 'Голосования' },
    { value: 'mainnet', label: 'Запуски' },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto omni-card animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10">
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Календарь Событий</h2>
              <p className="text-sm text-zinc-500">Важные события блокчейна</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Time Range Filter */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-800/50 border border-zinc-700">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Все
              </button>
              <button
                onClick={() => setFilter('week')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'week'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Неделя
              </button>
              <button
                onClick={() => setFilter('month')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'month'
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Месяц
              </button>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-zinc-500" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700 text-zinc-300 focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 outline-none"
              >
                {eventTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Stats */}
            <div className="ml-auto flex items-center gap-4 text-sm text-zinc-500">
              <span>{filteredEvents.length} событий</span>
            </div>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="omni-card p-4 hover:border-orange-500/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  {/* Date Column */}
                  <div className="flex-shrink-0 w-20 text-center">
                    <div className="text-2xl font-bold text-white">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {new Date(event.date).toLocaleDateString('ru-RU', { month: 'short' })}
                    </div>
                    <div className={`mt-1 text-xs font-medium ${
                      getDaysUntil(event.date) === 'Сегодня' ? 'text-orange-500' :
                      getDaysUntil(event.date) === 'Завтра' ? 'text-amber-500' :
                      'text-zinc-500'
                    }`}>
                      {getDaysUntil(event.date)}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className={`p-2 rounded-xl ${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{event.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getImpactColor(event.impact)}`}>
                        {event.impact === 'low' ? 'Низкий' : event.impact === 'medium' ? 'Средний' : 'Высокий'}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time || 'Весь день'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span className="capitalize">{event.network}</span>
                      </div>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors"
                        >
                          Подробнее
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
              <p className="text-zinc-500">Нет событий для выбранных фильтров</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { MOCK_EVENTS }
export default EventCalendar

// Константы для проекта Crypto Gas & Bridge Dashboard

// Поддерживаемые сети
export const SUPPORTED_CHAINS = {
  ETHEREUM: 1,
  ARBITRUM: 42161,
  OPTIMISM: 10,
  BASE: 8453,
  POLYGON: 137,
} as const

// Типы транзакций
export const TRANSACTION_TYPES = {
  SLOW: 'slow',
  AVERAGE: 'average',
  FAST: 'fast',
} as const

// Статусы газа
export const GAS_STATUS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  EXTREME: 'extreme',
} as const

// Типы рекомендаций ИИ
export const AI_RECOMMENDATIONS = {
  BUY: 'buy',
  WAIT: 'wait',
  URGENT: 'urgent',
} as const

// Популярные мосты
export const BRIDGE_PROTOCOLS = {
  LIFI: 'Li.Fi',
  SOCKET: 'Socket',
  HOP: 'Hop',
  ACROSS: 'Across',
  STARGATE: 'Stargate',
  SYNAPSE: 'Synapse',
} as const

// Значения по умолчанию
export const DEFAULT_VALUES = {
  GAS_REFRESH_INTERVAL: 30000, // 30 секунд
  BRIDGE_SEARCH_DEBOUNCE: 500, // 500мс
  MAX_ROUTES_DISPLAY: 5,
} as const

// Ссылки
export const LINKS = {
  ETHERSCAN: 'https://etherscan.io',
  ARBITRUM_SCAN: 'https://arbiscan.io',
  OPTIMISM_SCAN: 'https://optimistic.etherscan.io',
  BASE_SCAN: 'https://basescan.org',
  POLYGON_SCAN: 'https://polygonscan.com',
} as const

// Моковые данные для газа (используется во время разработки)
export const MOCK_GAS_DATA = {
  ETHEREUM: { baseFee: 25, trend: 'down' as const },
  ARBITRUM: { baseFee: 0.1, trend: 'stable' as const },
  OPTIMISM: { baseFee: 0.05, trend: 'stable' as const },
  BASE: { baseFee: 0.08, trend: 'up' as const },
  POLYGON: { baseFee: 30, trend: 'down' as const },
} as const

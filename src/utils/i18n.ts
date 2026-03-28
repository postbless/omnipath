// Словари переводов для OmniPath
export type Language = 'ru' | 'en' | 'zh'

export const translations = {
  ru: {
    // Header
    'header.gasTracker': 'Gas Tracker',
    'header.bridges': 'Bridges',
    
    // Welcome Screen
    'welcome.title': 'OmniPath',
    'welcome.subtitle': 'Ваш путь в мире блокчейна',
    'welcome.features.monitoring': 'Мониторинг Газа',
    'welcome.features.monitoring.desc': 'Отслеживайте цены на газ в реальном времени across всех сетей',
    'welcome.features.bridges': 'Агрегатор Мостов',
    'welcome.features.bridges.desc': 'Находите лучшие маршруты для кросс-чейн переводов',
    'welcome.features.ai': 'AI Рекомендации',
    'welcome.features.ai.desc': 'Получайте умные советы для оптимизации транзакций',
    'welcome.button': 'Начать использовать',
    'welcome.footer': 'Нажмите, чтобы продолжить • Без регистрации • Бесплатно',
    
    // Dashboard
    'dashboard.stats.avgGas': 'Средний газ (ETH)',
    'dashboard.stats.minGas': 'Сеть с мин. газом',
    'dashboard.stats.aiRec': 'AI Рекомендация',
    'dashboard.stats.activeNetworks': 'Активных сетей',
    'dashboard.tabs.overview': 'Обзор сетей',
    'dashboard.tabs.comparison': 'Сравнение',
    'dashboard.chart.title': 'История цен за 24 часа',
    'dashboard.calculator': 'Калькулятор',
    
    // Network Card
    'network.slow': 'Slow',
    'network.fast': 'Fast',
    'network.instant': 'Instant',
    'network.lowGas': 'Низкий газ - выгодно!',
    'network.medGas': 'Средний газ',
    'network.highGas': 'Высокий газ - лучше подождать',
    
    // Comparison Table
    'comparison.network': 'Сеть',
    'comparison.baseFee': 'Base Fee',
    'comparison.change24h': '24h Изм.',
    
    // AI Insight
    'ai.title': 'AI Insight',
    'ai.expectedChange': 'Ожидаемое изменение:',
    'ai.optimalTime': 'Оптимальное время:',
    'ai.accuracy': 'Точность:',
    
    // Bridge Aggregator
    'bridge.title': 'Bridge Aggregator',
    'bridge.subtitle': 'Найдите лучшие маршруты для кросс-чейн переводов',
    'bridge.search': 'Найти мосты',
    'bridge.searching': 'Поиск маршрутов...',
    'bridge.from': 'Откуда',
    'bridge.to': 'Куда',
    'bridge.amount': 'Сумма',
    'bridge.selectNetwork': 'Выберите сеть',
    'bridge.routes': 'Доступные маршруты',
    'bridge.routesFound': 'маршрутов найдено',
    'bridge.best': 'Лучший выбор',
    'bridge.fast': 'Быстрый',
    'bridge.time': 'Время',
    'bridge.fee': 'Комиссия',
    'bridge.receive': 'Получите',
    'bridge.select': 'Выбрать маршрут',
    'bridge.selected': 'Выбрано',
    'bridge.continue': 'Продолжить с',
    'bridge.safe': 'Безопасный бридж',
    'bridge.safe.desc': 'Все маршруты проверены и используют аудированные смарт-контракты',
    'bridge.popular': 'Найдите лучшие маршруты',
    'bridge.popular.desc': 'Выберите сети и введите сумму для поиска оптимальных маршрутов через различные мосты',
    
    // Gas Calculator
    'calculator.title': 'Калькулятор Газа',
    'calculator.subtitle': 'Рассчитайте стоимость транзакции',
    'calculator.speed': 'Скорость транзакции',
    'calculator.gasLimit': 'Gas Limit',
    'calculator.total': 'Итого',
    'calculator.transfer': 'Transfer',
    'calculator.erc20': 'ERC20',
    'calculator.nft': 'NFT',
    'calculator.swap': 'Swap',
    'calculator.gasPrice': 'Цена газа',
    'calculator.trend.down': 'Газ снижается - хорошее время для транзакции!',
    'calculator.trend.up': 'Газ растёт - рассмотрите ожидание',
    'calculator.trend.stable': 'Газ стабилен',
    
    // Settings
    'settings.title': 'Настройки',
    'settings.subtitle': 'Настройте OmniPath под себя',
    'settings.notifications': 'Уведомления',
    'settings.appearance': 'Внешний вид',
    'settings.general': 'Общие',
    'settings.privacy': 'Приватность',
    'settings.priceAlerts': 'Ценовые уведомления',
    'settings.priceAlerts.desc': 'Получать уведомления об изменении цен на газ',
    'settings.bridgeAlerts': 'Уведомления о мостах',
    'settings.bridgeAlerts.desc': 'Уведомлять о новых маршрутах мостов',
    'settings.aiRec': 'AI рекомендации',
    'settings.aiRec.desc': 'Получать советы от искусственного интеллекта',
    'settings.system': 'Системные уведомления',
    'settings.system.desc': 'Важные обновления и изменения',
    'settings.theme': 'Тема оформления',
    'settings.theme.dark': 'Тёмная',
    'settings.theme.light': 'Светлая',
    'settings.theme.auto': 'Авто',
    'settings.accentColor': 'Акцентный цвет',
    'settings.color.orange': 'Оранжевый',
    'settings.color.blue': 'Синий',
    'settings.color.purple': 'Фиолетовый',
    'settings.color.green': 'Зелёный',
    'settings.animations': 'Анимации',
    'settings.animations.desc': 'Плавные переходы и эффекты',
    'settings.compactMode': 'Компактный режим',
    'settings.compactMode.desc': 'Уменьшенные отступы и размеры',
    'settings.language': 'Язык',
    'settings.currency': 'Валюта',
    'settings.refreshInterval': 'Интервал обновления',
    'settings.gasLimit': 'Лимит газа по умолчанию',
    'settings.analytics': 'Аналитика использования',
    'settings.analytics.desc': 'Помогите улучшить OmniPath',
    'settings.errorReporting': 'Отчёт об ошибках',
    'settings.errorReporting.desc': 'Автоматическая отправка отчётов',
    'settings.rememberPrefs': 'Запоминать настройки',
    'settings.rememberPrefs.desc': 'Сохранять предпочтения между сессиями',
    'settings.version': 'OmniPath v1.0.0',
    'settings.version.desc': 'Современный дашборд для мониторинга газа и агрегации мостов. Все данные обновляются в реальном времени.',
    'settings.cancel': 'Отмена',
    'settings.save': 'Сохранить',
    
    // Calendar
    'calendar.title': 'Календарь Событий',
    'calendar.subtitle': 'Важные события блокчейна',
    'calendar.upcoming': 'Предстоящие события',
    'calendar.thisWeek': 'На этой неделе',
    'calendar.thisMonth': 'В этом месяце',
    'calendar.all': 'Все события',
    'calendar.days': 'дней',
    'calendar.today': 'Сегодня',
    'calendar.tomorrow': 'Завтра',
    
    // Event Types
    'event.type.upgrade': 'Обновление сети',
    'event.type.hardfork': 'Хардфорк',
    'event.type.unlock': 'Разблокировка токенов',
    'event.type.conference': 'Конференция',
    'event.type.aml': 'AML событие',
    'event.type.governance': 'Голосование',
    'event.type.mainnet': 'Запуск сети',
    
    // Notifications
    'notify.welcome.title': 'Добро пожаловать в OmniPath!',
    'notify.welcome.message': 'Мониторьте газ и находите лучшие маршруты для переводов',
    'notify.gasUpdate.title': 'Цена газа обновлена',
    'notify.gasUpdate.message': 'Ethereum: -12% за последний час',
  },
  
  en: {
    // Header
    'header.gasTracker': 'Gas Tracker',
    'header.bridges': 'Bridges',
    
    // Welcome Screen
    'welcome.title': 'OmniPath',
    'welcome.subtitle': 'Your Path in the Blockchain World',
    'welcome.features.monitoring': 'Gas Monitoring',
    'welcome.features.monitoring.desc': 'Track gas prices in real-time across all networks',
    'welcome.features.bridges': 'Bridge Aggregator',
    'welcome.features.bridges.desc': 'Find the best routes for cross-chain transfers',
    'welcome.features.ai': 'AI Recommendations',
    'welcome.features.ai.desc': 'Get smart tips for optimizing transactions',
    'welcome.button': 'Get Started',
    'welcome.footer': 'Click to continue • No registration • Free',
    
    // Dashboard
    'dashboard.stats.avgGas': 'Avg Gas (ETH)',
    'dashboard.stats.minGas': 'Lowest Gas Network',
    'dashboard.stats.aiRec': 'AI Recommendation',
    'dashboard.stats.activeNetworks': 'Active Networks',
    'dashboard.tabs.overview': 'Overview',
    'dashboard.tabs.comparison': 'Comparison',
    'dashboard.chart.title': '24 Hour Price History',
    'dashboard.calculator': 'Calculator',
    
    // Network Card
    'network.slow': 'Slow',
    'network.fast': 'Fast',
    'network.instant': 'Instant',
    'network.lowGas': 'Low gas - good time!',
    'network.medGas': 'Medium gas',
    'network.highGas': 'High gas - better wait',
    
    // Comparison Table
    'comparison.network': 'Network',
    'comparison.baseFee': 'Base Fee',
    'comparison.change24h': '24h Change',
    
    // AI Insight
    'ai.title': 'AI Insight',
    'ai.expectedChange': 'Expected Change:',
    'ai.optimalTime': 'Optimal Time:',
    'ai.accuracy': 'Accuracy:',
    
    // Bridge Aggregator
    'bridge.title': 'Bridge Aggregator',
    'bridge.subtitle': 'Find the best routes for cross-chain transfers',
    'bridge.search': 'Find Bridges',
    'bridge.searching': 'Searching routes...',
    'bridge.from': 'From',
    'bridge.to': 'To',
    'bridge.amount': 'Amount',
    'bridge.selectNetwork': 'Select network',
    'bridge.routes': 'Available Routes',
    'bridge.routesFound': 'routes found',
    'bridge.best': 'Best Choice',
    'bridge.fast': 'Fast',
    'bridge.time': 'Time',
    'bridge.fee': 'Fee',
    'bridge.receive': 'Receive',
    'bridge.select': 'Select Route',
    'bridge.selected': 'Selected',
    'bridge.continue': 'Continue with',
    'bridge.safe': 'Safe Bridge',
    'bridge.safe.desc': 'All routes are verified and use audited smart contracts',
    'bridge.popular': 'Find Best Routes',
    'bridge.popular.desc': 'Select networks and enter amount to search optimal routes through various bridges',
    
    // Gas Calculator
    'calculator.title': 'Gas Calculator',
    'calculator.subtitle': 'Calculate transaction cost',
    'calculator.speed': 'Transaction Speed',
    'calculator.gasLimit': 'Gas Limit',
    'calculator.total': 'Total',
    'calculator.transfer': 'Transfer',
    'calculator.erc20': 'ERC20',
    'calculator.nft': 'NFT',
    'calculator.swap': 'Swap',
    'calculator.gasPrice': 'Gas Price',
    'calculator.trend.down': 'Gas is dropping - good time for transaction!',
    'calculator.trend.up': 'Gas is rising - consider waiting',
    'calculator.trend.stable': 'Gas is stable',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize OmniPath to your liking',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.general': 'General',
    'settings.privacy': 'Privacy',
    'settings.priceAlerts': 'Price Alerts',
    'settings.priceAlerts.desc': 'Receive notifications about gas price changes',
    'settings.bridgeAlerts': 'Bridge Alerts',
    'settings.bridgeAlerts.desc': 'Get notified about new bridge routes',
    'settings.aiRec': 'AI Recommendations',
    'settings.aiRec.desc': 'Receive tips from artificial intelligence',
    'settings.system': 'System Notifications',
    'settings.system.desc': 'Important updates and changes',
    'settings.theme': 'Theme',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.theme.auto': 'Auto',
    'settings.accentColor': 'Accent Color',
    'settings.color.orange': 'Orange',
    'settings.color.blue': 'Blue',
    'settings.color.purple': 'Purple',
    'settings.color.green': 'Green',
    'settings.animations': 'Animations',
    'settings.animations.desc': 'Smooth transitions and effects',
    'settings.compactMode': 'Compact Mode',
    'settings.compactMode.desc': 'Reduced spacing and sizes',
    'settings.language': 'Language',
    'settings.currency': 'Currency',
    'settings.refreshInterval': 'Refresh Interval',
    'settings.gasLimit': 'Default Gas Limit',
    'settings.analytics': 'Usage Analytics',
    'settings.analytics.desc': 'Help improve OmniPath',
    'settings.errorReporting': 'Error Reporting',
    'settings.errorReporting.desc': 'Automatic error reports',
    'settings.rememberPrefs': 'Remember Preferences',
    'settings.rememberPrefs.desc': 'Save preferences between sessions',
    'settings.version': 'OmniPath v1.0.0',
    'settings.version.desc': 'Modern dashboard for gas monitoring and bridge aggregation. All data updates in real-time.',
    'settings.cancel': 'Cancel',
    'settings.save': 'Save',
    
    // Calendar
    'calendar.title': 'Event Calendar',
    'calendar.subtitle': 'Important blockchain events',
    'calendar.upcoming': 'Upcoming Events',
    'calendar.thisWeek': 'This Week',
    'calendar.thisMonth': 'This Month',
    'calendar.all': 'All Events',
    'calendar.days': 'days',
    'calendar.today': 'Today',
    'calendar.tomorrow': 'Tomorrow',
    
    // Event Types
    'event.type.upgrade': 'Network Upgrade',
    'event.type.hardfork': 'Hardfork',
    'event.type.unlock': 'Token Unlock',
    'event.type.conference': 'Conference',
    'event.type.aml': 'AML Event',
    'event.type.governance': 'Governance Vote',
    'event.type.mainnet': 'Mainnet Launch',
    
    // Notifications
    'notify.welcome.title': 'Welcome to OmniPath!',
    'notify.welcome.message': 'Monitor gas and find the best routes for transfers',
    'notify.gasUpdate.title': 'Gas price updated',
    'notify.gasUpdate.message': 'Ethereum: -12% in the last hour',
  },
  
  zh: {
    // Header
    'header.gasTracker': 'Gas 追踪器',
    'header.bridges': '桥接',
    
    // Welcome Screen
    'welcome.title': 'OmniPath',
    'welcome.subtitle': '您在区块链世界中的路径',
    'welcome.features.monitoring': 'Gas 监控',
    'welcome.features.monitoring.desc': '实时追踪所有网络的 gas 价格',
    'welcome.features.bridges': '桥接聚合器',
    'welcome.features.bridges.desc': '查找跨链转账的最佳路线',
    'welcome.features.ai': 'AI 建议',
    'welcome.features.ai.desc': '获取优化交易的智能提示',
    'welcome.button': '开始使用',
    'welcome.footer': '点击继续 • 无需注册 • 免费',
    
    // Dashboard
    'dashboard.stats.avgGas': '平均 Gas (ETH)',
    'dashboard.stats.minGas': '最低 Gas 网络',
    'dashboard.stats.aiRec': 'AI 建议',
    'dashboard.stats.activeNetworks': '活跃网络',
    'dashboard.tabs.overview': '概览',
    'dashboard.tabs.comparison': '比较',
    'dashboard.chart.title': '24 小时价格历史',
    'dashboard.calculator': '计算器',
    
    // Network Card
    'network.slow': '慢速',
    'network.fast': '快速',
    'network.instant': '即时',
    'network.lowGas': '低 gas - 好时机！',
    'network.medGas': '中等 gas',
    'network.highGas': '高 gas - 最好等待',
    
    // Comparison Table
    'comparison.network': '网络',
    'comparison.baseFee': '基础费用',
    'comparison.change24h': '24 小时变化',
    
    // AI Insight
    'ai.title': 'AI 洞察',
    'ai.expectedChange': '预期变化：',
    'ai.optimalTime': '最佳时间：',
    'ai.accuracy': '准确度：',
    
    // Bridge Aggregator
    'bridge.title': '桥接聚合器',
    'bridge.subtitle': '查找跨链转账的最佳路线',
    'bridge.search': '查找桥接',
    'bridge.searching': '搜索路线中...',
    'bridge.from': '从',
    'bridge.to': '到',
    'bridge.amount': '金额',
    'bridge.selectNetwork': '选择网络',
    'bridge.routes': '可用路线',
    'bridge.routesFound': '找到路线',
    'bridge.best': '最佳选择',
    'bridge.fast': '快速',
    'bridge.time': '时间',
    'bridge.fee': '费用',
    'bridge.receive': '收到',
    'bridge.select': '选择路线',
    'bridge.selected': '已选择',
    'bridge.continue': '继续',
    'bridge.safe': '安全桥接',
    'bridge.safe.desc': '所有路线都已验证并使用经过审计的智能合约',
    'bridge.popular': '查找最佳路线',
    'bridge.popular.desc': '选择网络并输入金额以搜索各种桥接的最佳路线',
    
    // Gas Calculator
    'calculator.title': 'Gas 计算器',
    'calculator.subtitle': '计算交易成本',
    'calculator.speed': '交易速度',
    'calculator.gasLimit': 'Gas 限制',
    'calculator.total': '总计',
    'calculator.transfer': '转账',
    'calculator.erc20': 'ERC20',
    'calculator.nft': 'NFT',
    'calculator.swap': '兑换',
    'calculator.gasPrice': 'Gas 价格',
    'calculator.trend.down': 'Gas 正在下降 - 交易的好时机！',
    'calculator.trend.up': 'Gas 正在上涨 - 考虑等待',
    'calculator.trend.stable': 'Gas 稳定',
    
    // Settings
    'settings.title': '设置',
    'settings.subtitle': '自定义 OmniPath',
    'settings.notifications': '通知',
    'settings.appearance': '外观',
    'settings.general': '常规',
    'settings.privacy': '隐私',
    'settings.priceAlerts': '价格提醒',
    'settings.priceAlerts.desc': '接收 gas 价格变化通知',
    'settings.bridgeAlerts': '桥接提醒',
    'settings.bridgeAlerts.desc': '获取新桥接路线通知',
    'settings.aiRec': 'AI 建议',
    'settings.aiRec.desc': '接收人工智能提示',
    'settings.system': '系统通知',
    'settings.system.desc': '重要更新和更改',
    'settings.theme': '主题',
    'settings.theme.dark': '深色',
    'settings.theme.light': '浅色',
    'settings.theme.auto': '自动',
    'settings.accentColor': '强调色',
    'settings.color.orange': '橙色',
    'settings.color.blue': '蓝色',
    'settings.color.purple': '紫色',
    'settings.color.green': '绿色',
    'settings.animations': '动画',
    'settings.animations.desc': '平滑过渡和效果',
    'settings.compactMode': '紧凑模式',
    'settings.compactMode.desc': '减少间距和大小',
    'settings.language': '语言',
    'settings.currency': '货币',
    'settings.refreshInterval': '刷新间隔',
    'settings.gasLimit': '默认 Gas 限制',
    'settings.analytics': '使用分析',
    'settings.analytics.desc': '帮助改进 OmniPath',
    'settings.errorReporting': '错误报告',
    'settings.errorReporting.desc': '自动错误报告',
    'settings.rememberPrefs': '记住偏好设置',
    'settings.rememberPrefs.desc': '在会话之间保存偏好设置',
    'settings.version': 'OmniPath v1.0.0',
    'settings.version.desc': '用于 gas 监控和桥接聚合的现代仪表板。所有数据实时更新。',
    'settings.cancel': '取消',
    'settings.save': '保存',
    
    // Calendar
    'calendar.title': '事件日历',
    'calendar.subtitle': '重要的区块链事件',
    'calendar.upcoming': '即将发生的事件',
    'calendar.thisWeek': '本周',
    'calendar.thisMonth': '本月',
    'calendar.all': '所有事件',
    'calendar.days': '天',
    'calendar.today': '今天',
    'calendar.tomorrow': '明天',
    
    // Event Types
    'event.type.upgrade': '网络升级',
    'event.type.hardfork': '硬分叉',
    'event.type.unlock': '代币解锁',
    'event.type.conference': '会议',
    'event.type.aml': 'AML 事件',
    'event.type.governance': '治理投票',
    'event.type.mainnet': '主网上线',
    
    // Notifications
    'notify.welcome.title': '欢迎使用 OmniPath！',
    'notify.welcome.message': '监控 gas 并找到最佳转账路线',
    'notify.gasUpdate.title': 'Gas 价格已更新',
    'notify.gasUpdate.message': 'Ethereum：过去 1 小时下降 12%',
  },
} as const

// Тип для ключей перевода
export type TranslationKey = keyof typeof translations.ru

// Текущий язык
let currentLanguage: Language = 'ru'

// Функция для получения перевода
export function t(key: TranslationKey, lang?: Language): string {
  const language = lang || currentLanguage
  return translations[language][key] || translations.ru[key] || key
}

// Функция для установки языка
export function setLanguage(lang: Language) {
  currentLanguage = lang
  // Сохраняем в localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('omnipath_language', lang)
  }
  // Dispatch событие для обновления компонентов
  window.dispatchEvent(new CustomEvent('languageChange', { detail: { lang } }))
}

// Функция для получения текущего языка
export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('omnipath_language') as Language
    if (stored && ['ru', 'en', 'zh'].includes(stored)) {
      return stored
    }
  }
  return 'ru'
}

// Хук для использования переводов
export function useTranslation() {
  const [lang, setLang] = React.useState<Language>(getLanguage())
  
  React.useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLang(event.detail.lang)
    }
    
    window.addEventListener('languageChange', handleLanguageChange as EventListener)
    return () => window.removeEventListener('languageChange', handleLanguageChange as EventListener)
  }, [])
  
  return {
    t: (key: TranslationKey) => translations[lang][key] || key,
    lang,
    setLanguage,
  }
}

// Для React компонента нужен import
import React from 'react'

export default {
  translations,
  t,
  setLanguage,
  getLanguage,
  useTranslation,
}

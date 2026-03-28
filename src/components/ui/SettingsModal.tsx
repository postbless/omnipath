import React, { useState } from 'react'
import { Settings, X, Bell, Palette, Globe, Shield, ChevronDown, Info, Zap, Moon, Sun } from 'lucide-react'
import { setLanguage, getLanguage, type Language } from '../../utils/i18n'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SettingSectionProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

const SettingSection: React.FC<SettingSectionProps> = ({ icon, title, children }) => (
  <div className="mb-6 last:mb-0">
    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-zinc-800">
      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
)

interface ToggleProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  label: string
  description?: string
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1">
      <p className="text-white font-medium">{label}</p>
      {description && <p className="text-sm text-zinc-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
        enabled ? 'bg-orange-500' : 'bg-zinc-700'
      }`}
    >
      <div
        className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
          enabled ? 'left-8' : 'left-1'
        }`}
      />
    </button>
  </div>
)

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  label: string
}

const Select: React.FC<SelectProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value)

  return (
    <div className="relative py-3">
      <p className="text-white font-medium mb-2">{label}</p>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-orange-500/50 transition-all"
      >
        <span className="text-zinc-300">{selected?.label}</span>
        <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 p-2 bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl animate-scale-in">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                value === option.value
                  ? 'bg-orange-500/20 text-orange-500'
                  : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface SliderProps {
  value: number
  onChange: (value: number) => void
  label: string
  min: number
  max: number
  step?: number
  unit?: string
}

const Slider: React.FC<SliderProps> = ({ value, onChange, label, min, max, step = 1, unit = '' }) => (
  <div className="py-3">
    <div className="flex items-center justify-between mb-3">
      <p className="text-white font-medium">{label}</p>
      <span className="text-orange-500 font-semibold">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 rounded-full bg-zinc-800 cursor-pointer appearance-none outline-none
                 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500
                 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                 [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-125"
    />
    <div className="flex justify-between mt-2 text-xs text-zinc-500">
      <span>{min}{unit}</span>
      <span>{max}{unit}</span>
    </div>
  </div>
)

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  // Состояния настроек
  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    bridgeAlerts: false,
    aiRecommendations: true,
    systemNotifications: true,
  })

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    accentColor: 'orange',
    animations: true,
    compactMode: false,
  })

  const [general, setGeneral] = useState({
    language: getLanguage(),
    currency: 'usd',
    refreshInterval: 30,
    gasLimit: 20,
  })

  // Синхронизируем язык при открытии
  React.useEffect(() => {
    setGeneral(prev => ({ ...prev, language: getLanguage() }))
  }, [isOpen])

  const [privacy, setPrivacy] = useState({
    analytics: true,
    errorReporting: true,
    rememberPreferences: true,
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-omni-lg animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Настройки</h2>
              <p className="text-sm text-zinc-500">Настройте OmniPath под себя</p>
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
          {/* Уведомления */}
          <SettingSection icon={<Bell className="w-5 h-5" />} title="Уведомления">
            <Toggle
              enabled={notifications.priceAlerts}
              onChange={(v) => setNotifications({ ...notifications, priceAlerts: v })}
              label="Ценовые уведомления"
              description="Получать уведомления об изменении цен на газ"
            />
            <Toggle
              enabled={notifications.bridgeAlerts}
              onChange={(v) => setNotifications({ ...notifications, bridgeAlerts: v })}
              label="Уведомления о мостах"
              description="Уведомлять о новых маршрутах мостов"
            />
            <Toggle
              enabled={notifications.aiRecommendations}
              onChange={(v) => setNotifications({ ...notifications, aiRecommendations: v })}
              label="AI рекомендации"
              description="Получать советы от искусственного интеллекта"
            />
            <Toggle
              enabled={notifications.systemNotifications}
              onChange={(v) => setNotifications({ ...notifications, systemNotifications: v })}
              label="Системные уведомления"
              description="Важные обновления и изменения"
            />
          </SettingSection>

          {/* Внешний вид */}
          <SettingSection icon={<Palette className="w-5 h-5" />} title="Внешний вид">
            <Select
              label="Тема оформления"
              value={appearance.theme}
              onChange={(v) => setAppearance({ ...appearance, theme: v })}
              options={[
                { value: 'dark', label: 'Тёмная' },
                { value: 'light', label: 'Светлая' },
                { value: 'auto', label: 'Авто' },
              ]}
            />
            <Select
              label="Акцентный цвет"
              value={appearance.accentColor}
              onChange={(v) => setAppearance({ ...appearance, accentColor: v })}
              options={[
                { value: 'orange', label: 'Оранжевый' },
                { value: 'blue', label: 'Синий' },
                { value: 'purple', label: 'Фиолетовый' },
                { value: 'green', label: 'Зелёный' },
              ]}
            />
            <Toggle
              enabled={appearance.animations}
              onChange={(v) => setAppearance({ ...appearance, animations: v })}
              label="Анимации"
              description="Плавные переходы и эффекты"
            />
            <Toggle
              enabled={appearance.compactMode}
              onChange={(v) => setAppearance({ ...appearance, compactMode: v })}
              label="Компактный режим"
              description="Уменьшенные отступы и размеры"
            />
          </SettingSection>

          {/* Общие */}
          <SettingSection icon={<Globe className="w-5 h-5" />} title="Общие">
            <Select
              label="Язык"
              value={general.language}
              onChange={(v) => {
                setLanguage(v as Language)
                setGeneral({ ...general, language: v })
              }}
              options={[
                { value: 'ru', label: 'Русский' },
                { value: 'en', label: 'English' },
                { value: 'zh', label: '中文' },
              ]}
            />
            <Select
              label="Валюта"
              value={general.currency}
              onChange={(v) => setGeneral({ ...general, currency: v })}
              options={[
                { value: 'usd', label: 'USD ($)' },
                { value: 'eur', label: 'EUR (€)' },
                { value: 'rub', label: 'RUB (₽)' },
              ]}
            />
            <Slider
              value={general.refreshInterval}
              onChange={(v) => setGeneral({ ...general, refreshInterval: v })}
              label="Интервал обновления"
              min={10}
              max={120}
              step={10}
              unit="с"
            />
            <Slider
              value={general.gasLimit}
              onChange={(v) => setGeneral({ ...general, gasLimit: v })}
              label="Лимит газа по умолчанию"
              min={10}
              max={100}
              step={5}
              unit="Gwei"
            />
          </SettingSection>

          {/* Приватность */}
          <SettingSection icon={<Shield className="w-5 h-5" />} title="Приватность">
            <Toggle
              enabled={privacy.analytics}
              onChange={(v) => setPrivacy({ ...privacy, analytics: v })}
              label="Аналитика использования"
              description="Помогите улучшить OmniPath"
            />
            <Toggle
              enabled={privacy.errorReporting}
              onChange={(v) => setPrivacy({ ...privacy, errorReporting: v })}
              label="Отчёт об ошибках"
              description="Автоматическая отправка отчётов"
            />
            <Toggle
              enabled={privacy.rememberPreferences}
              onChange={(v) => setPrivacy({ ...privacy, rememberPreferences: v })}
              label="Запоминать настройки"
              description="Сохранять предпочтения между сессиями"
            />
          </SettingSection>

          {/* Информация */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium mb-1">OmniPath v1.0.0</p>
                <p className="text-sm text-zinc-500">
                  Современный дашборд для мониторинга газа и агрегации мостов.
                  Все данные обновляются в реальном времени.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex items-center justify-end gap-3 px-6 py-4 border-t border-zinc-800 bg-zinc-900/95 backdrop-blur-xl">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium omni-button-secondary"
          >
            Отмена
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium omni-button"
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal

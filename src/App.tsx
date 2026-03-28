import { useState } from 'react'
import { ArrowDown, BarChart3, Settings, Bell, Menu, Calendar as CalendarIcon } from 'lucide-react'
import NetworksDashboard from './components/NetworksDashboard'
import BridgeAggregator from './components/BridgeAggregator'
import SettingsModal from './components/ui/SettingsModal'
import WelcomeScreen from './components/ui/WelcomeScreen'
import ToastContainer, { useNotifications } from './components/ui/ToastContainer'
import EventCalendar from './components/ui/EventCalendar'
import { OmniPathLogo } from './components/ui/CryptoIcons'

type ActiveTab = 'dashboard' | 'bridges'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const { notifications, notify, removeNotification } = useNotifications()

  const handleGetStarted = () => {
    setHasStarted(true)
    // Приветственное уведомление
    setTimeout(() => {
      notify.info('Добро пожаловать в OmniPath!', 'Мониторьте газ и находите лучшие маршруты для переводов')
    }, 1000)
  }

  if (!hasStarted) {
    return <WelcomeScreen onGetStarted={handleGetStarted} />
  }

  return (
    <div className="min-h-screen bg-omni particles">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    <OmniPathLogo size={40} animated={true} />
                  </div>
                  <div className="absolute -inset-2 rounded-full bg-orange-500/10 blur-xl animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gradient">OmniPath</h1>
                  <p className="text-xs text-zinc-500">All-Seeing Gas Monitor</p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1 ml-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'dashboard'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Gas Tracker
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('bridges')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === 'bridges'
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ArrowDown className="w-4 h-4" />
                    Bridges
                  </div>
                </button>
              </nav>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsCalendarOpen(true)}
                className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300 relative"
                title="Календарь событий"
              >
                <CalendarIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={() => notify.gasAlert('Цена газа обновлена', 'Ethereum: -12% за последний час')}
                className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </button>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 transition-all duration-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden flex flex-col gap-2 mt-4 pt-4 border-t border-zinc-800 animate-slide-down">
              <button
                onClick={() => {
                  setActiveTab('dashboard')
                  setIsMobileMenuOpen(false)
                }}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                  activeTab === 'dashboard'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-5 h-5" />
                  Gas Tracker
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('bridges')
                  setIsMobileMenuOpen(false)
                }}
                className={`px-4 py-3 rounded-xl text-left font-medium transition-all duration-300 ${
                  activeTab === 'bridges'
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ArrowDown className="w-5 h-5" />
                  Bridges
                </div>
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        <div className={`transition-opacity duration-500 ${activeTab === 'dashboard' ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {activeTab === 'dashboard' && <NetworksDashboard />}
        </div>
        <div className={`transition-opacity duration-500 ${activeTab === 'bridges' ? 'opacity-100' : 'opacity-0 hidden'}`}>
          {activeTab === 'bridges' && (
            <div className="animate-fade-in">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Bridge Aggregator</h2>
                <p className="text-sm sm:text-base text-zinc-500">Найдите лучшие маршруты для кросс-чейн переводов</p>
              </div>
              <BridgeAggregator />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <OmniPathLogo size={32} animated={true} />
              <p className="text-sm text-zinc-500">
                © 2026 OmniPath. The Eye watches the Gas.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Documentation</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">API</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Terms</a>
              <a href="#" className="text-sm text-zinc-500 hover:text-orange-400 transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Toast Notifications */}
      <ToastContainer notifications={notifications} onRemove={removeNotification} />

      {/* Event Calendar */}
      <EventCalendar isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </div>
  )
}

export default App

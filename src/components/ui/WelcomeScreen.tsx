import React, { useState, useEffect } from 'react'
import { ArrowRight, Sparkles, TrendingUp, Globe } from 'lucide-react'
import { OmniPathLogo } from './CryptoIcons'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [animatedStep, setAnimatedStep] = useState(0)

  useEffect(() => {
    const steps = [0, 1, 2, 3]
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAnimatedStep(steps[currentStep])
        currentStep++
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  const handleStart = () => {
    setIsVisible(false)
    setTimeout(onGetStarted, 500)
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fade-in">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Градиентные пятна */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-3xl animate-pulse" />
        
        {/* Сетка */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />

        {/* Частицы */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-500/60 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Контент */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Логотип с анимацией */}
        <div 
          className={`mb-8 transition-all duration-700 ${
            animatedStep >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="inline-flex items-center justify-center">
            {/* Анимированный логотип - Глаз OmniPath */}
            <div className="relative">
              <div className="transition-transform duration-700 animate-float">
                <OmniPathLogo size={96} animated={true} />
              </div>
              <div className="absolute -inset-6 rounded-full bg-orange-500/10 blur-2xl animate-pulse" />
              <div className="absolute -inset-12 rounded-full bg-orange-500/5 blur-3xl" />
            </div>
          </div>
          
          <h1 className="mt-6 text-6xl md:text-7xl font-black text-gradient mb-2">
            OmniPath
          </h1>
          <p className="text-xl text-zinc-500 font-light">
            Всевидящий монитор газа
          </p>
        </div>

        {/* Особенности */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 mt-12">
          <div 
            className={`omni-card p-6 transition-all duration-700 ${
              animatedStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: animatedStep >= 1 ? '200ms' : '0ms' }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Мониторинг Газа</h3>
            <p className="text-sm text-zinc-500">
              Отслеживайте цены на газ в реальном времени across всех сетей
            </p>
          </div>

          <div 
            className={`omni-card p-6 transition-all duration-700 ${
              animatedStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: animatedStep >= 2 ? '200ms' : '0ms' }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Globe className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Агрегатор Мостов</h3>
            <p className="text-sm text-zinc-500">
              Находите лучшие маршруты для кросс-чейн переводов
            </p>
          </div>

          <div 
            className={`omni-card p-6 transition-all duration-700 ${
              animatedStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: animatedStep >= 3 ? '200ms' : '0ms' }}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Рекомендации</h3>
            <p className="text-sm text-zinc-500">
              Получайте умные советы для оптимизации транзакций
            </p>
          </div>
        </div>

        {/* Кнопка начала */}
        <div 
          className={`transition-all duration-700 ${
            animatedStep >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{ transitionDelay: animatedStep >= 3 ? '400ms' : '0ms' }}
        >
          <button
            onClick={handleStart}
            className="group relative px-10 py-5 rounded-2xl omni-button text-lg font-semibold overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              Начать использовать
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <p className="mt-6 text-sm text-zinc-600">
            Нажмите, чтобы продолжить • Без регистрации • Бесплатно
          </p>
        </div>
      </div>

      {/* Индикатор загрузки */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i <= animatedStep ? 'bg-orange-500 w-6' : 'bg-zinc-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default WelcomeScreen

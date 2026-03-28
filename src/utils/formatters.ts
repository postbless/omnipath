import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Утилита для объединения классов с поддержкой Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Форматирование числа в читаемый вид
 */
export function formatNumber(num: number, decimals: number = 2): string {
  if (num === 0) return '0'
  
  if (num < 0.001) {
    return num.toFixed(decimals + 2)
  }
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(decimals) + 'M'
  }
  
  if (num >= 1000) {
    return (num / 1000).toFixed(decimals) + 'K'
  }
  
  return num.toFixed(decimals)
}

/**
 * Форматирование цены газа
 */
export function formatGasPrice(gwei: number): string {
  return `${gwei.toFixed(2)} Gwei`
}

/**
 * Форматирование валюты
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Форматирование времени
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s`
  }
  
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  
  if (remainingSeconds === 0) {
    return `${minutes}m`
  }
  
  return `${minutes}m ${remainingSeconds}s`
}

/**
 * Форматирование адреса кошелька
 */
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

/**
 * Получение цвета для статуса газа
 */
export function getGasStatusColor(gwei: number): string {
  if (gwei < 20) {
    return 'text-emerald-500'
  }
  if (gwei < 50) {
    return 'text-amber-500'
  }
  return 'text-rose-500'
}

/**
 * Получение цвета фона для статуса газа
 */
export function getGasStatusBgColor(gwei: number): string {
  if (gwei < 20) {
    return 'bg-emerald-500/20 border-emerald-500/50'
  }
  if (gwei < 50) {
    return 'bg-amber-500/20 border-amber-500/50'
  }
  return 'bg-rose-500/20 border-rose-500/50'
}

/**
 * Генерация случайного числа в диапазоне (для моковых данных)
 */
export function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Задержка для асинхронных операций
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

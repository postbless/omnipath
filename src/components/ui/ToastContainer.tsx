import React, { useEffect } from 'react'
import { Bell, AlertTriangle, CheckCircle, Info, X, TrendingUp, TrendingDown } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'gas-alert'

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface ToastContainerProps {
  notifications: Notification[]
  onRemove: (id: string) => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onRemove={() => onRemove(notification.id)}
        />
      ))}
    </div>
  )
}

interface ToastProps {
  notification: Notification
  onRemove: () => void
}

const Toast: React.FC<ToastProps> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(onRemove, notification.duration || 5000)
    return () => clearTimeout(timer)
  }, [notification.duration, onRemove])

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertTriangle className="w-5 h-5 text-rose-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    'gas-alert': notification.type === 'gas-alert' && (
      notification.message.includes('снижение') || notification.message.includes('низкий')
        ? <TrendingDown className="w-5 h-5 text-emerald-500" />
        : <TrendingUp className="w-5 h-5 text-rose-500" />
    ),
  }

  const bgColors = {
    success: 'bg-emerald-500/10 border-emerald-500/30',
    error: 'bg-rose-500/10 border-rose-500/30',
    warning: 'bg-amber-500/10 border-amber-500/30',
    info: 'bg-blue-500/10 border-blue-500/30',
    'gas-alert': 'bg-orange-500/10 border-orange-500/30',
  }

  return (
    <div
      className={`w-80 p-4 rounded-xl border backdrop-blur-xl animate-slide-up ${bgColors[notification.type]}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          {icons[notification.type]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">{notification.title}</p>
          <p className="text-sm text-zinc-400 mt-1">{notification.message}</p>
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-zinc-800/50 transition-colors"
        >
          <X className="w-4 h-4 text-zinc-500" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="mt-3 h-1 rounded-full bg-zinc-800/50 overflow-hidden">
        <div
          className="h-full bg-orange-500 animate-pulse"
          style={{
            width: '100%',
            animation: `shrink ${notification.duration || 5000}ms linear forwards`
          }}
        />
      </div>
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

// Hook для управления уведомлениями
import { useState, useCallback } from 'react'

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = useCallback((
    type: NotificationType,
    title: string,
    message: string,
    duration?: number
  ) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications(prev => [...prev, { id, type, title, message, duration }])
    return id
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const notify = {
    success: (title: string, message: string, duration?: number) =>
      addNotification('success', title, message, duration),
    error: (title: string, message: string, duration?: number) =>
      addNotification('error', title, message, duration),
    warning: (title: string, message: string, duration?: number) =>
      addNotification('warning', title, message, duration),
    info: (title: string, message: string, duration?: number) =>
      addNotification('info', title, message, duration),
    gasAlert: (title: string, message: string, duration?: number) =>
      addNotification('gas-alert', title, message, duration),
  }

  return {
    notifications,
    notify,
    removeNotification,
  }
}

export default ToastContainer

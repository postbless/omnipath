import React from 'react'
import { cn } from '../../utils/formatters'

interface CardProps {
  children: React.ReactNode
  className?: string
  gradient?: boolean
  hover?: boolean
}

const Card: React.FC<CardProps> = ({ children, className, gradient = false, hover = false }) => {
  const baseStyles = 'relative rounded-2xl backdrop-blur-xl'
  
  const gradientStyles = gradient
    ? 'p-[1px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-glow-indigo'
    : ''
  
  const innerStyles = hover
    ? 'bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-indigo-500/50 transition-all duration-200'
    : 'bg-slate-900/80 border border-slate-700'
  
  return (
    <div className={cn(baseStyles, gradientStyles, className)}>
      <div className={cn('p-6 rounded-2xl', innerStyles)}>
        {children}
      </div>
    </div>
  )
}

export default Card

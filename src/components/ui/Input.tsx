import React, { forwardRef } from 'react'
import { cn } from '../../utils/formatters'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-400 mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700',
              'text-white placeholder-slate-500',
              'focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/50',
              'transition-all duration-200 outline-none',
              icon && 'pl-12',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/50',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-rose-500">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Основная цветовая палитра OmniPath - черно-оранжевая
        slate: {
          850: '#0f0f0f',
          900: '#0a0a0a',
          950: '#050505',
          1000: '#000000',
        },
        // Оранжевые акцентные цвета
        orange: {
          400: '#fb923c',
          450: '#f97316',
          500: '#ea580c',
          550: '#c2410c',
          600: '#9a3412',
        },
        // Цвета для газа
        emerald: {
          450: '#10b981',
          500: '#10b981',
        },
        rose: {
          450: '#f43f5e',
          500: '#f43f5e',
        },
        amber: {
          450: '#f59e0b',
          500: '#f59e0b',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'omni-gradient': 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
        'border-gradient': 'linear-gradient(135deg, rgba(234, 88, 12, 0.6) 0%, rgba(249, 115, 22, 0.4) 100%)',
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.15) 0%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'omni': '0 8px 32px 0 rgba(234, 88, 12, 0.25)',
        'omni-lg': '0 20px 60px 0 rgba(234, 88, 12, 0.35)',
        'glow-orange': '0 0 40px rgba(234, 88, 12, 0.5)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.5)',
        'glow-rose': '0 0 20px rgba(244, 63, 94, 0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(234, 88, 12, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(234, 88, 12, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
      },
      backgroundSize: {
        '200%': '200%',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

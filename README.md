# Crypto Gas & Bridge Dashboard

Современный веб-приложение дашборда для мониторинга газа в блокчейн-сетях и агрегации мостов для кросс-чейн переводов.

## 🎯 Цели проекта

- **Мониторинг газа**: Отслеживание цен на газ в реальном времени для Ethereum, Arbitrum, Optimism, Base, Polygon и zkSync
- **ИИ-прогнозы**: Предсказания оптимального времени для транзакций на основе исторических данных
- **Агрегатор мостов**: Поиск лучших маршрутов для кросс-чейн переводов через Li.Fi API и Socket

## 🛠 Технологический стек

| Категория | Технология |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (строгая типизация) |
| Styling | Tailwind CSS (Glassmorphism) |
| Web3 | Wagmi v2 + Viem |
| UI Components | shadcn/ui + Lucide Icons |
| State Management | TanStack Query (React Query) |
| Charts | Recharts |

## 📋 Требования

- Node.js 18+ 
- npm или yarn
- Git

## 🚀 Установка и запуск

### Шаг 1: Создание проекта с Vite + React + TypeScript

```bash
cd "D:\dashboard 2"
npm create vite@latest . -- --template react-ts
```

### Шаг 2: Установка зависимостей

```bash
# Основные зависимости
npm install

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Web3 библиотеки
npm install wagmi viem @tanstack/react-query

# UI библиотеки
npm install lucide-react recharts clsx tailwind-merge

# Утилиты
npm install zustand
```

### Шаг 3: Инициализация Tailwind CSS

Создайте файл `tailwind.config.js` в корне проекта (будет создан автоматически в следующем шаге).

### Шаг 4: Настройка окружения

Создайте файл `.env.local` в корне проекта:

```env
VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here
VITE_LIFI_API_KEY=your_lifi_api_key_here
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

### Шаг 5: Запуск проекта

```bash
# Запуск локального сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр продакшен сборки
npm run preview
```

После запуска откройте браузер и перейдите по адресу `http://localhost:5173`

## 📁 Структура проекта

```
D:\dashboard 2/
├── public/                 # Статические файлы (иконки, изображения)
├── src/
│   ├── components/         # React компоненты
│   │   ├── ui/            # Базовые UI компоненты (кнопки, инпуты)
│   │   ├── GasTrackerCard.tsx
│   │   ├── BridgeAggregator.tsx
│   │   └── ...
│   ├── hooks/             # Кастомные хуки
│   │   ├── useGasPrice.ts
│   │   ├── useBridgeRoutes.ts
│   │   └── ...
│   ├── api/               # API функции и роуты
│   │   ├── gas.ts
│   │   ├── bridges.ts
│   │   └── ...
│   ├── store/             # Zustand store для глобального состояния
│   │   └── index.ts
│   ├── utils/             # Утилиты и хелперы
│   │   ├── formatters.ts
│   │   └── constants.ts
│   ├── config/            # Конфигурационные файлы
│   │   ├── wagmi.ts
│   │   └── chains.ts
│   ├── types/             # TypeScript типы и интерфейсы
│   │   └── index.ts
│   ├── App.tsx            # Главный компонент приложения
│   ├── main.tsx           # Точка входа
│   └── index.css          # Глобальные стили
├── .env.local             # Переменные окружения
├── tailwind.config.js     # Конфигурация Tailwind
├── tsconfig.json          # Конфигурация TypeScript
├── package.json           # Зависимости проекта
└── README.md              # Документация
```

## 🎨 Дизайн-система

### Цветовая палитра

| Назначение | Цвет | Класс Tailwind |
|------------|------|----------------|
| Фон | Slate 900 | `bg-slate-900` |
| Акцент | Indigo 500 | `text-indigo-500` |
| Низкий газ | Emerald 500 | `text-emerald-500` |
| Высокий газ | Rose 500 | `text-rose-500` |

### Glassmorphism эффекты

```tsx
// Пример класса для glassmorphism карточки
className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl"
```

## 📊 API Endpoints (планируемые)

- `GET /api/gas` - Данные о газе для всех сетей
- `GET /api/gas/:chain` - Данные о газе для конкретной сети
- `GET /api/bridges` - Доступные мосты
- `GET /api/bridges/routes` - Маршруты для перевода

## 🔒 Безопасность

- Никогда не коммитьте `.env.local` с реальными API ключами
- Используйте переменные окружения для всех чувствительных данных
- Все API ключи хранятся только на стороне сервера

## 📝 Лицензия

MIT

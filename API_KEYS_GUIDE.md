# 🔑 OmniPath API Keys Setup Guide

## 📋 Содержание

1. [Необходимые API ключи](#необходимые-api-ключи)
2. [Получение ключей](#получение-ключей)
3. [Настройка проекта](#настройка-проекта)
4. [Примеры использования](#примеры-использования)

---

## 🔐 Необходимые API ключи

### Обязательные:
| API | Назначение | Бесплатный лимит |
|-----|-----------|-----------------|
| **Etherscan** | Данные о газе Ethereum | 5 запросов/сек |
| **Li.Fi** | Агрегация мостов | 1000 запросов/день |
| **WalletConnect** | Подключение кошелька | Бесплатно |

### Опциональные:
| API | Назначение | Бесплатный лимит |
|-----|-----------|-----------------|
| **Coingecko** | Цены криптовалют | 10-50 запросов/мин |
| **Moralis** | Данные блокчейна | 40,000 запросов/мес |
| **The Graph** | Индексация данных | 100,000 GRT/мес |

---

## 📝 Получение ключей

### 1. Etherscan API Key

1. Перейдите на [etherscan.io/apis](https://etherscan.io/apis)
2. Зарегистрируйтесь или войдите
3. Нажмите **"Create API Key"**
4. Выберите **"Rate-Limited Key"** (бесплатно)
5. Скопируйте ключ

**Лимиты:**
- 5 запросов в секунду
- 100,000 запросов в день

---

### 2. Li.Fi API Key

1. Перейдите на [li.fi](https://li.fi/)
2. Нажмите **"Get API Key"** в футере
3. Заполните форму:
   - Имя
   - Email
   - Описание проекта
4. Ключ придёт на email в течение 24 часов

**Лимиты:**
- 1000 запросов в день (бесплатно)
- Безлимитно (платные тарифы)

---

### 3. WalletConnect Project ID

1. Перейдите на [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Создайте аккаунт
3. Нажмите **"Create Project"**
4. Заполните:
   - Название: `OmniPath`
   - Описание: `Gas & Bridge Dashboard`
   - URL: `http://localhost:5173`
5. Скопируйте **Project ID**

**Лимиты:**
- Бесплатно для разработки
- 100,000 подключений/мес (бесплатный тариф)

---

### 4. Coingecko API Key (опционально)

1. Перейдите на [coingecko.com/api/pricing](https://www.coingecko.com/api/pricing)
2. Выберите **"Demo"** план (бесплатно)
3. Зарегистрируйтесь
4. Скопируйте API ключ

**Лимиты:**
- 10-50 запросов в минуту
- Нет коммерческого использования

---

### 5. Moralis API Key (опционально)

1. Перейдите на [moralis.io](https://moralis.io/)
2. Нажмите **"Start for Free"**
3. Создайте аккаунт
4. Перейдите в **"Settings"** → **"API Keys"**
5. Скопируйте ключ

**Лимиты:**
- 40,000 запросов в месяц
- 3 выделенных RPC

---

## ⚙️ Настройка проекта

### Шаг 1: Создайте файл .env.local

В корне проекта создайте файл `.env.local`:

```bash
# D:\dashboard 2\.env.local
```

### Шаг 2: Добавьте ключи

```env
# Etherscan (данные о газе)
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key_here

# Li.Fi (агрегация мостов)
VITE_LIFI_API_KEY=your_lifi_api_key_here

# WalletConnect (подключение кошелька)
VITE_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id_here

# Coingecko (цены криптовалют) - опционально
VITE_COINGECKO_API_KEY=your_coingecko_api_key_here

# Moralis (данные блокчейна) - опционально
VITE_MORALIS_API_KEY=your_moralis_api_key_here
```

### Шаг 3: Перезапустите сервер

```bash
# Остановите текущий сервер (Ctrl+C)
npm run dev
```

---

## 💻 Примеры использования

### 1. Получение данных о газе (Etherscan)

```typescript
// src/api/gas.ts
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY

export async function getRealGasPrices() {
  const response = await fetch(
    `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ETHERSCAN_API_KEY}`
  )
  
  const data = await response.json()
  
  return {
    success: data.status === '1',
    data: {
      slow: data.result.SafeGasPrice,
      average: data.result.ProposeGasPrice,
      fast: data.result.FastGasPrice,
    }
  }
}
```

---

### 2. Поиск маршрутов мостов (Li.Fi)

```typescript
// src/api/bridges.ts
const LIFI_API_KEY = import.meta.env.VITE_LIFI_API_KEY

export async function getBridgeRoutes(params: {
  fromChain: number
  toChain: number
  fromToken: string
  toToken: string
  amount: number
}) {
  const url = new URL('https://li.quest/v1/advanced/routes')
  url.searchParams.append('fromChain', params.fromChain.toString())
  url.searchParams.append('toChain', params.toChain.toString())
  url.searchParams.append('fromToken', params.fromToken)
  url.searchParams.append('toToken', params.toToken)
  url.searchParams.append('fromAmount', params.amount.toString())
  
  const response = await fetch(url.toString(), {
    headers: {
      'x-lifi-api-key': LIFI_API_KEY,
    },
  })
  
  return await response.json()
}
```

---

### 3. Подключение кошелька (WalletConnect)

```typescript
// src/config/wagmi.ts
import { createConfig, http } from 'wagmi'
import { mainnet, arbitrum, optimism } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

const WALLET_CONNECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

export const config = createConfig({
  chains: [mainnet, arbitrum, optimism],
  connectors: [
    walletConnect({
      projectId: WALLET_CONNECT_ID,
      showQrModal: true,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
})
```

---

### 4. Получение цен (Coingecko)

```typescript
// src/api/prices.ts
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY

export async function getTokenPrices(ids: string[]) {
  const url = new URL('https://pro-api.coingecko.com/api/v3/coins/markets')
  url.searchParams.append('vs_currency', 'usd')
  url.searchParams.append('ids', ids.join(','))
  url.searchParams.append('order', 'market_cap_desc')
  
  const response = await fetch(url.toString(), {
    headers: {
      'x-cg-pro-api-key': COINGECKO_API_KEY,
    },
  })
  
  return await response.json()
}

// Использование:
const prices = await getTokenPrices(['ethereum', 'bitcoin', 'polygon'])
```

---

## 🔒 Безопасность

### ✅ DO (Делайте)

```env
# ✅ Правильно
VITE_ETHERSCAN_API_KEY=abc123...
```

```typescript
// ✅ Используйте import.meta.env
const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY
```

```gitignore
# ✅ Добавьте в .gitignore
.env.local
.env*.local
```

---

### ❌ DON'T (Не делайте)

```env
# ❌ Не коммитьте реальные ключи
# VITE_ETHERSCAN_API_KEY=abc123...
```

```typescript
// ❌ Не хардкодьте ключи
const apiKey = "abc123..." // НИКОГДА ТАК НЕ ДЕЛАЙТЕ!
```

---

## 🧪 Тестирование

### Проверка подключения

Создайте файл `src/api/test.ts`:

```typescript
export async function testApiKeys() {
  const results = {
    etherscan: false,
    lifi: false,
    walletconnect: false,
  }
  
  // Test Etherscan
  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`
    )
    const data = await response.json()
    results.etherscan = data.status === '1'
  } catch (e) {
    results.etherscan = false
  }
  
  // Test Li.Fi
  try {
    const response = await fetch('https://li.quest/v1/chains', {
      headers: {
        'x-lifi-api-key': import.meta.env.VITE_LIFI_API_KEY,
      },
    })
    results.lifi = response.ok
  } catch (e) {
    results.lifi = false
  }
  
  // Test WalletConnect
  results.walletconnect = !!import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID
  
  console.table(results)
  return results
}
```

---

## 📊 Мониторинг использования

### Etherscan
- Проверка лимита: [etherscan.io/apis](https://etherscan.io/apis)
- Dashboard показывает использование

### Li.Fi
- Статистика в личном кабинете
- Email уведомления при 80% лимита

### WalletConnect
- Статистика в [cloud.walletconnect.com](https://cloud.walletconnect.com)
- Real-time метрики

---

## 🆘 Troubleshooting

### Ошибка: "Invalid API Key"

```env
# Проверьте, что ключ без пробелов
VITE_ETHERSCAN_API_KEY=abc123... # ✅
VITE_ETHERSCAN_API_KEY= abc123... # ❌
```

### Ошибка: "Rate Limit Exceeded"

```typescript
// Добавьте задержку между запросами
export async function fetchWithDelay(url: string, delay = 1000) {
  await new Promise(r => setTimeout(r, delay))
  return fetch(url)
}
```

### Ошибка: "CORS Policy"

- Некоторые API не поддерживают CORS для browser requests
- Используйте server-side proxy или Vite proxy

---

## 📚 Полезные ссылки

- [Etherscan API Docs](https://docs.etherscan.io/)
- [Li.Fi API Docs](https://docs.li.fi/)
- [WalletConnect Docs](https://docs.walletconnect.com/)
- [Coingecko API](https://www.coingecko.com/en/api/documentation)
- [Moralis Docs](https://docs.moralis.io/)

---

## 💰 Бесплатные альтернативы

| Платный API | Бесплатная альтернатива |
|------------|----------------------|
| Etherscan Pro | Etherscan Free Tier |
| Li.Fi Premium | Li.Fi Free Tier |
| Alchemy | Public RPC Endpoints |
| Infura | Public RPC Endpoints |
| Moralis | Web3.js / Ethers.js напрямую |

---

**Последнее обновление:** Март 2026  
**Версия:** 1.0.0

# 🚀 OmniPath API - Быстрый Старт

## ⚡ Подключение за 2 минуты

### 1. Создайте `.env.local`

В корне проекта (`D:\dashboard 2\.env.local`) создайте файл:

```env
# Только Etherscan (остальное работает без ключа!)
VITE_ETHERSCAN_API_KEY=ваш_ключ_здесь
```

### 2. Получите ключ Etherscan (1 минута)

1. Перейдите на https://etherscan.io/myapikey
2. Войдите через Google/GitHub
3. Нажмите **"Create API Key"**
4. Выберите **"Rate-Limited Key"** (бесплатно)
5. Скопируйте ключ в `.env.local`

### 3. Перезапустите сервер

```bash
# Ctrl+C для остановки
npm run dev
```

**Готово!** 🎉 Данные обновляются каждые 30 секунд!

---

## 📊 Что работает бесплатно

| API | Ключ | Статус |
|-----|------|--------|
| **Gas Now** | ❌ Не нужен | ✅ Работает |
| **EthGasStation** | ❌ Не нужен | ✅ Работает |
| **L2Fees** | ❌ Не нужен | ✅ Работает |
| **Coingecko** | ❌ Не нужен | ✅ Работает |
| **Etherscan** | ✅ Нужен | ⚠️ Опционально |
| **Li.Fi** | ✅ Нужен | ⚠️ Опционально |

---

## 🔍 Проверка работы

Откройте консоль браузера (F12) и введите:

```javascript
// Проверка API
import { testAllAPIs } from './api/test'
testAllAPIs()
```

Или просто посмотрите на данные в дашборде - они должны обновляться!

---

## 📈 Источники данных

### Ethereum Gas
1. **Gas Now** (приоритет) - без ключа
2. **EthGasStation** (fallback) - без ключа
3. **Etherscan** (fallback) - с ключом

### L2 Gas
1. **L2Fees.info** - без ключа

### Цены токенов
1. **Coingecko** - без ключа (rate limit: 10-50/мин)

---

## ⚙️ Настройки

### Частота обновления

По умолчанию: **30 секунд**

Изменить в `src/hooks/useRealTimeData.ts`:

```typescript
export function useRealTimeData(refreshInterval = 30000) // 30000ms = 30s
```

### Кэширование

Кэш цен: **5 минут**

Изменить в `src/api/prices.ts`:

```typescript
const CACHE_TTL = 5 * 60 * 1000 // 5 минут
```

---

## 🆘 Troubleshooting

### "All gas APIs failed"

Данные обновляются, но медленно. Проверьте интернет.

### "Coingecko rate limit"

Превышен лимит запросов. Подождите 1 минуту или используйте кэш.

### "Etherscan API error"

Неверный ключ или превышен лимит. Проверьте ключ в `.env.local`.

---

## 📚 Полная документация

См. `API_SETUP_GUIDE.md` для подробной инструкции.

---

**Обновлено:** Март 2026

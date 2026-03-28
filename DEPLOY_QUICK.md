# ⚡ Деплой OmniPath - Быстрая Инструкция

## 🚀 Вариант 1: Vercel (Рекомендуется, 5 минут)

### Шаг 1: Загрузите на GitHub

Откройте терминал в `D:\dashboard 2` и выполните:

```bash
# Инициализация
git init
git add .
git commit -m "Initial commit: OmniPath"
git branch -M main

# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/omnipath.git
git push -u origin main
```

---

### Шаг 2: Подключите Vercel

1. Перейдите на https://vercel.com
2. Войдите через GitHub
3. Нажмите **Add New Project**
4. Выберите репозиторий `omnipath`
5. Нажмите **Deploy**

**Всё!** Сайт доступен через 2-3 минуты! 🎉

---

### Шаг 3: Добавьте API ключи (опционально)

В Vercel Dashboard:
1. **Settings** → **Environment Variables**
2. Добавьте:
   ```
   VITE_ETHERSCAN_API_KEY=ваш_ключ
   ```
3. **Redeploy**

---

## 🌐 Вариант 2: Netlify (Альтернатива)

### Команды для терминала:

```bash
# Установите Netlify CLI
npm install -g netlify-cli

# Авторизация
netlify login

# Деплой
netlify deploy --prod
```

Следуйте инструкциям в терминале!

---

## 📁 Файлы для деплоя уже созданы:

✅ `.gitignore` - игнорирует node_modules и .env.local  
✅ `vercel.json` - настройка роутинга для Vercel  
✅ `public/_redirects` - настройка для Netlify  

---

## 🔗 Ссылки:

- **Создать GitHub:** https://github.com/signup
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Netlify Dashboard:** https://app.netlify.com

---

## ❓ Помощь

Если что-то не работает:
1. Проверьте, что `.env.local` НЕ в репозитории
2. Убедитесь, что Node.js 18+ (`node -v`)
3. Очистите кэш: `npm run build`

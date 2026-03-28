# 🚀 OmniPath - Деплой на GitHub и Хостинг

## 📦 Часть 1: Публикация на GitHub

### Шаг 1: Создайте репозиторий на GitHub

1. Перейдите на https://github.com/new
2. Введите название: `omnipath` или `crypto-gas-dashboard`
3. Выберите **Public** или **Private**
4. **НЕ нажимайте** "Initialize this repository with a README"
5. Нажмите **Create repository**

---

### Шаг 2: Инициализируйте Git локально

Откройте терминал в папке проекта (`D:\dashboard 2`):

```bash
# Инициализация Git
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: OmniPath Dashboard"

# Переименование ветки в main
git branch -M main
```

---

### Шаг 3: Подключите удаленный репозиторий

```bash
# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/omnipath.git

# Проверка
git remote -v
```

---

### Шаг 4: Отправьте код на GitHub

```bash
# Отправка файлов
git push -u origin main
```

**Готово!** Ваш код на GitHub! 🎉

---

### ⚠️ Важно: .gitignore

Убедитесь, что `.env.local` **НЕ** попал в репозиторий!

Проверьте файл `.gitignore`:

```
# Зависимости
node_modules/
dist/
build/

# Переменные окружения
.env
.env.local
.env*.local

# Логи
*.log
npm-debug.log*

# Системные файлы
.DS_Store
Thumbs.db
```

---

## 🌐 Часть 2: Деплой на Vercel (Бесплатно) ⭐ РЕКОМЕНДУЮ

### Почему Vercel?

- ✅ **Бесплатно** для личных проектов
- ✅ **Автоматический деплой** при push в GitHub
- ✅ **HTTPS** сертификат
- ✅ **CDN** по всему миру
- ✅ **Preview** для каждого коммита

---

### Шаг 1: Зарегистрируйтесь на Vercel

1. Перейдите на https://vercel.com
2. Нажмите **Sign Up**
3. Войдите через **GitHub** (рекомендуется)

---

### Шаг 2: Импортируйте проект

1. Нажмите **Add New Project**
2. Выберите **Import Git Repository**
3. Найдите ваш репозиторий `omnipath`
4. Нажмите **Import**

---

### Шаг 3: Настройте проект

**Framework Preset:** Vite  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

---

### Шаг 4: Добавьте переменные окружения

Нажмите **Environment Variables** и добавьте:

```
VITE_ETHERSCAN_API_KEY=ваш_ключ
VITE_LIFI_API_KEY=ваш_ключ (опционально)
VITE_WALLET_CONNECT_PROJECT_ID=ваш_id (опционально)
```

---

### Шаг 5: Деплой!

Нажмите **Deploy**

**Время сборки:** ~2-3 минуты

**Готово!** Ваш сайт доступен по адресу:
```
https://omnipath-yourname.vercel.app
```

---

### Шаг 6: Настройте домен (опционально)

1. Перейдите в **Settings** → **Domains**
2. Добавьте ваш домен: `omnipath.io` или `gas.yourdomain.com`
3. Следуйте инструкциям для настройки DNS

---

## 🎨 Часть 3: Деплой на Netlify (Альтернатива)

### Шаг 1: Зарегистрируйтесь

1. Перейдите на https://netlify.com
2. Нажмите **Sign Up**
3. Войдите через **GitHub**

---

### Шаг 2: Импортируйте проект

1. Нажмите **Add new site** → **Import an existing project**
2. Выберите **GitHub**
3. Авторизуйте Netlify
4. Выберите репозиторий `omnipath`

---

### Шаг 3: Настройте сборку

**Build command:** `npm run build`  
**Publish directory:** `dist`

---

### Шаг 4: Переменные окружения

Перейдите в **Site settings** → **Environment variables**:

```
VITE_ETHERSCAN_API_KEY=ваш_ключ
VITE_LIFI_API_KEY=ваш_ключ
```

---

### Шаг 5: Деплой

Нажмите **Deploy site**

**Сайт доступен:** `https://omnipath-randomname.netlify.app`

---

## 🐳 Часть 4: Деплой на VPS (для продвинутых)

### Требования:

- VPS с Ubuntu 20.04+
- Домен (опционально)
- Node.js 18+

---

### Шаг 1: Подключитесь к серверу

```bash
ssh user@your-server-ip
```

---

### Шаг 2: Установите Node.js и npm

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # v18.x.x
npm -v   # 9.x.x
```

---

### Шаг 3: Установите PM2

```bash
sudo npm install -g pm2
```

---

### Шаг 4: Клонируйте репозиторий

```bash
cd /var/www
git clone https://github.com/YOUR_USERNAME/omnipath.git
cd omnipath
```

---

### Шаг 5: Установите зависимости

```bash
npm install
```

---

### Шаг 6: Создайте .env.local

```bash
nano .env.local
```

Добавьте:

```env
VITE_ETHERSCAN_API_KEY=ваш_ключ
VITE_LIFI_API_KEY=ваш_ключ
```

---

### Шаг 7: Соберите проект

```bash
npm run build
```

---

### Шаг 8: Установите Nginx

```bash
sudo apt update
sudo apt install nginx -y
```

---

### Шаг 9: Настройте Nginx

```bash
sudo nano /etc/nginx/sites-available/omnipath
```

Добавьте конфигурацию:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/omnipath/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

### Шаг 10: Активируйте сайт

```bash
sudo ln -s /etc/nginx/sites-available/omnipath /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Шаг 11: Настройте HTTPS (Let's Encrypt)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

### Шаг 12: Запустите через PM2 (для API)

Если у вас есть серверная часть:

```bash
pm2 start npm --name "omnipath" -- start
pm2 save
pm2 startup
```

---

## 🔄 Часть 5: Автоматический деплой

### Настройка CI/CD через GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
        env:
          VITE_ETHERSCAN_API_KEY: ${{ secrets.ETHERSCAN_API_KEY }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

### Секреты для GitHub Actions

1. Перейдите в репозиторий → **Settings** → **Secrets and variables** → **Actions**
2. Добавьте секреты:

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
ETHERSCAN_API_KEY=your_api_key
```

---

## 📊 Сравнение хостингов

| Хостинг | Бесплатно | Авто-деплой | HTTPS | CDN | Сложность |
|---------|-----------|-------------|-------|-----|-----------|
| **Vercel** | ✅ | ✅ | ✅ | ✅ | ⭐ Легко |
| **Netlify** | ✅ | ✅ | ✅ | ✅ | ⭐ Легко |
| **GitHub Pages** | ✅ | ✅ | ✅ | ✅ | ⭐⭐ Средне |
| **VPS** | ❌ ($5/мес) | ❌ | ✅ | ❌ | ⭐⭐⭐⭐ Сложно |
| **Render** | ✅ | ✅ | ✅ | ✅ | ⭐⭐ Средне |

---

## 🎯 Рекомендации

### Для личного использования:
**Vercel** - быстро, бесплатно, автоматически

### Для продакшена:
**Vercel Pro** ($20/мес) или **VPS** + Nginx

### Для тестирования:
**Netlify** или **GitHub Pages**

---

## 🔧 Troubleshooting

### Ошибка: "Build failed"

```bash
# Проверьте логи сборки
npm run build

# Проверьте Node.js версию
node -v  # Должно быть 18+

# Очистите кэш
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Ошибка: "Environment variables not found"

Убедитесь, что переменные добавлены в настройках хостинга!

### Ошибка: "404 на всех страницах"

Проблема с роутингом. Добавьте в настройки хостинга:

**Vercel:** Создайте `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** Создайте `public/_redirects`:
```
/*    /index.html   200
```

---

## 📚 Полезные ссылки

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Nginx Configuration](https://nginx.org/en/docs/)

---

**Готово!** Ваш OmniPath в интернете! 🎉

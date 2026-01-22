# Anime Site - Deployment Guide

## Быстрый деплой

### Vercel (РЕКОМЕНДУЕТСЯ)

```bash
npm install -g vercel
vercel login
vercel deploy
```

### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. Обновите `vite.config.js`:

```javascript
export default defineConfig({
  base: "/Anime-site/",
  plugins: [react()],
});
```

2. Добавьте в `package.json`:

```json
"scripts": {
  "build": "vite build",
  "deploy": "npm run build && git add dist -f && git commit -m 'Deploy' && git push"
}
```

3. Запустите:

```bash
npm run deploy
```

## Необходимые переменные окружения

```
VITE_API_URL=https://api.example.com  (если есть бекенд)
VITE_ENV=production
```

## Checklist перед деплоем

- [ ] `npm run build` выполняется без ошибок
- [ ] Нет console.log в продакшене
- [ ] API endpoints правильно сконфигурированы
- [ ] .env файлы добавлены в .gitignore
- [ ] Build folder (dist) исключен из git

## Решение проблем

### "Cannot find module"

```bash
npm install
npm run build
```

### Port already in use

```bash
# Измените port в vite.config.js или используйте другой:
PORT=3000 npm run dev
```

### API connection failed

Убедитесь что используется правильный API endpoint в production

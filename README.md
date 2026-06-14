# KVRON

KVRON is organized as a Laravel API backend and a standalone React frontend.

## Structure

```text
kvron-backend/
kvron-frontend/
```

## Backend

```bash
cd kvron-backend
composer install
php artisan serve
```

The backend API is available at:

```text
http://127.0.0.1:8000/api
```

Health check:

```text
http://127.0.0.1:8000/api/health
```

## Frontend

```bash
cd kvron-frontend
npm install
npm run dev
```

The frontend reads the API base URL from:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Git Commands

```bash
git status
git remote -v
git branch
```

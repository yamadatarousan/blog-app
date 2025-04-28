## Blog App
A full-stack blog with real-time comments and likes.

## Features
- Tag-based post filtering
- Real-time comments
- Session-based likes (no login)
- Light/Dark themes

## Tech Stack
- Frontend: Next.js 15, TypeScript, Tailwind CSS
- Backend: Laravel 12, Filament, MySQL
- DevOps: Docker, Nginx

## Setup
1. Clone: `git clone https://github.com/yamadatarousan/blog-app`
2. Run: `docker-compose up -d`
3. Backend: `docker-compose exec laravel composer install`
4. Frontend: `cd frontend && npm install`
5. Migrate: `docker-compose exec laravel php artisan migrate`
6. Access: `http://localhost:3000`

# blog-app
- 自分個人用のブログシステムを想定して開発

## フロントエンド
- React
- NextJS
- TypeScript
- Vitest
- tailwindcss

## バックエンド
- Laravel
- Filament
- PHPUnit

## データベース
- MySQL

## Webサーバ
- nginx

## memo
## 開発環境の構築
- composerでlaravelインストール
```
composer create-project laravel/laravel backend
```
- NextJSのインストール
```
npx create-next-app@latest
```
- docker-compose.ymlを使ってコンテナをビルド
```
docker-compose up -d
```
### 構成について
- バックエンドのDBにフロントエンドの表示用データを投入するのはFilamentの管理画面の役割
- DBに保存されているデータをlaravelのREST APIがフロントエンドに提供する


### tailwindについて
- tailwindは3.4.14、4系だとinitの際にエラーが出る

### コンテナ内作業例
```
docker-compose exec laravel bash
mysql -u root -p -h mysql -P 3306
```
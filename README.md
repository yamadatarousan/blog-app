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

### aws
```
sudo ssh -i "aws-app.pem" ubuntu@ec2-43-207-111-116.ap-northeast-1.compute.amazonaws.com
sudo su -
apt update
apt install vim
curl -fsSL https://get.docker.com -o get-docker.sh　
#####ここでdockerのバージョンが古くなってしまった
sh get-docker.sh
apt install docker-compose
apt install git
git clone https://github.com/yamadatarousan/blog-app.git
git branch aws-ubuntu
#####migrateの前に設定
touch .env
vi .env
docker-compose up -d
docker-compose exec laravel bash
cd /var/www
composer install
php artisan migrate
#####DBの中身を確認 
mysql -u root -p -h mysql -P 3306
chown -R www-data:www-data /var/www/storage
chown -R www-data:www-data /var/www/bootstrap/cache
chmod -R 775 /var/www/storage
chmod -R 775 /var/www/bootstrap/cache
docker-compose exec laravel bash
php artisan tinker
use App\Models\User;
$user = new User();
$user->name = 'Admin';
$user->email = 'admin@example.com';
$user->password = bcrypt('password');
$user->save();
exit
```



EC2
スペック: 3medium
セキュリティグループ: 22,80,3000,443ポート開放
ストレージ: 50G

発生した問題
this page has expired.
would you like to refresh the page?
※解決済み

aws
```
sudo ssh -i "aws-app.pem" ubuntu@57.180.60.58
sudo su -
apt update
apt install vim
apt install git
apt install npm
apt install ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install docker-ce docker-ce-cli containerd.io
apt install docker-compose
cd /
git clone https://github.com/yamadatarousan/blog-app.git
cd blog-app/frontend
npm install
cd ../
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
docker-compose -v
cd backend/
touch .env
vi .env
docker-compose exec laravel bash
composer install
php artisan migrate
mysql -u root -p -h mysql -P 3306
php artisan tinker
use App\Models\User;
$user = new User();
$user->name = 'Admin';
$user->email = 'admin@example.com';
$user->password = bcrypt('password');
$user->save();
exit
chown -R www-data:www-data /var/www/storage
chown -R www-data:www-data /var/www/bootstrap/cache
chmod -R 775 /var/www/storage
chmod -R 775 /var/www/bootstrap/cache
vi .env
APP_URL=http://57.180.60.58
SESSION_DRIVER=database
SESSION_CONNECTION=mysql
SESSION_DOMAIN=57.180.60.58
SESSION_SECURE_COOKIE=false
docker-compose exec laravel
php artisan config:clear
php artisan optimize:clear
rm -rf /var/www/storage/framework/sessions/*
exit
chown -R www-data:www-data /blog-app/backend/storage
chmod -R 775 /blog-app/backend/storage
cd /blog-app/frontend
touch .env.local
NEXT_PUBLIC_API_URL=http://57.180.60.58
/blog-app/backend/config/cors.php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://57.180.60.58:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```
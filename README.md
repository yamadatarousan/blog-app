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
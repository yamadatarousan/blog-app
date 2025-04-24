# blog-app
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

## memo
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
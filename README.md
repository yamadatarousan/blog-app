# blog-app
## フロントエンド
- React
- NextJS
- TypeScript
- Vitest
- tailwindcss

## バックエンド
- Laravel(認証にsanctum使用)
- Filament
- PHPUnit

## データベース
- MySQL

## memo
### tailwindについて
- tailwindは3.4.14、4系だとinitの際にエラーが出る

### コンテナ内作業例
```
docker-compose exec laravel bash
mysql -u root -p -h mysql -P 3306
```
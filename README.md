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
- tailwindは3.4.14、4系だとinitの際にエラーが出る
- php,laravelの設定の際にDockerコンテナ内で作業が必要

```
apt-get update
apt-get install -y libpq-dev
docker-php-ext-install pdo_mysql
php -m | grep pdo_mysql
```

- これでphp.iniにpdo_mysqlをロードさせる記述を追記
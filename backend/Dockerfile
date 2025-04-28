# backend/Dockerfile
FROM php:8.2-fpm

WORKDIR /var/www

# 必要なパッケージとPHP拡張をインストール
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    vim zip unzip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# アプリケーションファイルをコピー
COPY ./backend .

# 依存関係インストール
RUN composer install --optimize-autoloader --no-dev

# 権限設定
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# PHP-FPM起動
CMD ["php-fpm"]
FROM php:8.3-fpm

WORKDIR /var/www  # 追加

# Composerをインストール
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 必要なパッケージとPHP拡張をインストール
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    libpq-dev \
    vim \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql intl zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Laravelの依存をインストール
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader

# アプリケーションコードをコピー
COPY . .

# Composerオートロード生成
RUN composer dump-autoload --optimize

# 権限設定
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache

# PHP-FPM設定
COPY docker/php.ini /usr/local/etc/php/php.ini
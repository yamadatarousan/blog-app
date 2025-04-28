FROM php:8.3-fpm
WORKDIR /var/www
RUN apt-get update && apt-get install -y \
    zip unzip git curl nginx \
    libicu-dev libzip-dev  # ext-intlとext-zipに必要な依存
RUN docker-php-ext-install pdo_mysql intl zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
COPY . .
RUN composer install --no-dev
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["sh", "-c", "php artisan storage:link && php-fpm -D && nginx -g 'daemon off;'"]
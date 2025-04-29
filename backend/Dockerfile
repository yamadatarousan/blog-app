FROM php:8.3-fpm
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    lsof \
    net-tools \
    && docker-php-ext-install \
    intl \
    pdo_mysql \
    pdo_pgsql \
    zip
COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader
COPY . .
RUN composer dump-autoload --optimize
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache
COPY docker/php.ini /usr/local/etc/php/php.ini
COPY docker/www.conf /usr/local/etc/php-fpm.d/www.conf
CMD ["php-fpm"]
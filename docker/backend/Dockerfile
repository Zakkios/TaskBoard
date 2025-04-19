# Image php:8.4.6-apache.
FROM php:sha256:abce8fe7e3390e96d3ac52dff8e6f5ff9507f4a7bee2b18f11404b74d7efec66

# Installez les dépendances système nécessaires pour Symfony
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    docker-php-ext-install pdo_mysql

# Définis le répertoire de travail
WORKDIR /var/www/

# Copie tous les fichiers du projet Symfony dans le conteneur
COPY ../../app/backend/ /var/www/html

# Installe Composer 
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installe Symfony
RUN curl -1sLf https://dl.cloudsmith.io/public/symfony/stable/setup.deb.sh | bash - &&\
    apt-get install -y symfony-cli

# Active l'extension Xdebug
RUN pecl install xdebug && \
    docker-php-ext-enable xdebug && \
    echo "xdebug.mode=coverage" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini && \
    echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Expose le port 8000 (ou tout autre port que vous utilisez pour Symfony)
EXPOSE 8000

# Lance le serveur Symfony automatiquement lors du démarrage du conteneur
CMD composer install && \
    symfony server:start --no-tls --allow-http --port=8000 --listen-ip=0.0.0.0
# Image php:8.4.6-apache-bullseye.
FROM php:8.4.6-apache-bullseye

# Installez les dépendances système nécessaires pour Symfony
RUN apt-get update && apt-get install -y \
    git \
    libzip-dev \
    unzip \
    libonig-dev \
    libxml2-dev \
    libpng-dev \
    zlib1g-dev \
    && docker-php-ext-install pdo pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

# Définis le répertoire de travail
WORKDIR /var/www/

# Copie tous les fichiers du projet Symfony dans le conteneur
COPY app/backend/ /var/www/html

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

# Lance le serveur Symfony 
COPY docker/scripts/start-backend.sh /usr/local/bin/start-backend.sh
RUN chmod +x /usr/local/bin/start-backend.sh
CMD ["start-backend.sh"]
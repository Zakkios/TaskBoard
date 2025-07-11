# Image node:23.11.0-slim
FROM node:23.11.0-slim

# Installer les dépendances système nécessaires à certaines bibliothèques JS
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*
    
# Définis le répertoire de travail dans le conteneur
WORKDIR /app

# Copie les fichiers du frontend (React) dans le conteneur, en respectant .dockerignore
COPY app/frontend/package*.json ./

# Exclu node_modules lors de la copie en utilisant un deuxième étape
COPY app/frontend/ .

# Expose le port sur lequel l'application React écoute
EXPOSE 3000

# Lance l'application React
COPY docker/scripts/start-frontend.sh /usr/local/bin/start-frontend.sh
RUN chmod +x /usr/local/bin/start-frontend.sh
CMD ["start-frontend.sh"]
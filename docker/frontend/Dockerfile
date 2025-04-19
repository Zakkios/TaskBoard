# Image node:current-alpine3.21 node version 23.11.0
FROM node:sha256:86703151a18fcd06258e013073508c4afea8e19cd7ed451554221dd00aea83fc

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers du frontend (React) dans le conteneur, en respectant .dockerignore
COPY package*.json ./

# Exclure node_modules lors de la copie en utilisant un deuxième étape
COPY . .

# Exposez le port sur lequel l'application React écoute
EXPOSE 3000

# Commande pour lancer l'application React
CMD npm install && \
    npm install -g vite && \
    npm run dev -- --host 0.0.0.0
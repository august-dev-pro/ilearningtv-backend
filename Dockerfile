FROM node:18

# Définir le dossier de travail
WORKDIR /app

# Copier les fichiers package.json d'abord (optimisation du cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Exposer le port utilisé par NestJS
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "start"]

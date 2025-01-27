# Utilisation de l'image Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration et dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du service
COPY . .

# Exposer le port
EXPOSE 3000

# Lancer l'application
CMD ["npm", "start"]

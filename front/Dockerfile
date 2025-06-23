FROM node:18

# Dossier de travail
WORKDIR /usr/src/app

# ✅ Copie les fichiers nécessaires à l'installation
COPY package*.json ./

# Supprime le node_modules s'il existe (souvent inutile ici, mais OK pour clean)
RUN rm -rf node_modules

# Installe les dépendances
RUN npm install

# Copie le reste du code
COPY . .

# Expose le bon port (change 5173 si besoin)
EXPOSE 5173

# Commande de lancement
CMD ["npm", "run", "host"]

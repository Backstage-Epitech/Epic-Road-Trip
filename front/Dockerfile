FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
# COPY package*.json ./
# Supprimer le dossier node_modules s'il existe déjà
RUN rm -rf node_modules
# Install app dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
EXPOSE 80
CMD [ "npm", "run", "host" ]

FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
EXPOSE 8081
CMD ["npm", "run", "dev"]
# CMD ["./startup.sh" ]
# a mettre dans startup.sh si on arrive a faire marcher sequelize-cli
# npx sequelize-cli db:migrate
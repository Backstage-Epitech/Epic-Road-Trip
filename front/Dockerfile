FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY . .
RUN npm install
EXPOSE 80
CMD [ "npm", "run", "host" ]
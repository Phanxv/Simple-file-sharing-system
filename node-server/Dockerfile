FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install
RUN npm install -g nodemon

COPY . .
# CMD [ "npm", "start"]
CMD ["npm", "run", "dev"]
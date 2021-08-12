FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000
ENV NODE_ENV=production
CMD [ "node", "server.js" ]

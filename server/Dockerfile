FROM node:10

WORKDIR /usr/src/server

COPY package*.json ./

RUN yarn install

COPY . .
EXPOSE 5000

CMD ["yarn", "server"]
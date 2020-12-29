FROM node:12.18.0

RUN mkdir /src
RUN mkdir /src/server

WORKDIR /src

COPY package*.json ./
COPY /server/package*.json ./server
RUN yarn install
RUN yarn install --cwd ./server

COPY . .

EXPOSE 8080
CMD yarn build:server && yarn start:server

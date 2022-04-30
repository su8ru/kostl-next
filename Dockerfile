FROM node:15

ARG PORT
ARG API_BASE_PATH
ARG API_ODPT_TOKEN
ARG API_ORIGIN

RUN mkdir /src
RUN mkdir /src/server

WORKDIR /src

COPY /server/package.json /server/yarn.lock ./server/
RUN yarn install --cwd ./server

COPY . .

EXPOSE $PORT
CMD yarn build:server && yarn start:server

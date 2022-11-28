FROM node:16

RUN mkdir /server

WORKDIR /server

COPY /package.json /yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]

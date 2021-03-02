FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
COPY client client
COPY server server

RUN yarn install
RUN yarn build:client

RUN yarn install --production --ignore-scripts --prefer-offline
RUN rm -rf client

EXPOSE 3000

CMD yarn start

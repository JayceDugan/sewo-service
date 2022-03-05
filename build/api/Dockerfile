FROM node:alpine as base

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "/usr/app/"]
COPY src src

RUN yarn install

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
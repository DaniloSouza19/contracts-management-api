FROM node:16.13.1 as base

WORKDIR /usr/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3333

FROM base as production
ENV NODE_ENV=production
RUN yarn build
CMD [ "yarn", "prod:server"]

FROM base as dev
ENV NODE_ENV=development
CMD [ "yarn", "dev:server"]

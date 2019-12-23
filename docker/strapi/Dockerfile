# @see https://github.com/strapi/strapi-docker/blob/master/examples/custom/Dockerfile
FROM strapi/base

WORKDIR /srv/app

COPY ./src .

RUN yarn install

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]

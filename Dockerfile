FROM node:18.14.0
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
RUN corepack enable && corepack prepare yarn@stable --activate && yarn set version stable && yarn plugin import typescript && yarn plugin import interactive-tools
COPY ./favicon /favicon
COPY . .
RUN cp -f .env.docker .env
RUN yarn && yarn setup
EXPOSE 4000
CMD [ "yarn", "start:dev" ]

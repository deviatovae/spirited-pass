FROM node:22.6.0-alpine3.19

WORKDIR /api

COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["npm", "run", "start:dev"]
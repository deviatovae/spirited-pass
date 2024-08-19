FROM node:22.6.0-alpine3.19

WORKDIR /app

COPY package.json .
RUN npm install

CMD ["npm", "run", "dev"]
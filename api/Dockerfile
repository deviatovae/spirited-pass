FROM node:22.6.0-alpine3.19

WORKDIR /api

COPY package*.json .
COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma db seed

EXPOSE 10000

CMD ["npm", "run", "start"]
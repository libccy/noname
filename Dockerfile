FROM node:18

WORKDIR /app

COPY ./docker/index.js ./
COPY ./docker/package.json ./

RUN npm install

COPY . .

EXPOSE 8089

CMD [ "node", "index.js" ]
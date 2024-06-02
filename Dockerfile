FROM node:18

WORKDIR /app

COPY ./docker/index.js ./

RUN npm install body-parser express minimist

COPY . .

EXPOSE 8089

CMD [ "node", "index.js" ]
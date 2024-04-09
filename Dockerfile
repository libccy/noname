FROM node:bookworm-slim
RUN npm install pm2 -g

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 80
EXPOSE 8080

CMD [ "pm2-runtime", "process.yml" ]
FROM node:alpine
RUN npm install pm2 -g

WORKDIR /app
COPY . .
RUN rm -rf noname-server.exe .git .github README.md Dockerfile .gitignore .dockerignore
RUN npm install

EXPOSE 80
EXPOSE 8080

CMD [ "pm2-runtime", "process.yml" ]
# 使用官方 Node.js 镜像作为基础镜像
FROM node:lts-alpine3.17

# 将node_modules文件夹复制到 Docker 容器中的 /app 目录下
COPY ./node_modules /app/node_modules
# 将game/server.js 复制到 Docker 容器中的 /app 目录下
COPY game/server.js /app

# 切换工作目录到 /app
WORKDIR /app

# 对外暴露的端口
EXPOSE 8080

# 在容器启动时运行的命令
CMD ["node", "server.js"]

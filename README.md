客户端下载戳这里：

GitHub： https://github.com/libccy/noname/releases/tag/SSS

Coding： https://nakamurayuri.coding.net/p/noname/d/noname/git/releases/SSS

网页端推荐使用Chrome系内核浏览器游玩，不推荐使用Firefox浏览器


## 使用docker部署noname服务器

## 前置条件
在开始之前，请确保你已经安装了 Docker。你可以从官方网站下载安装包并按照说明进行安装。

## 使用预先构建好的Docker容器镜像

`docker run -p 8080:8080 -d cloudtom/noname-server:latest`

## 自行构建镜像

1.从 Github 上将项目克隆或下载到本地

2.进入项目目录，并使用以下命令构建 Docker 镜像：

`docker build -t <YOUR_IMAGE_NAME> .`

3.使用以下命令启动 Docker 容器

`docker run -p 8080:8080 -d <YOUR_IMAGE_NAME>`



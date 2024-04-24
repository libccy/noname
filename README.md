[![Docker Image CI](https://github.com/xiaochun-z/noname/actions/workflows/docker-image.yml/badge.svg)](https://github.com/xiaochun-z/noname/actions/workflows/docker-image.yml)

Forked from: https://github.com/libccy/noname

## 一键安装
参见 https://hub.docker.com/r/hsiaoshun/noname
```bash
docker run -d --name sgs -p 80:80 -p 8080:8080 --restart unless-stopped hsiaoshun/noname:latest
```
安装以后，访问你的docker服务器的IP即可开启三国杀，需要联机时，也填入docker所在的服务器IP。
此种方式的好处在于跟家人用iPhone/Android/电脑/iPad/Android平板等等都可以一起联机。

### 示例
例如：你的Docker所在的服务器是`192.168.1.15`，那么安装完成后，用浏览器访问 http://192.168.1.15 即可打开三国杀。

### 跟家人联机：
点击联机，地址填入 `192.168.1.15` 或者完整使用地址（推荐） `ws://192.168.1.15:8080` 即可联机。

## 动机
为了在家庭局域网部署一个三国杀服务器，在家里供人家游戏，将无名杀Docker化，使得其易于部署，部署者不需要懂得相关知识。

## Docker化 无名杀
这个仓库将原有的无名杀Docker化，使得更容易部署web端游戏，联机服务器也在同一IP地址。

## 镜像Build
```bash
docker build -t sgs:latest .
docker run --rm --name sgs -p 80:80 -p 8080:8080 sgs:latest
#docker run -d --name sgs -p 80:80 -p 8080:8080 --restart unless-stopped sgs:latest
```
部署后，访问机器的IP地址则能开始游戏，如要联机，也输入部署机器的同一IP地址即可。


```bash
docker run -d -p 5000:5000 --restart always --name registry registry:2 # run a local docker registry on development machine.
docker tag sgs:latest 192.168.2.5:5000/sgs # tag docker image
docker push 192.168.2.5:5000/sgs # push to a local registry

# on the target server(the game server), pull this image.
docker pull 192.168.2.5:5000/sgs

# run service
docker run -d --name sgs -p 80:80 -p 8080:8080 --restart unless-stopped 192.168.2.5:5000/sgs:latest
```
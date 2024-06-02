### 使用 docker 运行 noname

1.克隆存储库

```shell
git clone https://github.com/nonameShijian/noname.git
cd noname
```

2. 构建

```shell
docker build -t noname .
```

3. 启动

```shell
docker run -dit --name noname --restart=unless-stopped -p 8734:8089  noname
```

`8734`可改为自己的端口

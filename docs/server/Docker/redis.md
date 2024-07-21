# Docker部署Redis

## 一、拉取Docker Redis镜像

```sh
docker pull redis
```

上面代码默认拉取最新镜像，也可以指定版本号

```sh
docker pull redis:5.0.9
```

## 二、创建Redis配置文件

docker运行redis一般是在宿主机创建一个配置文件，然后通过-v参数将配置文件挂载到容器中，这样容器中的redis就可以读取到配置文件了。

```sh
mkdir -p redis/conf
vim redis/conf/redis.conf
```

配置文件内容：

```conf
port 6379
bind 0.0.0.0
requirepass your_password
protect-mode no
appendonly yes
daemonize no
loglevel notice
logfile /var/log/redis/redis.log
pidfile /var/run/redis/redis.pid
maxclients 10000
maxmemory 1024mb
maxmemory-policy noeviction
save 900 1
```

参数说明：

- port: 指定端口号

- bind: 可接受的请求IP地址, 0.0.0.0为所有IP地址

- requirepass: 设置密码

- protect-mode: 保护模式, 开启后只允许本地回环地址访问

- appendonly: 开启AOF持久化

- daemonize: 是否后台运行(docker run -d本身就是后台运行，所以这里为no)

- loglevel: 日志级别

- logfile: 日志文件路径

- pidfile: 进程文件路径

- maxclients: 最大连接数

- maxmemory: 最大内存限制

- maxmemory-policy: 内存淘汰策略

- save: 快照保存策略

- 
## 三、创建并运行Redis容器

```sh
docker run --name my-redis -p 6379:6379 -v redis/conf/redis.conf:/etc/redis/redis.conf -v redis/data:/data -d redis redis-server /etc/redis/redis.conf
```

参数说明：

- --name: 指定容器名称

- -p: 指定端口映射，格式为：宿主机端口:容器端口

- -v: 指定配置文件和数据文件挂载路径，格式为：宿主机路径:容器路径

- -d: 后台运行容器

- redis-server: 指定容器启动时执行的命令（运行redis-server）

- /etc/redis/redis.conf: 指定容器启动时执行的命令的参数（在这里就是给redis-server指定配置文件）


## 连接Redis

```sh
redis-cli

auth password
```

需要安装redis-tools

```sh
apt install redis-tools
```

上面代码为ubuntu系统。


## 进入Redis容器

```sh
docker exec -it redis /bin/bash
```

## 停止Redis容器

```sh
docker stop my-redis
```

## 删除Redis容器

```sh
docker rm my-redis
```

## 删除Redis镜像

```sh
docker rmi redis
```

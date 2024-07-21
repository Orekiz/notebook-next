# Docker笔记

## 基本概念

### 镜像

### 容器

### 仓库

## 安装

### Ubuntu

----

#### 使用APT安装

先更新下apt源索引。

```shell
sudo apt update
```

安装使用HTTPS传输的软件包以及CA证书让APT使用HTTPS下载。

```shell
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release
```

为了确认所下载软件包的合法性，需要添加软件源的 GPG 密钥。

```shell
# 阿里源
curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 官方源
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

向`/etc/apt/sources.list.d/docker.list`文件中添加Docker软件源。

```shell
# 阿里源
echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 官方源
# echo \
#   "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
#   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

更新apt软件包索引，并安装最新版本的Docker-CE(Community Edition)和containerd。

```shell
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

#### 启动!

```shell
sudo systemctl enable docker
sudo systemctl start docker
```

#### 验证安装

```shell
sudo docker --version
```

## 命令

**搜索镜像**

```shell
docker search [镜像名]
```

**拉取镜像**

```shell
docker pull [镜像名]
```

**创建并运行容器**

通过指定镜像来创建并运行容器

```shell
docker run [镜像名]
```

参数很多，如下：

- `-i`: 以交互模式运行容器，通常与 `-t` 同时使用。
- `-t`: 为容器重新分配一个伪输入终端，通常与 `-i` 同时使用。
- `-d`: 后台运行容器，并返回容器ID。
- `--name`: 为容器指定一个名称。
- `-p`: 将容器的端口映射到主机的端口。
- `-v`: 将主机的目录或文件挂载到容器中。
- `--restart`: 设置容器的重启策略，例如 `--restart=always` 表示容器总是重启。
- `-e`: 设置环境变量。

**查看容器**

```shell
docker ps
```

**查看所有容器**

```shell
docker ps -a
```

**停止容器**

```shell
docker stop [容器名]
```

**删除容器**

```shell
docker rm [容器名]
```

**查看镜像**

```shell
docker images
```

**删除镜像**

```shell
docker rmi [镜像名]
```

## 数据卷 `volume`

镜像是只读的，我们在容器中做的任何的文件读写操作，都不会影响到镜像。Docker会在其顶部添加一个读写层，容器运行的时候，文件的读写都是在读写层完成的。

为了能够持久化容器的经过更改的数据，并且能够容器间数据共享，就有了数据卷。

数据卷是存在于宿主机文件系统中的。

功能和好处：

- 删除容器，数据卷也会存在。
- 双向映射，修改任何一方，另一方都会同步。
- 数据卷可以在 容器到宿主机 、 宿主机到容器 、 容器到容器 之间进行数据共享。

### 创建卷

```shell
docker volume create [卷名]
```

### 查看卷

```shell
docker volume ls
```

### 删除卷

```shell
docker volume rm [卷名]
```

### 查看卷详情

```shell
docker volume inspect [卷名]
```

### 挂载卷

```shell
docker run -v [卷名]:[容器内路径] [镜像名]
```

## 容器的更新

镜像更新了，需要用新的镜像来创建新的容器。

这样的话，新的容器并没有老容器的数据，  
如果需要保留老容器的数据，需要将旧容器的数据卷挂载到新容器中。

```shell
docker run --volumes-from [容器的name或id]
```

在 `docker run` 创建并运行容器的时候，使用 `--volumes-from` 参数，并指定容器的 name 或 id, 可以将别的容器的数据卷挂载到新容器中。使用这个数据卷的设置，宿主机和容器的路径保持原样。


## docker-hub的镜像站

1. jockerhub - `https://jockerhub.com` [link](https://jockerhub.com)
2. noohub - `https://noohub.ru` [link](https://noohub.ru)
3. 更多的查看[这个博客文章](https://blog.eimoon.com/p/docker-mirror-access-solutions/)

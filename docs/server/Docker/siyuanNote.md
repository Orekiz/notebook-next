# 服务器Docker部署思源笔记

## 第一步

1. 先拉取思源笔记的镜像

    ```sh
    docker pull b3log/siyuan
    ```

2. 将镜像拉取到本地后，可以查看本地镜像列表

    ```sh
    docker images
    ```

### 会出现的问题：

* 拉取镜像时报错

  * ```sh
    Error response from daemon
    ```

    网络问题，Docker默认源DockerHub外国网站速度较慢

    添加国内镜像源
    > 下面代码中为南京大学docker-hub镜像

    ```sh
    vim /etc/docker/daemon.json
    # 添加内容
    {
      "registry-mirrors": ["https://docker.nju.edu.cn/"]
    }
    ```
    
  * 添加完国内镜像源之后需要重启Docker服务。

    ```sh
    # 重新载入systemd，扫描新的或有变动的单元
    systemctl daemon.reload
    # 重启Docker服务
    systemctl restart docker
    ```

## 第二步

此时已经拉取了思源笔记的镜像

根据拉取的思源笔记镜像运行容器：

```sh
docker run -d --name siyuanNote -v /siyuan/workspace:/siyuan/workspace -p 6806:6806 -u 1000:1000 b3log/siyuan --workspace=/siyuan/workspace
```

**参数解释：**

* `-d` 后台运行，不会因为shell的停止而停止运行
* `--name` 容器名字
* `-v` 挂载目录，将宿主机的目录挂载至docker容器内
* `-p` 端口映射
* `-u` 给用户组的权限
* `--workspace` 容器的工作目录

### 关于用户权限的问题

镜像中是使用默认创建的普通用户`siyuan` (uid 1000 / gid 1000) 来启动内核的，所以在宿主机创建工作空间文件夹的时候请注意宿主机的工作目录所属用户组：`chown -R 1000:1000 /siyuan/workspace`

在启动时应带参数`-u 1000:1000`

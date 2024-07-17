# Docker部署RabbitMQ

## 1.拉取镜像

```shell
docker pull rabbitmq:management
```

后面的 `:management` 指定tag为manegement。

tag: \<management\>就是带有管理界面插件的版本，默认的版本是不带管理界面插件的。

## 2. 指定数据卷

为了方便持久化，我们自己创建一个数据卷，将容器和宿主机相互映射。

```shell
docker volume create rabbitmq
```

## 2.创建并运行容器

```shell
docker run -d --name rabbitmq -v rabbitmq-home:/var/lib/rabbitmq -p 15672:15672 -p 5672:5672 -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=123456 rabbitmq:management
```

上面的各个参数的含义：

- `-id`：后台运行容器并返回容器ID
- `--name rabbitmq`：指定容器名称为rabbitmq
- `-v rabbitmq-home:/var/lib/rabbitmq`：将容器内的/var/lib/rabbitmq目录映射到宿主机的名为 `rabbitmq-home` 的volume，用于持久化数据  
/var/lib/rabbitmq是rabbitmq的默认数据路径，这样互相映射之后，就可以在宿主机直接拿到rabbitmq的数据了。
- `-p 5672:5672`：将容器的5672端口映射到宿主机的5672端口，用于消息通信
- `-p 15672:15672`：将容器的15672端口映射到宿主机的15672端口，用于访问管理界面

`-e` 参数就是设置环境变量

- `-e RABBITMQ_DEFAULT_USER=admin`：设置默认的用户名为admin
- `-e RABBITMQ_DEFAULT_PASS=123456`：设置默认的密码为123456
- `rabbitmq:management`：指定使用的镜像为rabbitmq:management

## 3.访问RabbitMQ

`<ip>:15672` 即可访问管理页面，用户名密码就是环境变量那两个的参数。

> 如果没有设置那两个环境变量的话，默认的用户名密码都是 guest

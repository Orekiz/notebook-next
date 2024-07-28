# SSH笔记

## 密钥登录

密钥分为公钥和私钥。

公钥放在服务器上，私钥作为访问的钥匙留着。

### 创建密钥

```shell
ssh-keygen -t rsa -C "comment"
```

参数：

* ​`-t`​ 设置加密形式。
* ​`-C`​ 备注。用于区分公钥。

创建好密钥后，默认名字为 `id_rsa`​ ，会产生两个文件：

1. ​`id_rsa`​ 私钥文件
2. ​`id_rsa.pub`​ 公钥文件


### **被登录系统设置允许登录**

#### 前置
‍
登录用户的家目录需要创建 `.ssh`​ 目录，并且权限是 `700`​ 。

使用登录用户执行：

```shell
cd ~
mkdir .ssh
chmod 700 .ssh
```

创建好后需要创建 `authorized_keys`​ 文件，添加公钥用于验证私钥登录，并且权限是 `600`​ 。

使用登录用户执行：

```shell
cd ~/.ssh
touch authorized_keys
chmod 600 ./authorized_keys
```

#### 配置验证

验证登录是通过 登录用户的 `~/.ssh/authorized_keys`​ 文件中保存的公钥来验证的。

可以将 `.pub`​ 后缀的公钥文件上传到被登录系统中，然后写入登录用户的 `~/.ssh/authorized_keys`​ 文件。

```shell
cat id_rsa-comment.pub >> ~/.ssh/authorized_keys
```

> 一般来说是PC来创建密钥然后传公钥到服务器上方便一点，这样的话登录的时候SSH命令可以直接用默认的id_rsa私钥就好了。  
也可以服务器上创建密钥，然后传私钥出来，但是这样的话SSH命令还要指定私钥文件，略麻烦一些。

## 密码登录

需要 `/etc/ssh/sshd_config`​ 文件中，配置选项 `PasswordAuthentication`​ 需要为 `true`​ 。

配置之后重启加载 sshd 服务。

```shell
sudo systemctl reload sshd
```

之后就可以通过用户的密码来进行SSH登入连接。

## SSH命令

```shell
ssh user@host
```

参数
- `user`​ 用户名
- `host`​ 主机名或IP地址
- `-i` 指定私钥文件 默认是 `~/.ssh/id_rsa`

## 注意事项

#### AllowUsers

如果 `/etc/ssh/sshd_config`​ 文件中，配置了 `AllowUsers`​ 选项，那么创建的新用户可能会无法登录。注释掉选项可以让所有用户都可以登录；或者添加需要登录的用户进去。

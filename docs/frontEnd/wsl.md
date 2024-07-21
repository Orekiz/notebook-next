# WSL

适用于Windows的Linux子系统。

## 安装

前提：需要打开Windows功能中的 `hyperv`, `适用于Windows的Linux子系统` 和 `虚拟机平台` 这三个功能。

### 直接命令安装

```shell
wsl --list --online
# wsl -l -o
```

先查看可以安装的Linux发行版，然后选择一个进行安装。

```shell
wsl --install Ubuntu
```

### 手动下载安装

可以通过Microsoft Store安装。

[下载链接](https://learn.microsoft.com/zh-cn/windows/wsl/install-manual#downloading-distributions)

1. 使用上方的下载链接下载的是 `.AppxBundle` 文件。
2. 改后缀为 `.zip` 后解压。
3. 解压后，找到 `distro.appx` 文件。
4. 改后缀为 `.zip` 后解压。
5. 将解压后的文件夹放到子系统要安装到的位置。
6. 解压后的文件夹中找到 `distro.exe` 文件。
7. 运行 `distro.exe` 文件。
8. 等待安装完成。安装完成后就可以设置用户名和密码。

安装成功后，会自动生成 `ext4.vhdx` 文件。 这就是Linux子系统挂载的盘。


## 启动

```shell
wsl -d Ubuntu
# wsl -d Ubuntu -u user
```

- -d 运行指定的子系统
- -u 指定用户名

## 卸载

### 卸载指定子系统

```shell
wsl --unregister Ubuntu
```

### 卸载全部的子系统

```shell
wsl --uninstall
```

## 安装到非C盘

### 安装后迁移

正常流程下载安装好后

关闭系统

```shell
wsl --shutdown
```

导出镜像

```shell
wsl --export Ubuntu D:\wsl
```

删除原来的Ubuntu

```shell
wsl --unregister Ubuntu
```

导入镜像

```shell
wsl --import [DistroName] [InstallLocation] [ImagePath]
```

- DistroName 将要安装的WSL实例的名字
- InstallLocation：安装位置
- ImagePath：镜像位置

## 一些配置

:::warning
配置中:  
属性带有 * 的条目仅在 Windows11 中可用；  
属性带有 ** 的条目仅在 Windows11 22H2 或更高版本中可用。
:::

### 设置启动的默认用户

子系统 `/etc/wsl.conf`

```txt
[user]
default=用户名
```

### WSL2使用宿主机网络(镜像网络)

宿主机目录 `C:\Users\用户名\.wslconfig`

```txt
[wsl2]
networkingMode=mirrored
```

- `localhostForwarding` 默认true 子系统是否可以通过localhost来访问宿主机的服务。
- `autoProxy` 默认true 设置是否强制使用宿主机Windows的HTTP代理
- `networkingMode**` 默认`NAT` 如果值为 mirrored，则会启用镜像网络模式。 默认或无法识别的字符串会生成 NAT 网络。

### 自动释放内存

宿主机 `C:\Users\用户名\.wslconfig`

```txt
[experimental]
autoMemoryReclaim=gradual
```

- `autoMemoryReclaim` 默认值disabled `gradual` 是慢速释放;  `dropcache` 是立即释放。

### 稀疏虚拟硬盘

节省宿主机硬盘空间

宿主机 `C:\Users\用户名\.wslconfig`

```txt
[experimental]
sparseVhd=true
```

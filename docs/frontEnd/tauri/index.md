# Tauri

AI 摘要: 使用Tauri框架可以使用Web技术构建跨平台应用程序，提供了许多有用的功能，如文件系统访问、系统通知和本地存储。使用Tauri提供的notification api，使得开发者可以更加方便地实现发送windows的通知。虽然在开发过程中可能会遇到一些挑战，但是使用Tauri框架可以使这个过程更加轻松和愉快。
Created: June 1, 2023 3:14 PM
Tags: WEB跨平台框架

# 使用Tauri框架编写Windows应用

Tauri框架，可以使用Web前端技术栈打造跨平台应用。Tauri的后端使用 `Rust` 语言编写。
Tauri框架展示网页使用的是系统的 `WebView` 。

因为 `Tauri` 使用的是系统的 `WebView` ， 所以打包的时候不需要再带上Chromium，这样的话打包的体积会非常的小（对比Electron）。

## 开始

首先需要安装Node.js

### 创建一个Tauri项目

`npm create tauri-app@latest`

`yarn create tauri-app`

可以选择前端框架，例如Vue, React，选择Ts或者Js，然后等待创建完成即可。
项目创建完成之后就可以开始开发了。

## 配置

src-tauri 目录里面是Tauri的后端文件，可以调用系统的api之类的。

其中 `tauri.conf.json` 是Tauri的配置文件。

### 窗口配置

`tauri -> windows` 

windows属性是一个数组，里面存储的是window对象，添加一个窗口就是往windows属性里添加一个window对象。

window对象有很多属性：

> [官方文档 WindowConfig](https://tauri.app/zh-cn/v1/api/config/#windowconfig)

#### 配置窗口 最小/最大 大小

最小:

```json
{
    "minWidth": 100,
    "minHeight": 100
}
```

最大:

```json
{
    "maxWidth": 1920,
    "maxHeight": 1000
}
```

:::warning
`minWidth`和`minHeight` 或者 `maxWidth`和`maxHeight` 属性必须成对出现，才能生效。
:::

#### fullScreen 属性

`fullScreen` 属性的作用是：**程序启动时是否以全屏启动**。并不是说是否允许全屏。

## 踩坑

### 打包

打包的时候会从github下载内容，所以需要在打包的时候最好开启github加速。

需要在打包的时候修改 `identifier` 属性

位置: `tauri-conf.json -> tauri -> bundle -> identifier`

可以改为 `[com.tauri.build](http://com.tauri.build)` 与原来不一样即可，这个属性的值需要全项目不能有重复的，唯一。

之后可能会报如下错误

```powershell
Downloading https://github.com/wixtoolset/wix3/releases/download/wix3112rtm/wix311-binaries.zip
        Warn Sending fatal alert BadCertificate
       Error failed to bundle project: `Io Error: invalid peer certificate contents: invalid peer certificate: UnknownIssuer`
```

错误原因：

Windows系统中，安装程序有两种

1. `.msi`
2. `-setup.exe`

构建.msi后缀的安装包，使用的是wix3来生成的，上面的错误是想从github上下载wix3工具，但是失败了。需要进入他给的下载网址下载wix3之后，解压到目录：C://users/username/AppData/Local/tauri/WixTools

解压完成后再运行命令 `yarn tauri build` 进行构建即可。

构建-setup.exe的安装程序，则需要Tauri-Cli版本在1.3以上，使用的工具是NSIS。

## scripts

1. 预览 dev
    
    `yarn tauri dev`
    
2. 打包 构建
    
    `yarn tauri build`
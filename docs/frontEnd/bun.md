# Bun

Bun是：

- JS运行时
- 包管理器
- all-in-one 工具包
- 打包器
- 测试运行器
- 自带 `SQLite3` 客户端

## 安装

### Linux

```shell
curl -fsSL https://bun.sh/install | bash
```

使用[gitee bun-cn 镜像](https://gitee.com/akirarika/bun-cn)：

```shell
curl -fsSL https://gitee.com/akirarika/bun-cn/raw/main/install.sh | bash
```

### Windows

使用 `Scoop` 包管理

```shell
scoop install bun
```

## JS运行时

```shell
bun run foo.ts
```

`Bun` 天然支持 `TypeScript` ，所以可以直接运行TS文件。

热更新

任何导入的文件f发生更改的时，会自动重新启动进程。

```shell
bun run --watch index.ts
```

Bun 支持 `JSX` 和 `TSX`。 

## 包管理器

跟其他包管理器命令一样的，无缝切换。

```shell
bun init
bun install # i
bun add foo
bun remove # rm
bun update
bun run
```

### 配置

global:

`~/.bunconfig.toml`

项目专用:

`bunconfig.toml`

配置registry:

```toml
[install]
registry = "https://registry.npmmirror.com/"
```

### 包运行器

`bunx` 是 `bun x` 的别名。

例:

```shell
bunx astro add react vue solid-js 
```


---
outline: {label: '大纲',level: [2, 3]}
---

# CloudFlare 笔记

通过 `CloudFlare` 提供的 `worker` 和 `pages` 服务，可以搭建自己的全栈项目。

## Worker

CloudFlare Worker 是 `FaaS (Function as a Service)` 。它是无状态的服务，每个请求都是单独的上下文，所以无法在请求之间共享使用一个对象等等（可以通过 CloudFlare Durable Objects 持久化对象[²](#参考) 来实现）。

这里只记录 通过 `cli(Wrangler)` 进行开发和管理 worker 的过程。

### Get started

#### 1. 创建项目

使用包管理器来创建项目

::: code-group

```shell [pnpm]
pnpm create cloudflare@latest my-first-worker
```

```shell [bun]
bun create cloudflare@latest my-first-worker
```

:::

在 `cli` 中选择自己需要的模板等等。

创建项目成功后，会自动生成 `wrangler.toml` , 这是 Wrangler 的配置文件。

#### 2. 本地开发服务

::: code-group

```shell [pnpm]
pnpm wrangler dev
```

```shell [bun]
bunx wrangler dev
```

:::

当然如果是通过cli自动生成的项目，也可以通过调用 package.json 里的 scripts 命令中的 `dev` 命令来启动本地服务。

本地服务默认使用 8787 端口：`http://localhost:8787` 。

#### 3. 编写服务

在入口文件中, 默认是 `src/index.js(ts)` 。需要一个默认导出对象， 其中的 `fetch` 属性是一个函数，用于接受请求，是该 Worker 接受请求的总入口。

通过 `cli` 创建项目会生成如下代码:

```js
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello CloudFlare Worker!");
  }
}
```

上方的代码会收到请求后响应 `Hello CloudFlare Worker!` 。

#### 4. 部署项目

通过 Wrangler 部署 Worker 项目到 CloudFlare上，会自动绑定到 `*.workers.dev` 这个子域名上，或者是自定义域名。

```shell
pnpm wrangler deploy
pnpm run deploy # package.json 里的 scripts 命令 (其实就是上面的命令)
```

:::tip
部署项目需要先使用 `pnpm wrangler login` 命令来登录 CloudFlare。
:::

### Email Worker

CloudFlare Worker 可以接收电子邮件（需要在 CloudFlare 工作台上开启电子邮件发送到 Worker）。

实例：

```js
export default {
  async email(message, env, ctx) {
    const allowList = []
    if (allowList.indexOf(message.from) == -1) {
      message.setReject("Address not allowed")
    } else {
      await message.forward("foo@bar.com")
    }
  }
}
```

接受到 Email 后会触发 email 函数。

传入 message 对象，里面包含了电子邮件的一些信息，其中有 `raw` 属性，这是电子邮件的原始字符串。

通过 `postal-mime` 包，可以解析出电子邮件的信息：

```js
import PostalMime from 'postal-mime';

// ...
const emailInfo = await PostalMime.parse(message.raw)
```


## 参考

1. [CloudFlare Worker](https://developers.cloudflare.com/workers/)

2. [Cloudflare Pages](https://developers.cloudflare.com/pages/)

3. [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)

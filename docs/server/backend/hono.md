# Hono

适用于边缘网络的 WEB服务框架。

非常适合作为 CloudFlare Workers 的 Web 服务器框架。

# 创建实例

```js
import { Hono } from 'hono'
const app = new Hono()
```

# 创建路由

```js
import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => c.text('Hello World'))
```

## 路由组

可以把 Hono 实例当作一个路由组，通过 route 方法加入到主实例中。

```js
import { Hono } from 'hono'
const app = new Hono()
const book = new Hono()

book.get('/', (c) => c.text('book'))

app.route('/book', book)
```

## base path

可以设置基本路径

```js
import { Hono } from 'hono'
const app = new Hono({ basePath: '/api' })
app.get('/test', (c) => c.text('Hello World')) // GET /api/test
```

这实例的所有路由前面都会带上 `/api`。

# 配合 CloudFlare Worker

```js
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello World'))

export default {
  fetch: app.fetch
}
```

# 返回响应

```js
import { Hono } from 'hono'
const app = new Hono()
app.get('/', (c) => {
  return c.text('Hello World')
  // return c.json({ message: 'Hello World' })
  // return c.html('<h1>Hello World</h1>')
  // return c.redirect('/hello')
  // return c.notFound()
  // return c.error(404, 'Not Found')
})
```

方法：

- `c.text(body)` 返回 `text/plain`
- `c.json(body)` 返回 `application/json`
- `c.html(body)` 返回 `text/html`
- `c.redirect(url)` 返回 `302 Found`
- `c.notFound()` 返回 `404 Not Found`
- `c.error(status, message)` 返回 `status` 和 `message`

# 

# 中间件

## 官方中间件

### cors

跨域用。用法：

```js
import { Hono } from 'hono'
import { cors } from 'hono/cors'
const app = new Hono()
app.use('*', cors())
```

可以指定路径来跨域：

```js
const app = new Hono()
app.use('/api/*', cors())
```

## 自建中间件

可以通过 `createMiddleware` 这个函数来快速创建自己的中间件。

```js
const messageMiddleware = createMiddleware(async (c, next) => {
  await next()
  c.res.headers.set('X-Message', 'Good morning!')
})

app.use(messageMiddleware) // 不需要调用，因为不是闭包。
```

如果想传入一些自订参数，可以使用闭包的方式：

```js
const messageMiddleware = (message: string) => {
  return createMiddleware(async (c, next) => {
    await next()
    c.res.headers.set('X-Message', message)
  })
}

app.use(messageMiddleware('Good evening!'))
```

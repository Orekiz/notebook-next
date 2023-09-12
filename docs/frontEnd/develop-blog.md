# 学习制作我的博客

## Markdown

开发一个博客最重要的就是markdown能转成html。

我使用的是 [unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown), 他的作用就是编译Markdown让其可以作为Vue组件。同样的，也可以让Vue组件在MarkDown文件中使用。

配置如下: 

```js
// vite.config.js
Markdown({
  headEnabled: true, // 允许操作html head,需要@unhead
  // 这是Markdown渲染时候的wrapper组件
  wrapperComponent: id => 'WrapperPost',
  // 这是渲染Markdown时候外层容器的class
  wrapperClasses: (id, code) => code.includes('@.layout-full-width')
    ? ''
    : 'prose m-auto',
    async markdownItSetup(md) {
      // 这是antfu的shiki代码高亮库
      const shiki = await getHighlighter({
        themes: ['vitesse-dark', 'vitesse-light'],
        langs: Object.keys(bundledLanguages),
      })

      md.use((markdown) => {
        // 代码高亮的设置
        markdown.options.highlight = (code, lang) => {
          return shiki.codeToHtml(code, {
            lang,
            themes: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
            cssVariablePrefix: '--s-',
          })
        }
      })

      // anchor 锚点, 让标题成为锚链接
      md.use(anchor, {
        slugify, // 
        permalink: anchor.permalink.linkInsideHeader({
          symbol: '#',
          renderAttrs: () => ({ 'aria-hidden': 'true' }),
        }),
      })
    },
}),
```

## Page

还有一个关键的就是路由了, 写了一个MD文件的文章，如何自动生成一个路由呢？然后在博客网站中可以访问，我用的是 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) ，他的作用就是根据文件系统自动生成路由(Vue3, React, Solid).

配置如下:

```js
// vite.config.js
import Pages from 'vite-plugin-pages'
export default defineConfig({
    plugins: [
        Pages({
            dirs: 'pages', // 需要自动生成路由的文件夹
            extensions: ['vue', 'md'], // 扩展,需要的有效文件的扩展名数组
            extendRoute(route) { // 扩展路由,对路由自定义操作并返回修改后的
                // 里面的代码是遇到路由的组件的后缀名是md时,
                // 获取md文件的frontmatter并放入路由的metadata中
                // 这样的话vue组件内就可以useRoute来获取文章的frontmatter
                const path = 
                    resolve(__dirname, route.component.slice(1))

                if (path.endsWith('.md')) {
                  const md = fs.readFileSync(path, 'utf-8')
                  const { data } = matter(md)
                  route.meta = 
                    Object.assign(route.meta || {},
                        { frontmatter: data })
                }

                return route
            },
        })
    ],
    // ...
})
```

使用：

```js
// vue - main.js
import { createApp } from 'vue'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import routes from '~pages' // 这样就可以拿到自动生成的路由配置了
import App from './App.vue'
const router = createRouter({ // 通过vue-router根据路由配置生成路由器
  history: createWebHistory(),
  routes,
})
const app = createApp(App)
app.use(router) // app使用router
```

## Title

现在有了文章，有了路由。还有一个问题就是：进入了文章页面的路由之后，页面的title还是默认的title, 如何根据文章的frontmatter.title来修改页面的title呢？

这时候就需要@unhead登场了，配合unplugin-vue-markdown使用。

首先是允许unplugin-vue-markdown修改 HTML head:

```js
// vite.config.js
  Markdown({
    headEnable: true, // 这个选项就是允许修改HTML head了
  })
```

第二步：在main.js中引入@unhead

```js
// vue - main.js
import { createHead } from '@unhead/vue'
const head = createHead()
app.use(head)
```

这样就可以通过打开的md的frontmatter.title同步到页面的title中了。

## Link

因为在markdown中，超链接都是在当前页面中打开，那如果想让超链接打开的方式是新标签页的话就需要   `markdown-it-link-attributes` 了

使用：

```js
// vite.config.js
  Markdown({
    async markdownItSetup(md) {
      md.use(
        LinkAttributes, 
        {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        }
      )
    }
  })
```

它的作用就是将你的 `[x](y)` Markdown超链接写法变成

```html
<a href='x' target='_blank' rel='noopener'>y</a>
```

# UnoCSS

超快 按需 原子 CSS引擎

> [GitHub·UnoCSS](https://github.com/unocss/unocss)

## 安装

### 包管理工具

```shell
npm: npm install -D unocss
yarn: yarn add -D unocss
pnpm: pnpm add -D unocss
```

### vite

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'

export default {
    plugins: [
        UnoCSS({ /* options */ })
    ]
}
```

将`uno.css`添加至 main entry:

```typescript
// main.ts
import 'uno.css'
```

## 预设 presets

预设就是提前设置好的规则`presets`

### 官方预设

- `@unocss/preset-uno` - 默认预设 (等效于`@unocss/presets-wind`)
- `@unocss/preset-wind` - 相当于 tailwind 和 windi 的超集
- `@unocss/preset-attributify` - 可以直接在元素上使用属性来设置样式`attribute`
- `@unocss/preset-icons` - 通过class使用各种图标库

### vite中使用预设

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'

export default {
    plugins: [
        UnoCSS({
            presets: [
                presetsAttributify(),
                presetUno(),
                // ...custom presets
            ],
        }),
    ],
}
```

::: warning
设置`presets`后，会直接覆盖掉默认设（默认presets将失效），所以**必须**将所有需要的`presets`都写进去，否则只生效设置的。
:::

## 自定义规则 rules
可以定义专属于自己的工具类`class`

### 静态规则

```typescript
rules: [
    ['m-1', { margin: '0.25rem' }],
]
```

每当使用`.m-1` `m-1 (preset/attributify)`的时候，都会自动生成以下CSS: 

```css
.m-1 { margin: 0.25rem }
```

### 动态规则
使用动态规则可以使其更智能
需要将匹配器更改为正则表达式，主题更改为函数：

```typescript
rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```
函数的第一个参数是匹配结果，可以解构来获取匹配的组。
例如：

```html
<div class='m-100'>
    <button class='m-3'>
        <icon class='p-5' />
        My Button
    </button>
</div>
```

以上代码将生成相应的CSS:

```css
.m-100 { margin: 25rem }
.m-3 { margin: 0.75rem }
.p-5 { padding: 1.25rem }
```

## presets/icons

使用纯CSS来使用图标

这是图标的预设，可以使用 [iconify](https://iconify.design/) 图标库的所有图标。

通过 [Icônes](https://icones.js.org/) 了解所有可用的图标包/集合

### 安装

如果项目中已经有unocss, 那么只需要下载相应所需的图标包就可以：

```shell
npm i -D @iconify-json/[the-collection-you-want]
# 例： 需要Material Design Icons
npm i -D @iconify-json/mdi
```

如果不需要完整的unocss，只需presets/icon：

```shell
npm i -D @unocss/preset-icons @iconify-json/[the-collection-you-want]
```

如果您希望一次安装 Iconify 上可用的所有图标集 （~130MB）：

```shell
npm i -D @iconify/json
```
#### 装载

``` typescript
import presetIcons from '@unocss/preset-icons'

UnoCSS({
    presets: [
        presetIcons({ /* options... */ })
    ]
})
```

:::tip
可以单独使用这个预设，作为现有项目的补充。
:::

### 使用

遵循约定：
- `<prefix><collection>-<icon>`

举例：
```html
<!-- A basic anchor icon from Phosphor icons -->
<div class="i-ph-anchor-simple-thin" />
<!-- An orange alarm from Material Design Icons -->
<div class="i-mdi-alarm text-orange-400" />
<!-- A large Vue logo -->
<div class="i-logos-vue text-3xl" />
<!-- Sun in light mode, Moon in dark mode, from Carbon -->
<button class="i-carbon-sun dark:i-carbon-moon" />
```

> 参考: [@unocss/reset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons)

## 变体 Variants

- **dark**

    设置 dark 暗黑模式下的样式

    在以下代码出现时生效：

    ``` html
    <html class="dark">
        <!-- ... -->
    </html>
    ```

    or

    ``` css
    @media (prefers-color-scheme: dark) { /* ... */ }
    ```

    例子：

    ``` html
    <p text="gray-600 dark:light-600" >varients-dark</p>
    ```

    其中的`text="dark:light-600"`将生成如下css:
    ``` css
    .dark .dark\:gray-600, .dark [text="dark\:light-600"] {
        --un-text-opacity: 1;
        color: rgba(75, 85, 99, var(--un-text-opacity));
    }
    ```

- **hover**

    设置hover伪类的样式

    例：

    ``` html
    <p hover:text-blue-300>varients-hover</p>
    ```

- **lt / at**

    `windi css` 中可以使用变体：`<sm:p-1`，用以生成如下断点css:

    ``` css
    @media screen and (max-width: 640px) { /* ... */ }
    ```

    `unocss` 中有所不同，改变如下：

    `lt` = `<`

    `at` = `@`

    :::tip
    默认断点为 `min-width` - 最小宽度，这是 `mobile first 移动优先`

    `windi css` 中使用 `<sm` 可以使用 `max-width` 断点 - 最大宽度
    :::

## 断点 breakpoint (varient)

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### 使用

``` html
<section xl:max-w-1280px> ... </section>
```

上面代码中 `xl:max-w-1280px` 将生成如下CSS:

``` css
@media screen and (min-width: 1280px) {
    [xl\:max-w-100] {
        max-width: 100px;
    }
}

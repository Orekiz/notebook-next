# Array原型方法

## map()

`map()`方法创建一个新数组，这个新数组是由原数组的每一项都调用一次提供的函数后的返回值组成。

```js
const arr = [1, 2, 3]
const arrMap = arr.map(item => {
  return item + 10
})

console.log(arrMap) // [11, 12, 13]
```
::: tip
`map()`方法会创建一个新的数组，所以之前的数组不会受到影响, 需要声明一个新变量来接收新数组。
:::

## filter()

filter 意为过滤，可以实现提取数组中需要的元素。

`filter()`方法创建给定数组一部分的浅拷贝，其包含回调函数过滤后的元素。

```js
const arr = [1, 2, 3]
const result = arr.filter(item => {
  return item >= 2
})

console.log(result) // [2, 3]
```

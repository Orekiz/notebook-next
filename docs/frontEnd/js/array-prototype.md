# Array原型方法

## shift()

`shift()` 方法删除数组第一个元素，并返回该元素的值。

```js
const arr = [1, 2, 3]
const lastItem = arr.shift()

console.log(lastItem) // 3
console.log(arr) // [1, 2]
```

:::warning
该方法会改动原数组，如果原数组有用请谨慎使用！
:::

## pop()

`pop()` 方法删除数组最后一个元素，并返回该元素的值。


```js
const arr = [1, 2, 3]
const firstItem = arr.pop()

console.log(firstItem) // 1
console.log(arr) // [2, 3]
```

:::warning
该方法会改动原数组，如果原数组有用请谨慎使用！
:::

## slice()

slice: 切片

`slice()` 方法返回原数组切片后的新数组( 浅拷贝 ), [begin, end)  原始数组不会被改变。

```js
const arr = [1, 2, 3]
const newArr = arr.slice(2, 4)

console.log(newArr) // [2, 3]
```

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

## forEach()

强行遍历数组的全部元素


```js
const arr = [1, 2, 3]
arr.forEach(item => {
  console.log(item) // 1 2 3
})
```

::: warning
无法被break continue打断
:::

# Array原型方法

### 根据用法快速检索

**会改变原数组**
- 删除第一个元素 [shift](#shift)
- 删除最后一个 [pop](#pop)
- 删除指定位置长度的元素们，可设置替换元素 [splice](#splice)
- 排序 [sort](#sort)

**返回新数组**
- 切片 [slice](#slice)
- 过滤 [filter](#filter)
- 处理每个元素 [map](#map)
- splice的非修改方法 [toSpliced](#tospliced)
- sort的非修改方法 [toSorted](#tosorted)

**其他**
- 完整遍历整个数组 [forEach](#foreach)
- 可以负数下标访问元素的方法 [at](#at)


## at()

> ES2022

`at()` 方法接收一个索引值（整数，支持负数），返回数组中对应位置的元素。

```js
const arr = [1, 2, 3]
const item = arr.at(-1)

console.log(item) // 3
```

:::tip
`at()` 方法可以接收负数索引，负数索引表示从数组末尾开始计算位置，例如 `-1` 表示最后一个元素，`-2` 表示倒数第二个元素，以此类推。
:::

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
const lastItem = arr.pop()

console.log(lastItem) // 3
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

## splice()

`splice()` 方法通过删除现有元素和/或添加新元素来更改一个数组的内容。

```js
const arr = [1, 2, 3]
arr.splice(1, 1, 4)

console.log(arr) // [1, 4, 3]
```

:::tip
第一个参数为开始位置，第二个参数为删除的个数，第三个参数为插入的元素
:::
:::warning
该方法会改动原数组，如果原数组有用请谨慎使用！
:::

## toSpliced()

> ES2023

[splice](#splice) 方法的非修改原数组方法

`toSpliced()` 方法返回一个新数组，该数组包含原数组中从开始到结束（不包括结束）的元素，并替换指定位置的元素。

```js
const arr = [1, 2, 3]
const newArr = arr.toSpliced(1, 1, 4)

console.log(newArr) // [1, 4, 3]
```
:::tip
第一个参数为开始位置，第二个参数为删除的个数，第三个参数为插入的元素
:::

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
:::warning
**注意：回调函数需要 `return` !!**
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

:::warning
**注意：回调函数需要 `return` !!**
:::


## sort()

`sort()` 方法[原地](//zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)对数组的元素进行排序，并返回数组。会修改原数组。

1. 无参

默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的。

```js
const arr = [1, 20, 3, 100]
arr.sort()
// [1, 100, 20, 3]
```

默认的排序会按照 `Unicode` 来排序，所以 100 在 20 之前。

2. 有参

`sort(compareFn)`

可以提供 `compareFn` 回调函数。返回值应是一个数字，其符号表示两个元素的相对顺序：如果 a 小于 b（顺序），返回值为负数，如果 a 大于 b（逆序），返回值为正数，如果两个元素相等，返回值为 0。NaN 被视为 0。该函数传入以下参数调用：

- a: 第一个比较的参数
- b: 第二个比较的参数

```js
const arr = [1, 20, 3, 100]
arr.sort((a, b) => (a - b)) // [1, 3, 20, 100]
arr.sort((a, b) => (b - a)) // [100, 20, 3, 1]
```

:::warning
**注意：回调函数需要 `return` !!**
:::


## toSorted()

> ES2023

[sort()](#sort)方法的非修改原数组方法。

使用方法同 `sort()` 。

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

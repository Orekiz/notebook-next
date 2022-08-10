# let和const

ECMAScipt2015(ES6) 新增了两个重要的关键字：`let`和`const`。

## let

### 基本用法

es6新增了`let`命令，用来声明变量。不同于`var`，只在当前代码块中生效。

```js
{
  var a = 'var'
  let b = 'let'
}

a // 'var'
b // ReferenceError: b is not defined.
```

### 特点

#### 不存在变量提升

`var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined`。这不符合逻辑。
为了纠正这种现象，`let`命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

```js
// var
console.log(foo) // undefined

// let
console.log(bar) // 报错ReferenceError
```

#### 暂时性死区

只要块级作用域中存在`let`命令，它声明的变量就会“绑定”在这个区域，不会受到外部的影响。

```js
var temp = 123

if (true) {
  temp = 'abc' // ReferenceError
  let temp
}
```

上面的代码中，存在全局变量`temp`，但是块级作用域中使用`let`命令声明了一个局部变量`temp`，所以后者绑定在了该作用域中，所以在声明之前使用（赋值）会报错。

> ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

#### 不允许重复声明
`let`命令不允许在相同作用域中，重复声明同一个变量。

## const

### 基本用法

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415
PI // 3.1415

PI = 3 // TypeError: Assignment to constant variable.
```

上面代码表示改变常量的值会报错。
不仅如此，const定义的变量必须当场给出初始值，否则会报错。

```js
const PI
// SyntaxError: Missing initializer in const declaration
```

上面代码表示，对于`const`如果只声明不赋值就会报错。

## let const 相同点

- `let`和`const`都只在声明所在的代码块级作用域中生效。
- 都存在暂时性死区，没有变量提升。只能在声明后使用。
- 都不可重复声明。

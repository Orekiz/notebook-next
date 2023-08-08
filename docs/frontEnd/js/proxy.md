# Proxy

## 1. 概述

Proxy，中文名叫代理，是ES6新增的一个特性。

Proxy用于修改某些操作的默认行为，可以理解成，拦截器。在目标对象之前架设一层“拦截”，外界对于该对象的访问或者操作都要经过这层拦截，因此提供一种机制，可以对外界的访问进行过滤和改写。

```js
const obj = new Proxy({}, {
  get: function (target, property, receiver) {
    console.log(`getting ${property}`)
    return Reflect.get(target, property, receiver)
  }
  set: function (target, property, value, receiver) {
    console.log(`setting ${property}`)
    return Reflect.set(target, property, value, receiver)
  }
})
```

上面的代码对一个空对象进行代理，架设一层拦截，重新定义了属性的读(`get`)和属性的写(`set`)行为。如果外界对该设置了拦截行为的对象`obj`进行读写他的属性，就会得到下面的结果。

其中的`Reflect`是ES6新增的对象，中文名`反射`，他的作用是让开发者通过调用函数的方式来实现JS的底层的默认行为。

```js
obj.count = 0
// setting count
++obj.count
// getting count
// setting count
// 1
```

ES6原生提供Proxy构造函数，用来生成Proxy实例。

```js
const proxy = new Proxy(target, handler)
```

上面的代码声明一个名为proxy的对象，赋值为实例化的`Proxy`对象。
其中，`new Proxy()`表示生成一个`Proxy`实例，`Proxy`接受两个参数，第一个参数`target`表示所要架设拦截的目标对象，第二个参数`handler`也是一个对象，用来定制拦截的具体行为操作。

下面是一个拦截读(`get`)属性行为的例子：

```js
const obj = new Proxy({}, {
  get: function (target, property, receiver) {
    return 20
  }
})

obj.count // 20
obj.age // 20
```

上面的例子总是得到`20`的结果。因为在拦截器中，读行为的返回被写死成了`20`，所以不管读取obj对象的什么属性，都会返回`20`的结果。

如果Proxy的第二个参数没有设置任何拦截行为，则是通向源对象，直接操作源对象。

```js
const target = {}
const handler = {}
const proxy = new Proxy(target, handler)

proxy.a = 'b'

proxy.a // b
```

上面的代码例子中，`handler`没有设置任何拦截行为，所以访问`proxy`就等同于访问原对象`target`。

### 下面是 Proxy 支持的拦截操作一览：

- **get(target, property, receiver)**: 拦截对象属性的读取，比如`proxy.foo`或者`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc)`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。

## 2. Proxy 实例的方法

### 2.1 get()

`get`方法用于拦截对于属性的读取行为，可以接受三个参数，依次为目标对象，属性名和 Proxy 实例本身（严格来说，是操作行为所针对的对象），其中最后一个参数可选。

```js
const person = {
  name: '法外狂徒张三'
}

const personProxy = new Proxy(person, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else {
      return new ReferenceError(`Prop name '${property}' does not exist.`)
    }
  }
})

personProxy.name // "法外狂徒张三"
personProxy.age // 抛出错误 ReferenceError: Prop name 'age' does not exist.
```

上面的代码例子表示，如果访问目标对象中不存在的属性，则会抛出一个错误。如果没有架设该拦截器，则会是原生的方法，返回`undefined`。

## Summary

`Proxy`就像一个拦截器一样，外界对于目标对象的访问都需要经过这个拦截器。

`Proxy`接受两个参数：

1. target: 需要架设拦截器的目标对象
2. handler: 自定义拦截的行为

用法：

```js
const proxy = new Proxy(target, handler)
```

### 数组的拦截

数组也是对象(`Object`)，所以数组一样可以拦截。

```js
const arr = [1, 2, 3]

const myArr = new Proxy(arr, {
  get: function (target, property, receiver) {
    // ...
  }
  set: function (target, property, value, receiver) {
    // ...
  }
})
```

上面是对数组的拦截的例子。

需要注意的是，数组不同于普通对象，数组还有自带的`length`属性。JS默认的`set`行为会触发两次`set`拦截器，通过打印可以得知，第一次set是存入数据，第二次set是改变length属性。

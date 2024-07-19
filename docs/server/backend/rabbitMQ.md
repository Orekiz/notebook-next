# RabbitMQ

消息队列服务RabbitMQ笔记

## Node.js

### 安装

RabbitMQ是AMQP协议的实现者，所以可以直接使用amqp协议的客户端。

安装amqp node客户端：

```bash
npm install amqplib
```

### 普通的工作队列

**竞争消费模式**

所有的消费者共享一个队列，消息队列服务会自动分发消息给空闲的消费者。

#### 实例代码：

**producer 生产者：**

```js
import amqplib from 'amqplib'
// 建立连接
const connection = await amqplib.connect('amqp://user:pass@<ip>:<port>')
// 创建频道
const channel = await connection.createChannel()
// 设置队列名
const queueName = 'my_queue'
// 声明一个队列供我们传输用
// 选项durable是持久化
channel.assertQueue(queueName, { durable: false })
// 消息二进制传输
channel.sendToQueue(queueName, Buffer.from('Hello World!'))
```

**consumer 消费者：**

```js
import amqplib from 'amqplib'
// 建立连接
const connection = await amqplib.connect('amqp://user:pass@<ip>:<port>')
// 创建频道
const channel = await connection.createChannel()
// 设置队列名
const queueName = 'my_queue'
// 声明要使用的队列, 消费者消费前声明队列是为了保证队列存在
await channel.assertQueue(queueName, { durable: false })
console.log(' [*] Waiting for messages in %s.', queueName)
channel.consume(queueName, (msg) => {
  console.log(' [x] Received %s', msg.content.toString())
  // 手动确认
  // channel.ack(msg)
}, { noAck: true })
// noAck配置为true代表在消息处理完后会自动确认消息。
```

### 发布订阅

RabbitMQ中消息传递模型是生产者通过交换机去推送消息，生产者甚至可以不知道具体推送到哪个消息队列了，只需要推送到指定的交换机，提供一个路由键，让交换机去通过路由键来推送到消息队列。（类似于路由表）

publisher -> exchange -bind-> queue <- consumer

消息队列要接受消息，需要绑定到交换机上，提供一个路由键，让交换机知道怎么联系到这个消息队列。一个路由键可以绑定多个消息队列，同一个路由键的消息队列平等的收到交换机推送来的消息。

交换机会平等的推送路由键对应的消息队列中。这就可以一对多了。

交换机一共有四个模式：

- direct：路由键完全匹配
- fanout：路由键忽略，直接推送到所有绑定的消息队列
- topic：路由键模糊匹配
- headers：忽略路由键，根据消息的headers属性匹配

**示例代码**

**producer 生产者**

```js
import amqplib from 'amqplib'

// 连接rabbitmq服务
const connection = await amqplib.connect('amqp://user:pass@<ip>:<port>')
// 创建频道
const channel = await connection.createChannel()

const exchangeName = 'my_test_exchange'

// 声明交换机exchange, 没有就创建，有就无事发生
/**
 * @param exchange 交换机名称
 * @param type 交换机类型
 * * direct: 定向
 * * fanout: 扇形（广播）
 * * topic: 主题
 * * headers: 头交换机
 * @param options 交换机选项
 * * durable: 是否持久化
 * * autoDelete: 是否自动删除
 */
await channel.assertExchange(exchangeName, 'direct', {
  durable:false
})

// publish 发布
/**
 * @param exchange 交换机名称
 * @param routingKey 路由键
 * @param content 消息内容
 * @param options 消息选项
 * * persistent: 是否持久化
 * * expiration: 消息过期时间
 * * contentType: 消息类型
 * * contentEncoding: 消息编码
 * * headers: 消息头 (适用于headers交换机模式)
 * * deliveryMode: 消息投递模式
 * * priority: 消息优先级
 * * correlationId: 消息关联ID
 * * replyTo: 消息回复队列
 * * expiration: 消息过期时间
 * * messageId: 消息ID
 * * timestamp: 消息时间戳
 */
channel.publish(exchangeName, 'key', Buffer.from('Hello Exchange!mode direct'))

// 自动断开连接和退出进程
setTimeout(async () => {
  // 先断开频道再断开连接
  await channel.close()
  await connection.close()
  process.exit(0)
}, 500);
```

**consumer 消费者**

```js
import amqplib from 'amqplib'

// 连接rabbitmq服务
const connection = await amqplib.connect('amqp://user:pass@<ip>:<port>')
// 创建频道
const channel = await connection.createChannel()

console.log('waiting for messages...')

const exchangeName = 'my_test_exchange'
const queueName = 'my_test_queue_1'

// 声明交换机 避免交换机不存在
await channel.assertExchange(exchangeName, 'direct', {
  durable: false
})

// 声明队列
// exclusive选项:当exclusive为true时,队列仅对声明它的连接可见,并且在连接断开时自动删除
await channel.assertQueue(queueName, {
  exclusive: true
})

// 将队列接入交换机（交换机绑定队列）方法来源于channel
// 需要 队列名称 交换机名称 路由匹配的key{routingKey}
// routingKey的作用就是让交换机知道消息应该发送到哪些个队列,一个key可以绑定多个队列
await channel.bindQueue(queueName, exchangeName, 'key')

// 消费消息
channel.consume(queueName, (msg) => {
  console.log('[x] consume received:', msg?.content.toString())
}, {
  noAck: true
})
```

# RabbitMQ

## Node.js

### 安装

RabbitMQ是AMQP协议的实现者，所以可以直接使用amqp协议的客户端。

安装amqp node客户端：

```bash
npm install amqplib
```

### 普通的工作队列

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

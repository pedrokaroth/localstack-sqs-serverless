'use strict'

const { sqs } = require('./factory')

module.exports.receiveMessage = async (event) => {
  console.log(event)
  return { statusCode: 200, body: JSON.stringify(event) }
}

module.exports.sendMessage = async () => {
  return await sqs.sendMessage({
    QueueUrl: 'http://localhost:4566/000000000000/queue',
    MessageBody: JSON.stringify({ 123: 456 })
  }).promise()
}

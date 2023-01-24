const AWS = require('aws-sdk')

AWS.config.update({
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
})

const sqs = new AWS.SQS({ endpoint: 'http://localhost:4566' })

module.exports = {
  sqs
}

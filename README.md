<!--
title: 'AWS NodeJS Example'
description: 'This template demonstrates how to deploy a NodeJS function running on AWS Lambda using the traditional Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->


# Localstack SQS consumer serverless

This project showcases the utilization of Localstack's SQS (Simple Queue Service) in a local stage environment. The SQS service of Localstack, enables the creation and management of message queues, providing the ability to simulate the functionality of the corresponding AWS SQS service in a local environment. This allows for the development and testing of applications utilizing SQS without incurring any costs or requiring a live connection to the AWS cloud.

## Usage

### localstack

To start localstack run the following command

```
$ npm run localstack
```

After running this, you should see output similar to:

```bash
Waiting for all LocalStack services to be ready
2023-01-24 00:20:10,957 CRIT Supervisor is running as root.  Privileges were not dropped because no user is specified in the config file.  If you intend to run as root, you can set user=root in the config file to avoid this message.
2023-01-24 00:20:10,958 INFO supervisord started with pid 16
2023-01-24 00:20:11,960 INFO spawned: 'infra' with pid 21
2023-01-24 00:20:12,962 INFO success: infra entered RUNNING state, process has stayed up for > than 1 seconds (startsecs)

LocalStack version: 1.3.2.dev
LocalStack build date: 2023-01-20
LocalStack build git hash: d8a2f652

2023-01-24T00:20:14.290  WARN --- [-functhread3] hypercorn.error            : ASGI Framework Lifespan error, continuing without Lifespan support
2023-01-24T00:20:14.290  WARN --- [-functhread3] hypercorn.error            : ASGI Framework Lifespan error, continuing without Lifespan support
2023-01-24T00:20:14.291  INFO --- [-functhread3] hypercorn.error            : Running on https://0.0.0.0:4566 (CTRL + C to quit)
2023-01-24T00:20:14.291  INFO --- [-functhread3] hypercorn.error            : Running on https://0.0.0.0:4566 (CTRL + C to quit)
Ready.

```

### sqs

To create the queue of exemple run the following command

```
$ awslocal sqs create-queue --queue-name queue
```

After running this, you should see output similar to:

```json
{
    "QueueUrl": "http://localhost:4566/000000000000/queue"
}
```

### deploy
To deploy the lambda functions to the localstack run 

```
sls deploy --stage local
```

After successful deployment, you can invoke the deployed function by using the following command:

```bash
Using serverless-localstack

Deploying localstack to stage local (us-east-1)
Skipping template validation: Unsupported in Localstack

✔ Service deployed to stack localstack-local (15s)

functions:
  receive: localstack-local-receive (14 MB)
  send: localstack-local-send (14 MB)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
npm run message
```

Which should result in response similar to the following:

```bash

> localstack@1.0.0 message
> sls invoke -f send --stage local

Using serverless-localstack
{
    "MD5OfMessageBody": "6dc6c8fee18acd1d88e4bde12101c72d",
    "MessageId": "850187ed-dabc-42e6-8bc0-c6e3e62312ff",
    "ResponseMetadata": {
        "RequestId": "EAG0GU86Q354NWNBPMHABY0H3ONNXCIYW80UZCHB4QRN9MK1B01V"
    }
}

```

### Logs of receive function

You can see the logs of receive function running

```bash
sls logs -f receive --stage local --startTime 1h
```

Which should result in response similar to the following:

```bash
Using serverless-localstack
START f692f8d7-6a26-47b1-8cf4-d44e8fea894d: Lambda arn:aws:lambda:us-east-1:000000000000:function:localstack-local-receive started via "local" executor ...
{
  Records: [
    {
      body: '{"123":456}',
      receiptHandle: 'Y2YzNDhmZDgtY2MzNy00MzgzLTgzYjgtMzE4YzhmODc1MmFkIGFybjphd3M6c3FzOnVzLWVhc3QtMTowMDAwMDAwMDAwMDA6cXVldWUgODUwMTg3ZWQtZGFiYy00MmU2LThiYzAtYzZlM2U2MjMxMmZmIDE2NzQ1MjAxMDIuNTc0MDMx',
      md5OfBody: '6dc6c8fee18acd1d88e4bde12101c72d',
      eventSourceARN: 'arn:aws:sqs:us-east-1:000000000000:queue',
      eventSource: 'aws:sqs',
      awsRegion: 'us-east-1',
      messageId: '850187ed-dabc-42e6-8bc0-c6e3e62312ff',
      attributes: [Object],
      messageAttributes: {}
    }
  ]
}
REPORT RequestId: f692f8d7-6a26-47b1-8cf4-d44e8fea894d Duration: 198000 ms
```

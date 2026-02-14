# The inspiration

While I was talking with my girlfriend, I was impressed by how fast tickets for a K-pop celebrity can sell out - 2 to 3 minutes and that's it! It made me wonder: what kind of system can handle millions of requests in just 2 or 3 minutes without crashing? This is where SQS and SNS help. Not only do ticketing platforms use this architecture, but high-traffic websites such as Amazon, eBay, and Temu also rely on similar designs. This week, I focus on a ticketing system to see how it works (it's quite similar to e-commerce platforms).

*Note: This week's content is supported by knowledge from Gemini.*

# Synchronous vs asynchronous systems

## Synchronous

Before decoupling, the application had to handle requests by calling each service one by one.

![Synchronous System](/sync.png)

Whenever a customer places a ticket order, the `Order Service` handles the request by running each step in sequence. First, it calls `Payment` and waits for the response, then calls `Seat Locking` and waits again, and finally reaches the `Email` service so the customer receives a confirmation email. This system works fine until an unexpected spike of traffic hits the application - like when a G-Dragon show opens for sale. Here, the problem becomes clearer. The ticket market is a tough environment where everyone competes for a chance to see their favorite artist. With extremely high traffic, the whole system cannot afford to wait for every small service to finish its task. Even worse, if a request is complicated or a small error occurs, the ticket booking system can go down and customer dissatisfaction increases.

## Asynchronous

![Asynchronous System](/async.png)

This type of system is a saver for high-traffic websites like ticketing platforms. The benefit of this design is that the whole system does not need to wait for a single service. Each service takes the time it needs to process the request while millions of users can see a success message immediately. When customers send requests at once, the system checks Redis to see if the booking is valid. Redis acts as a cache that receives millions of requests and checks booking validity before sending the message to an SNS topic. This topic then pushes the message to its subscribers, which are SQS queues. The requests stay there and wait until a server is idle and pulls the message to process its logic. Each service works independently and doesn't know about the others, so users can receive the email even if their card has not been charged yet. This explains why sometimes you see that your booking is successful but you don't see any change in your bank account. I was surprised by how effective this system is at handling millions of requests without crashing. Last but not least, DynamoDB is set up to ensure idempotency across the system, which I explain further in the upcoming section.


# Explanation of architecture

## Redis

![Redis](/redis.png)

There will be multiple Redis shards working at the same time to serve spike traffic. To divide the workload evenly between shards, I apply `Deterministic Hashing` to the seat number, which assigns each shard a specific range of seats. When a customer books a specific seat, their request is handled by the assigned shard for that range. This setup avoids two people booking the same seat while their requests fall into different shards. One question is: if two people book the same seat but person A's request is faster by milliseconds, could it bypass the cache check? Fortunately, Redis handles this well. Redis is single-threaded, so it queues requests and processes them one by one. Therefore, even milliseconds matter. Every seat hash stays in Redis for 10 minutes to check subsequent requests, ensuring that no seat is taken by more than one person. When the request's seat hash does not match any record in the current shard, it is passed to the SNS topic.

## SNS

This service's task is simple in this architecture: pushing messages to all the SQS queues that subscribe to the topic.

## SQS 

When messages reach SQS, they stay there and wait for an idle server to pull them for processing. Everything works smoothly until a bad request gets into the queue and a server cannot handle it. In this case, a dead-letter queue (DLQ) is a good solution to help the server avoid continuous attempts that will inevitably fail.

![Dead-letter Queue](/dlq.png)

To ensure that a request is truly "poisoned," we should set a minimum number of retries before it is moved to the DLQ. Messages in the DLQ must be handled manually by developers, and when they are resolved, developers can redrive them back to the normal queue for the system to continue processing.

## DynamoDB

![DynamoDB](/db.png)

For each service, there are multiple machines in a distributed system, which means several workers process requests at the same time. The problem with SQS is the `visibility timeout`, which can make the system misbehave. Visibility timeout is the amount of time that SQS hides a message already pulled by a worker. If a server (server A) does not send a delete request on success to that SQS queue, the queue assumes that server failed and makes the message visible to other servers. When another server (server B) sees that message, it pulls and processes the request. This is not a problem if server A actually failed, but sometimes it just needs more time to handle a complicated message. Consequently, an action can happen twice - users can be charged twice, seats can be double-booked, or two emails can be sent. Therefore, DynamoDB acts as a coordinator in this case. Whenever a message is pulled for the first time, the server immediately writes the request details to DynamoDB, including `id`, `status`, etc. Even if the message becomes visible again and another server pulls it, that server checks DynamoDB to see if the request was already processed. As a result, this setup ensures idempotency in the system design and avoids duplication.

# Final thoughts

This week's topic is primarily about the "fan-out" system design using SNS + SQS and how this architecture can help high-traffic websites like ticketing systems handle millions of requests at the same time. I am pursuing a career as a Software Engineer | DevOps Engineer, and I will keep posting my learning journey about AWS content. If anything in this post is unclear or incorrect, or if you just want to chat, please don't hesitate to connect and find my contact at this [link](https://karl-sue.github.io/contact).

# Next topic

I'm afraid this post can be too theoretical in some ways without evidence of an actual system working. Luckily, I found a repo that allows us to design the system locally while deploying it globally through AWS. Therefore, I'm thinking of making a video next week to show how I set up this architecture.

Thank you for your time, and I will see you in the next post.
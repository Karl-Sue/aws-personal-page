# The inspiration

After last week's topic, I have been so excited to build a system to see how different services work together, creating a reliable, scalable and secure application serving unexpected traffic. As far as I know, designing architecture and writing CloudFormation code is necessary to automate the process of setting up all the services, saving time and avoiding human error. This week, I drew the whole architecture using [draw.io](#https://app.diagrams.net/) - a free tool allows us to visualize our system, and shared the example CloudFormation `build.yml` on my [GitHub](https://github.com/Karl-Sue/AWS-architecture) for anyone interested in prototyping their products. 

*Note: The project this week is supported with the use of Gemini*

# The architecture

![AWS System Architecture Diagram](/AWS_deployment.png)

## Register your app domain name

In the current market, we can register a domain name with AWS through Route53 or GoDaddy, and use Route53 to manage DNS service. In my architecture, I will assume my app register a domain name myapp.com and manage DNS records through Route53 (**Note: this will cost money**). There are 2 records in Route53:
- `myapp.com`: route users to CloudFront
- `api.myapp.com`: route users to backend server (Application Load Balancer)

## Frontend 

An S3 bucket is set up to host the Single Page Application (SPA), which is covered with CloudFront with origin access control (OAC) enabled. This setup prevents unauthenticated requests directly to the bucket without going through CloudFront. I chose OAC over origin access identity (OAI) because OAC supports server-side encryption with AWS KMS (SSE-KMS), dynamic requests (PUT and DELETE) to S3, and all S3 buckets in all AWS Regions, including opt-in Regions launched after Dec 2022. More details how to migrate from OAI to OAC [here](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html#migrate-from-oai-to-oac).

**Workflow:**

When users access `myapp.com`, Route53 will direct them to CloudFront where it communicates with S3 and return SPA and other static content to users.

## Backend

### Virtual Private Cloud

This is the private internet environment of AWS, that allows service like EC2, ALB, etc. to securely live here. To route traffic to public internet, all traffic must pass Internet Gateway.

### Private Subnet
To ensure high availability, EC2 machines are set up across different Availability Zones (AZs) inside the Private Subnet. There will be Security Group to protect the machines as a Firewall that check which incoming traffic is allowed to enter. An Auto Scaling Group is set up to allow scaling the server according to the demand traffic. This service will use some metrics such as CPU Utilization, memory usage, network traffic or Application Load Balancer request counts. 

### Public Subnet

To allow EC2 to connect to public Internet from Private Subnet, there must be a NAT Gateway that lives in the Public Subnet and help EC2 connect to public internet. ALB also lives there so that it can receive request directly from the public internet before routing it to the backend server. To ensure a secure connection between Public and Private Subnet, Network ACL (NACL) is set up as a firewall at network level that protects the whole Private Subnet. One thing to remember is that NACL is stateless so when setting up this service, we must explicitly allow both inbound and outbound traffic. Meanwhile Security Group - the one protecting the machine (or ENI) specifically, is stateful, and only require ruling inbound traffic.

### VPC Endpoint

Developers usually setup CloudWatch to monitor the machine state and an S3 bucket to retrieve data or images. If we make these service communicate via public internet, it will boom our bill at the end of the month. The solution is to use VPC Endpoint:
- VPC Endpoint Interface - ENI for CloudWatch
- VPC Endpoint Gateway - S3 Endpoint Gateway for S3 bucket (the bucket is private). *Note: EC2 must have appropriate IAM Role to read the bucket.*

**Workflow:**

When users perform some actions that needs logic from the backend, the frontend app will communicate with backend via calling `api.myapp.com`. Notably, CORS must be enabled to allow communication between different origins. Then Route53 will handle the request and send it to backend server. The traffic will enter VPC via the Internet Gateway and get to the ALB, from here, ALB will route traffic to the machine in charge. The response later will go back to users via exactly the route it has been through.

# Some final thoughts

Today's topic primarily focuses on designing the system from my own knowledge and support from Gemini. I'm on my way to become a Software Engineer | DevOps so I will keep sharing my learning journey. If you find anything in this post is unclear, incorrect, or maybe you just want to chat with me, please don't hesitate to connect and find my contact at this [link](https://karl-sue.github.io/contact)

# Next topic

In my next post, I want to deep dive into how I can make my personal post page more functional with serverless setup (Lambda + DynamoDB).

Thank you for your time and I will see you in the next post.
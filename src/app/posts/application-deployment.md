# The inspiration 

This is a question that I have wondered for a period which starts from a talk with one of my connections. When talking about cloud - EC2 specifically, we discuss how an app can be deployed on AWS EC2, and from his experience, he told me companies usually deploy frontend + backend on 1 machine. This inspired me to dive deep into this topic, especially to know in which situation separation of concerns will work.

Note: The knowledge that I learn is primarily through the support of Gemini, if you think it is incorrect in any case, please help me correct my knowledge. Appreciate your time and help!

# Decision Matrix: 1 EC2 vs. Separate Machines

With the support of Gemini, I started to investigate how deployment works following the industry standard. There are two ways I can use:

- Everything on 1 machine: This approach will work just like how a developer would run their app on a local machine, after downloading compiler/interpreter and dependencies, the machine will run the application and users can access it at the public DNS provided by AWS.

- Separate Machines: This method requires the use of S3 + CDN (CloudFront) to deliver static content (Frontend) to users while keeping backend server separate on EC2

Understanding how each method works, let's see how each solution benefits business:

| Feature | 1 EC2 | Separate Machines |
|---------|-------|-------------------|
| **Best For** | Prototyping, Small internal tools, Low-budget MVP | Production apps, Scaling business, High-scale environments |
| **Scaling** | Vertical scaling: Must upgrade entire server even if only one component is slow | Horizontal scaling: Scale frontend and backend independently based on demand |
| **Cost** | Pay for a machine. Depends on what types of EC2 in use, the cost varies: consult AWS EC2 price [here](https://aws.amazon.com/ec2/pricing/)  | Cost for a machine + [S3](https://aws.amazon.com/s3/pricing/) + [CloudFront](https://aws.amazon.com/cloudfront/pricing/) |
| **Performance** | Slower for global users + Single geographic location | Faster globally + CDN edge locations worldwide |
| **Maintenance** | Simpler setup: One server to manage | More complex: Multiple services to configure and monitor |
| **Security** | Higher risk: if frontend is compromised, the attacker has local access to the backend | Better isolation - Your business logic is better secured in a Private Subnet |

Now let's dive into each consideration!

## 1. Best Use Cases

### a. 1 EC2 machines

After considering the information from both AWS documentation and its pricing, I think 1 EC2 is best used for small to medium companies to host their application - especially companies with fewer scaling concerns. Let's take an internal website as an example. Its main use is to serve the company's own needs, and the workload is manageable. 

### b. Separate Machines

On the other hand, medium to large companies that have unpredictable traffic or growth over time require a system that can horizontally scale. Moreover, I personally think separation of hosting frontend and backend allows the ability to maintain the system and upgrade it in the future. 

## 2. Scaling & Maintenance

### a. 1 EC2 machines

From my perspective, this approach does not necessarily need to be vertically scaled. With the use of Application Load Balancer (ALB), companies can add new servers with the support of Auto Scaling Group (ASG), and leave the routing to ALB. One problem with this is the time an app needs to serve users, which can cause excessive delay when more machines launch at once during peak season. Another problem I can think of is the loss of progress users made due to a change of machine. Let's say there are 2 machines (A and B), users might lose their progress if they perform an action on machine A then later connect to machine B, assuming they take a break and come back. A solution is to enable sticky sessions on ALB which allow routing to the same machine every time, avoiding loss of progress. However, this might cause the problem of hotspots (too much traffic routed to 1 machine).

Additional thought: This approach might be suitable for local use only, when internet delay + the startup of scaling machines might cause an extensive period of wait time. A plus for this method is a simpler maintenance process, when there is no need for service integration consideration.

### b. Separate Machines

In this approach, frontend and backend can be scaled separately. With CloudFront, global users will always get the traffic that is closest to them, which reduces the wait time significantly. Backend servers - hosted on EC2, on the other hand, can scale seamlessly with the help of ASG with reduced wait time. 

Additional thought regarding maintenance: Instead of fixing the whole app at once, frontend and backend teams can focus solely on their roles of maintaining each system seamlessly. However, a small config error can cause the app to fail, which complicates the maintenance process. For example, misconfigured CORS policies, which cause denial of receiving requests. 

## 3. Cost

### a. 1 EC2 machines

Let's assume companies use ASG and ALB to help split traffic. There's no cost for ASG, yet clients need to pay for the use of EC2 and ALB.

### b. Separate Machines

Meanwhile, this approach requires extra cost for CloudFront and S3 (possibly fees for API calls between services)

## 4. Performance

### a. 1 EC2 machines

To serve customers worldwide, companies need to deploy their servers in different regions, which might incur extra costs to have more EC2 machines. Without CloudFront, users will wait an extensive period if there's no server in the region. I consider the period when there is a boom in traffic and each machine must handle more than thousands of requests per second. In this situation, the server might struggle to distribute resources (RAM/CPUs) between both backend and frontend - especially if the backend needs to handle heavy logic, which can cause potential crashes of the whole server if there is a memory leak or error.

Some thoughts on this: with the consideration that adding a new server might take extensive time, I do not recommend this approach for latency-sensitive companies like financial organisations that need to pay attention to exchange rates or economic measures.

Note: Reverse Proxy - Nginx, is recommended when there is a possibility of port conflict.

### b. Separate Machines

Keeping the frontend separate on CloudFront allows users to connect worldwide with significantly low latency. It is not compulsory to set up a server close to a user as CloudFront can connect to the business logic (backend server) with reduced latency. A machine just needs to distribute its resources for backend logic while leaving the frontend handling to the CloudFront + S3 solution, avoiding unexpected crashes during boom traffic periods. 

## 5. Security

When using this method, I think developers should pay extra attention to security when both backend and frontend are hosted on the same EC2. I consulted a post on [Reddit](https://www.reddit.com/r/webdev/comments/nu867e/is_it_a_bad_idea_to_host_a_frontend_backend_and/) about VPS - a virtual machine like EC2 but a smaller "micro" version, and it seems like there is no severe security concern if we host frontend and backend on a machine. Therefore, I think for this particular feature, both approaches should have the same level of concern when designing a secured system.

# Some final thoughts

Depending on what the requirements are - finance, needs, definition of a satisfactory system, etc., we can decide which system is the most suitable for our organisations. I write this post to share my learning journey to become a great Software Engineer | DevOps. I will continue to post my thoughts and learning experiences on my site and LinkedIn to connect with more like-minded people and learn interesting knowledge from them. If you find anything in this post is unclear, incorrect, or maybe you just want to chat with me, please don't hesitate to connect and find my contact at this [link](https://karl-sue.github.io/contact)

# Next topic

I am planning to design a system that follows the second approach on AWS, I'm excited to get started.

Thank you for your time and I will see you in the next post.
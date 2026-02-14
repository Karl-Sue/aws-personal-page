# The inspiration

When I first thought about how to design my personal website to make it as functional as possible, I had an idea of making a logic function to keep track of how many people have read my post. However, I soon realized there was a huge problem with my initial tech stack and deployment platform. Specifically, GitHub Pages only allows me to host static content and cannot take the responsibility as a server. Therefore, I had a curiosity to see how I can deploy my app using serverless architecture including Lambda + DynamoDB.

*Note: The content this week is supported with the knowledge from Gemini*

# The initial architecture

## Motivation

To be honest, the main reason I chose GitHub instead of AWS is the cost. GitHub allows me to host my personal site for no cost at all. By setting up GitHub Actions, I can have my TypeScript app compiled and hosted within a minute (up to maybe 3 mins if the queue is long). Considering my app is not latency sensitive, the time waiting is acceptable. The second factor to consider is the scalability. As far as I know the maximum repository size is ~1GB, and for each 2000-word post, it will take another 15KB. My current directory is 119MB in size, so that means I can add up to approximately 60,000 posts - which I believe is impossible to reach. Of course, there will be images in the post so I will just assume at least 1,000 posts can be uploaded. 

## Explanation of architecture

The current application structure is organized as follows:

```
.github/
└── app/
    └── deploy.yml
public/
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── components/
│   ├── data/
│   ├── pages/
│   └── posts/
└── styles/
```

So whenever I add a new `.md` post to `src/app/posts` and push changes to GitHub, GitHub Actions will automatically run `deploy.yml` and recompile my app and make it live within a minute as we can see from the image below.

![Initial CI/CD Workflow](/images/initial.png)

The browser cannot show the TypeScript app directly, so it needs compiled `.js` file to serve it to users.

## Limitations 

However, GitHub Pages only serves static content while functionalities such as counting how many views are impossible. The only solution is that I need a backend server or a function to resolve that logic and help me store data like the number of views. That's when Lambda + DynamoDB architecture steps in.

# Refactoring my app

Because I want to achieve separation of concerns, I will only store the hosted app in an assumed bucket called `hosted-app-bucket`. To make that happen, I need to make a small rearrangement to my current directory. The new repository will look like this:

```
.github/
└── app/
    └── deploy.yml
public/
posts/
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── components/
│   ├── data/
│   ├── pages/
└── styles/
```

The `/posts/` is no longer inside `/src/app/`, but now it is put at the same level as `src` and `public` - where I keep the images. Now let's move to the architecture of my app before we see how my CI/CD pipeline works as compared to my GitHub Action.

## Explanation of architecture

When mentioning hosting static content that is accessible through the Internet, S3 and CloudFront are always the best choice. Furthermore, with Route53, I can register my own app domain name. The setup is similar to the content in *"Construct an AWS architecture for a scalable application"*, yet there is additional setup for CloudFront regarding cache behaviour. Here is the problem: if I access `/posts/{id}`, my app won't know which bucket I'm referring to. When the app fetches `/posts/{id}`, it will automatically find the post in the `posts/` directory in the same bucket. This will cause an error, because I have set up another bucket to keep posts and images. Therefore, for this week's architecture, I use the cache behavior of CloudFront to direct requests to the correct bucket:
- `/*`: Default behaviour → return the app in `hosted-app-bucket`
- `/posts/*` and `/images/*`: CloudFront will direct to `assets-bucket` where it stores images + posts

The only thing left that I need to do is to setup Lambda and DynamoDB. There are two ways to approach this architecture so I will deep dive into each method one by one.

### Method 1: API Gateway + Lambda + DynamoDB

![API Gateway + Lambda + DynamoDB](/images/method1.png)

When users access a post at `/posts/{id}`, my app will make a GET request to API Gateway to trigger a Lambda Function. This function will communicate with DynamoDB to retrieve the link of the image and post, and increment the count by 1. `image_URL` and `post_URL` are returned to the app, and it will ask CloudFront to communicate with the other bucket (`assets-bucket`) to retrieve the post and images using their path. This approach is less technical and easy to set up.

### Method 2: Lambda@Edge + DynamoDB

![Lambda@Edge + DynamoDB](/images/method2.png)

This architecture is slightly different from method 1 because now CloudFront will trigger Lambda Function when users access `/posts/{id}`. This function will have the similar logic as method 1, the only difference is the way we trigger this service. Through CloudFront, we can solve the issue of latency-sensitive app when the latency is significantly improved. 

### Add a new post

![Add Post Architecture](/images/post_upload.png)

In my current page, I don't have the functionality to add a new post directly on the app, but instead I add a file using a code editor and push changes to GitHub and running GitHub Actions. Now let's assume that my app now has the ability to add a new post directly from the app, I will have the link to `assets-bucket` and upload the content there. This action will trigger a Lambda Function to retrieve metadata of the images and post and write to DynamoDB as well as set count = 0. 

## CI/CD pipeline

![CI/CD ](/images/CICD.png)

Now, let's assume I want to update my code to make the app more functional or fix some bugs that I just found. Whenever I pushed changes to my repo, I need AWS services to handle the change for me or just simple the first time deployment. Now, I need 2 services which are CodeBuild and CodePipeline to help me build the `dist` directory that can be hosted on S3 automatically without my intervention. First, I need my GitHub connected with AWS so that the code push event can trigger CodeBuild. This service will pull the whole directory and execute actions in `buildspec.yml`, just like how GitHub Action compile TypeScript app to `.js` file that browser can understand. The result will include 3 directories namely `/dist`, `/images`, and `/posts`. To put the directories into the correct bucket, at the end of `buildspec.yml`, there must be these lines:

```YAML
- aws s3 sync ./posts s3://assets-bucket/posts
- aws s3 sync ./images s3://assets-bucket/images
- aws s3 sync ./dist s3://hosted-app-bucket/
```

With this architecture, I have a concern: what if there are duplicate files in the bucket? Well, fortunately, the `sync` command will compare the files (metrics could be **file size**, **last modified timestamp**, or **MD5 checksum**, etc.) in the CodeBuild environment with the files in S3. On completion of upload, the Lambda Function will take care of the rest. 

# Some final thoughts

Today's topic primarily focuses on serverless architecture with Lambda and DynamoDB to make my personal website more functional. If you think this architecture is interesting, don't hesitate to contact me at this [link](https://karl-sue.github.io/contact) and maybe we can discuss further. One thing to keep in mind is that this setup can be costly, considering I have just started sharing my knowledge with a limited number of people, so I chose GitHub instead. I'm on my way to become a Software Engineer | DevOps so I will keep sharing my learning journey.

# Next topic 

Next week, I will try to cover SQS and SNS to see how these services can be applied to an application (maybe I will research how big companies apply these).

Thank you for your time reading this post. I'll see you next week.
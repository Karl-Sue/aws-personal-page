export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  content?: string;
}

export const initialPosts: Post[] = [
  {
    id: "ticket_system",
    title: "How SQS and SNS help a business decouple its architecture",
    excerpt: "Exploring how high-traffic systems like ticketing platforms use AWS SNS and SQS decoupling patterns to handle millions of requests without crashing. A look at synchronous vs asynchronous architecture and idempotency.",
    category: "Full Stack",
    tags: ["AWS", "System Design", "SQS", "SNS", "Microservices", "Cloud Architecture", "Redis", "DynamoDB"],
    date: "2026-02-08",
    readTime: "8 min",
  },
  {
    id: "personal-app",
    title: "Update A Personal Page With AWS Serverless Setup",
    excerpt: "Exploring the transition from a static GitHub-hosted site to an AWS serverless architecture using Lambda and DynamoDB. Learn how to add dynamic functionality like page view tracking to a static website.",
    category: "Full Stack",
    tags: ["AWS", "Serverless", "Lambda", "DynamoDB", "GitHub Pages", "CloudFront", "S3", "CI/CD", "API Gateway"],
    date: "2026-02-01",
    readTime: "5 min",
  },
  {
    id: "system-design",
    title: "Construct an AWS architecture for a scalable application",
    excerpt: "Building a reliable, scalable, and secure AWS architecture. This detailed walkthrough covers VPC networking, public/private subnets, frontend hosting with S3 & CloudFront, and backend scaling with EC2 & ALB.",
    category: "Full Stack",
    tags: ["AWS", "System Design", "Cloud Architecture", "VPC", "EC2", "S3", "CloudFront", "Security"],
    date: "2026-01-25",
    readTime: "10 min",
  },
  {
    id: "application-deployment",
    title: "Deploy application to Cloud - Should we run whole app on 1 machine or separate it?",
    excerpt: "A deep dive into the decision matrix for deploying applications on AWS EC2: single machine vs. separate machines for frontend and backend, exploring scaling, cost, performance, and security considerations.",
    category: "Full Stack",
    tags: ["AWS", "EC2", "CloudFront", "S3", "DevOps", "Cloud Architecture", "Deployment"],
    date: "2026-01-18",
    readTime: "8 min",
  },
];

export const categories = [
  "All",
  "Frontend Development",
  "Backend Development",
  "Full Stack",
  "Learning Progress",
];

// Load markdown content for a post
export async function loadPostContent(id: string): Promise<string> {
  try {
    const response = await fetch(`/src/app/posts/${id}.md`);
    if (!response.ok) throw new Error("Post not found");
    return await response.text();
  } catch (error) {
    console.error(`Failed to load post ${id}:`, error);
    return "Content not available.";
  }
}

// Get a single post by ID
export function getPostById(id: string): Post | undefined {
  return initialPosts.find((post) => post.id === id);
}

// Get all posts
export function getAllPosts(): Post[] {
  return initialPosts;
}

/// <reference types="vite/client" />
import { useParams, Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";
import { getPostById } from "../data/posts";
import { API_CONFIG } from "../../config/api";

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [assetsBaseUrl, setAssetsBaseUrl] = useState<string>("");

  const post = postId ? getPostById(postId) : null;

  useEffect(() => {
    const loadPost = async () => {
      if (!postId || !post) return;

      // If post has content (from Add Post form), use it
      if (post.content) {
        setContent(post.content);
        setLoading(false);
        return;
      }

      try {
        // Fetch post metadata from API
        // This is a placeholder for your Lambda/API call
        const apiResponse = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.getPost(postId)}`);
        if (!apiResponse.ok) throw new Error('Failed to fetch post metadata');
        
        const data = await apiResponse.json();
        // data should look like { contentUrl: string, assetsBaseUrl?: string }
        const contentUrl = data.contentUrl;
        
        if (!contentUrl) throw new Error('API response missing contentUrl');
        
        // Fetch the markdown content using the URL from API
        const markdownResponse = await fetch(contentUrl);
        if (!markdownResponse.ok) throw new Error('Failed to fetch markdown content');
        
        const markdown = await markdownResponse.text();
        setContent(markdown);
        
        // Store assetsBaseUrl for image rendering if provided, or derive from contentUrl
        // For now using contentUrl's origin + folder structure assumption
        // e.g. https://bucket.com/posts/123.md -> https://bucket.com
        const assetsBaseUrl = data.assetsBaseUrl || new URL(contentUrl).origin;
        setAssetsBaseUrl(assetsBaseUrl);
        
      } catch (error) {
        // If file doesn't exist, use placeholder content
        setContent(getPlaceholderContent(postId, post.title));
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, post]);

  // Scroll to top when postId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [postId]);

  if (!post) {
    return (
      <div className="py-12 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="p-8 text-center">
            <h1 className="text-2xl mb-4">Post not found</h1>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back button */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Post header */}
        <Card className="p-8 mb-6">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge variant="secondary">{post.category}</Badge>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4 text-gray-900">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </Card>

        {/* Post content */}
        <Card className="p-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading post...</p>
            </div>
          ) : (
            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-h1:text-4xl prose-h1:font-bold prose-h2:text-3xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-bold prose-p:text-lg prose-p:leading-relaxed prose-p:text-gray-700">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  img: ({ node, ...props }) => {
                    let src = props.src || '';
                    if (!src.startsWith('http') && assetsBaseUrl) {
                        // Ensure baseUrl doesn't end with slash and src starts with slash, or handle join
                        const base = assetsBaseUrl.replace(/\/$/, '');
                        const path = src.startsWith('/') ? src : `/${src}`;
                        src = `${base}${path}`;
                    }
                    return <img {...props} src={src} />;
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          )}
        </Card>
      </div>
    </div>
  );
}

// Placeholder content generator
function getPlaceholderContent(postId: string, title: string): string {
  return `# ${title}

This is a placeholder post. To add your content, create a markdown file at:

\`/src/app/posts/${postId}.md\`

## Example Markdown Features

### Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists

- Item 1
- Item 2
- Item 3

### Blockquotes

> This is a blockquote

### Links and Images

[Visit my GitHub](https://github.com)

### Tables

| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |

---

**Note:** Replace this content with your actual blog post in markdown format.
`;
}

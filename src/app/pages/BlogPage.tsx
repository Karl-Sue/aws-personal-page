import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button"; // Import Button
import { Calendar, Clock, Tag, Plus, X } from "lucide-react"; // Import Plus, X icons
import { Post, categories, getAllPosts } from "../data/posts";

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false); // State for form visibility

  // Form state
  const [newPost, setNewPost] = useState<Partial<Post>>({
    title: "",
    excerpt: "",
    category: "Full Stack",
    tags: [],
    readTime: "5 min",
    content: "# New Post Content\n\nWrite your markdown here...",
  });
  const [tagInput, setTagInput] = useState("");

  // Load posts on mount
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

  // Handle adding a new post
  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.excerpt) return;

    const id = newPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const date = new Date().toISOString().split('T')[0];
    const tags = tagInput.split(",").map(t => t.trim()).filter(t => t);

    const postToAdd: Post = {
      id,
      title: newPost.title,
      excerpt: newPost.excerpt,
      category: newPost.category || "Full Stack",
      tags: tags.length > 0 ? tags : ["General"],
      date: date,
      readTime: newPost.readTime || "5 min",
      content: newPost.content
    } as Post;

    setPosts([postToAdd, ...posts]);
    setIsAddingPost(false);
    setNewPost({
      title: "",
      excerpt: "",
      category: "Full Stack",
      tags: [],
      readTime: "5 min",
      content: "# New Post Content\n\nWrite your markdown here...",
    });
    setTagInput("");
  };

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Introduction Section */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-8">
            <h1 className="font-serif text-5xl font-bold text-gray-900">Blog</h1>
            <Button onClick={() => setIsAddingPost(!isAddingPost)}>
              {isAddingPost ? <><X className="w-4 h-4 mr-2" /> Cancel</> : <><Plus className="w-4 h-4 mr-2" /> Add Post</>}
            </Button>
          </div>
          
          {/* Add Post Form */}
          {isAddingPost && (
            <Card className="p-6 mb-8 border-blue-200 shadow-md bg-white">
              <h2 className="text-xl font-bold mb-4">Create New Post</h2>
              <form onSubmit={handleAddPost} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="Post Title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    >
                      {categories.filter(c => c !== "All").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    required
                    className="w-full p-2 border rounded-md"
                    rows={2}
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    placeholder="Brief description of the post..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="AWS, React, Design..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={newPost.readTime}
                      onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                      placeholder="5 min"
                    />
                  </div>
                </div>

                 <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
                  <textarea
                    className="w-full p-2 border rounded-md font-mono text-sm"
                    rows={6}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="# Hello World"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsAddingPost(false)}>Cancel</Button>
                  <Button type="submit">Create Post</Button>
                </div>
              </form>
            </Card>
          )}

          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              Welcome to my digital garden 🌱 where I document my journey as a
              software developer. Here, I share insights on web development,
              cloud architecture, and my continuous learning adventures.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-3">
              From deep technical dives to reflections on learning new
              technologies, this space captures my experiences building scalable
              applications and exploring the ever-evolving landscape of software
              engineering. Feel free to learn, share, and connect!
            </p>
          </Card>
        </div>

        {/* Categories Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            CATEGORIES
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedTag(null);
                }}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:border-blue-500 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">TAGS</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {selectedTag}
              </button>
            )}
            {allTags
              .filter((tag) => tag !== selectedTag)
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </button>
              ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-gray-600">
          Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
        </div>

        {/* Posts Grid */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
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

                    <h2
                      className="group-hover:text-blue-600 transition-colors"
                      style={{ fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: "1.55rem" }}
                    >
                      {post.title}
                    </h2>

                    <p
                      className="text-lg text-gray-700 leading-relaxed"
                      style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1rem" }}
                    >
                      {post.excerpt}
                    </p>

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
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-gray-600 mb-4">
                No posts found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTag(null);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
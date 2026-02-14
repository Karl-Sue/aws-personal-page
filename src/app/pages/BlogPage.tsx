import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Calendar, Clock, Tag } from "lucide-react";
import { Post, categories, getAllPosts } from "../data/posts";

export function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Load posts on mount
  useEffect(() => {
    setPosts(getAllPosts());
  }, []);

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
          <h1 className="font-serif text-5xl font-bold mb-8 text-gray-900">Blog</h1>
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
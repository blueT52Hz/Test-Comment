import { Post } from "@/types/post";
import { Category } from "@/types/category";
import { Tag } from "@/types/tag";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Posts about the latest in technology.",
    count: null
  },
  {
    id: "2",
    name: "Programming",
    slug: "programming",
    description: "Insights and tutorials on programming.",
    count: null
  },
  {
    id: "3",
    name: "Design",
    slug: "design",
    description: "Creative tips and guides for design enthusiasts.",
    count: null
  },
];

export const mockTags: Tag[] = [
  {
    id: "1",
    slug: "web-development",
    name: "Web Development",
    count: 120,
  },
  {
    id: "2",
    slug: "javascript",
    name: "JavaScript",
    count: 95,
  },
  {
    id: "3",
    slug: "react",
    name: "React",
    count: 80,
  },
  {
    id: "4",
    slug: "typescript",
    name: "TypeScript",
    count: 45,
  },
  {
    id: "5",
    slug: "nodejs",
    name: "Node.js",
    count: 60,
  },
];
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Understanding TypeScript in 2024",
    category: {
      id: "1",
      name: "TypeScript",
      slug: "typescript",
      description: "TypeScript Programming",
      count: null
    },
    excerpt: "Learn how TypeScript enhances JavaScript development with types.",
    thumbnail_image_url: "https://picsum.photos/400/300?random=1",
    tags: [
      { id: "1", name: "Programming", slug: "programming", count: 120 },
      { id: "2", name: "JavaScript", slug: "javascript", count: 95 },
    ],
    published_at: "2024-12-01",
    slug: "understanding-typescript-2024",
  },
  {
    id: "2",
    title: "Top Web Development Trends",
    category: {
      id: "2",
      name: "Web Development",
      slug: "web-development",
      description: "Web Development Trends",
      count: null
    },
    excerpt: "Discover the latest trends shaping the web development world.",
    thumbnail_image_url: "https://picsum.photos/400/300?random=2",
    tags: [
      { id: "3", name: "Web", slug: "web", count: 100 },
      { id: "4", name: "Frontend", slug: "frontend", count: 60 },
    ],
    published_at: "2024-11-20",
    slug: "top-web-development-trends",
  },
  {
    id: "3",
    title: "React Tips for Beginners",
    category: {
      id: "3",
      name: "React",
      slug: "react",
      description: "React Development",
      count: null
    },
    excerpt: "Quick tips to get started with React effectively.",
    thumbnail_image_url: "https://picsum.photos/400/300?random=3",
    tags: [{ id: "5", name: "React", slug: "react", count: 80 }],
    published_at: "2024-10-15",
    slug: "react-tips-for-beginners",
  },
  {
    id: "4",
    title: "Designing with CSS: A Comprehensive Guide",
    category: {
      id: "4",
      name: "CSS",
      slug: "css",
      description: "CSS Styling",
      count: null
    },
    excerpt: "Master the art of styling your website with CSS.",
    thumbnail_image_url: "https://picsum.photos/400/300?random=4",
    tags: [{ id: "6", name: "CSS", slug: "css", count: 70 }],
    published_at: "2024-09-05",
    slug: "designing-with-css-guide",
  },
];

export const RecentPosts = () => {
  return (
    <div className="sticky top-4">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-4">
        {mockPosts.map((post) => (
          <div key={post.title} className="group cursor-pointer flex gap-3">
            <img
              src={post.thumbnail_image_url}
              alt={post.title}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-primary group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{post.published_at.split("T")[0]}</span>
                {/* <span>•</span> */}
                {/* <span>{post.category.name}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

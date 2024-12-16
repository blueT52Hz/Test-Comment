import { HeroSlideshow } from "@/components/Home/HeroSlideshow";
import { Posts } from "@/components/Home/PostList";
import { Post } from "@/types/post";

const posts: Post[] = [
  {
    id: "1",
    title: "[JAVA] - BUỔI 10: NHẬP XUẤT FILE, UNIT TEST",
    excerpt: "Learn about file I/O operations and unit testing in Java...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=1",
    category: {
      id: "1",
      name: "Java",
      slug: "java",
      description: "Java Programming",
      count: null
    },
    tags: [
      { id: "1", name: "Programming", slug: "programming", count: 10 },
      { id: "2", name: "Testing", slug: "testing", count: 5 },
    ],
    published_at: "2024-06-12",
    slug: "java-io-unit-test",
  },
  {
    id: "2",
    title: "Test thử bài viết chứa nhiều tag 2",
    excerpt: "DEMO content with multiple tags...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=2",
    category: {
      id: "2",
      name: "HTML",
      slug: "html",
      description: "HTML Tutorials",
      count: null
    },
    tags: [
      { id: "3", name: "Web", slug: "web", count: 15 },
      { id: "4", name: "Frontend", slug: "frontend", count: 8 },
    ],
    published_at: "2024-06-12",
    slug: "multiple-tags-demo",
  },
  {
    id: "3",
    title: "Test thử bài viết chứa nhiều tag",
    excerpt: "DEMO content exploring various topics...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=3",
    category: {
      id: "3",
      name: "AI",
      slug: "ai",
      description: "Artificial Intelligence",
      count: null
    },
    tags: [
      { id: "5", name: "Machine Learning", slug: "ml", count: 12 },
      { id: "6", name: "AI", slug: "ai", count: 20 },
    ],
    published_at: "2024-06-12",
    slug: "ai-multiple-tags",
  },
  {
    id: "4",
    title: "React Hooks: A Comprehensive Guide",
    excerpt: "Learn about React hooks and how to use them effectively...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=4",
    category: {
      id: "4",
      name: "React",
      slug: "react",
      description: "React Development",
      count: null
    },
    tags: [
      { id: "7", name: "React", slug: "react", count: 30 },
      { id: "8", name: "JavaScript", slug: "javascript", count: 25 },
    ],
    published_at: "2024-06-15",
    slug: "react-hooks-guide",
  },
  {
    id: "5",
    title: "Node.js Streams and Asynchronous Programming",
    excerpt: "Explore Node.js streams and advanced async techniques...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=5",
    category: {
      id: "5",
      name: "Node.js",
      slug: "nodejs",
      description: "Node.js Tutorials",
      count: null
    },
    tags: [
      { id: "9", name: "Backend", slug: "backend", count: 18 },
      { id: "10", name: "Node.js", slug: "nodejs", count: 20 },
    ],
    published_at: "2024-06-18",
    slug: "nodejs-streams-async",
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox: Which One to Use?",
    excerpt: "Understand the differences between CSS Grid and Flexbox...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=6",
    category: {
      id: "6",
      name: "CSS",
      slug: "css",
      description: "CSS Techniques",
      count: null
    },
    tags: [
      { id: "11", name: "CSS", slug: "css", count: 22 },
      { id: "12", name: "Frontend", slug: "frontend", count: 8 },
    ],
    published_at: "2024-06-20",
    slug: "css-grid-vs-flexbox",
  },
  {
    id: "7",
    title: "Understanding Deep Learning",
    excerpt: "Learn the fundamentals of deep learning and neural networks...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=7",
    category: {
      id: "7",
      name: "AI",
      slug: "ai",
      description: "Artificial Intelligence",
      count: null
    },
    tags: [
      { id: "5", name: "Machine Learning", slug: "ml", count: 12 },
      { id: "6", name: "AI", slug: "ai", count: 20 },
    ],
    published_at: "2024-06-22",
    slug: "deep-learning-guide",
  },
  {
    id: "8",
    title: "Building RESTful APIs with Express.js",
    excerpt: "A guide to creating robust RESTful APIs using Express.js...",
    thumbnail_image_url: "https://picsum.photos/400/300?random=8",
    category: {
      id: "5",
      name: "Node.js",
      slug: "nodejs",
      description: "Node.js Tutorials",
      count: null
    },
    tags: [
      { id: "9", name: "Backend", slug: "backend", count: 18 },
      { id: "10", name: "Node.js", slug: "nodejs", count: 20 },
    ],
    published_at: "2024-06-25",
    slug: "expressjs-restful-apis",
  },
];


const Index = () => {
  return (
    <div className="">
      <HeroSlideshow />
      <Posts  posts={posts}/>
    </div>
  );
};

export default Index;

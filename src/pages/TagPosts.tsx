import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, LayoutList } from "lucide-react";
import { Post } from "@/types/post";
import { ListViewPost } from "@/components/posts/ListViewPost";
import { GridViewPost } from "@/components/posts/GridViewPost";
import { Tag } from "@/types/tag";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { getAllPostsOfTagId, getTagByTagSlug } from "@/service/tag";

const MOCK_TAGS: Tag[] = [
  { id: "1", name: "React", slug: "react", count: 1 },
  { id: "2", name: "JavaScript", slug: "javascript", count: 1 },
];

// Mock data - replace with your actual data fetching logic
const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Getting Started with React",
    category: {
      id: "1",
      name: "React",
      slug: "react",
      description: "All about React",
    },
    excerpt: "Learn the basics of React and how to get started with it.",
    thumbnail_image_url: "https://picsum.photos/800/400",
    tags: MOCK_TAGS,
    published_at: "2024-03-10T00:00:00Z",
    slug: "getting-started-with-react",
  },
  // Add more mock posts as needed
];

const TagPosts = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const { slug } = useParams();
  const [tag, setTag] = useState<Tag | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getTag = async () => {
      if (!slug) return; // Ngắt sớm nếu slug không tồn tại
      const data = await getTagByTagSlug(slug);
      if (!data) return;
      setTag(data);
    };

    getTag();
  }, [slug]);

  useEffect(() => {
    const getPosts = async () => {
      if (!tag?.id) return; // Ngắt sớm nếu tag hoặc tag.id không tồn tại
      const data = await getAllPostsOfTagId(tag.id);
      if (!data) return;
      setPosts(data);
      console.log("Fetched posts:", data); // Ghi log dữ liệu thay vì posts (tránh lệ thuộc vào trạng thái bất đồng bộ)
    };

    getPosts();
  }, [tag]);

  return (
    <div className="flex">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Posts tagged with "{tag?.name}"
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {viewMode === "list" ? (
                  <LayoutList className="h-4 w-4" />
                ) : (
                  <LayoutGrid className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewMode("list")}>
                <LayoutList className="h-4 w-4 mr-2" />
                List View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setViewMode("grid")}>
                <LayoutGrid className="h-4 w-4 mr-2" />
                Grid View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {viewMode === "list" ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <ListViewPost key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <GridViewPost key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default TagPosts;

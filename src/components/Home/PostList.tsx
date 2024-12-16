import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import { Header } from "@/components/Home/Header";
import { GridViewPost } from "@/components/Home/GridViewPost";
import { ListViewPost } from "@/components/Home/ListViewPost";

type PostsProps = {
  posts: Post[]; // Thêm prop để truyền danh sách bài viết
};

export const Posts: React.FC<PostsProps> = ({ posts }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

   // Tự động chuyển về list view trên màn hình nhỏ
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setViewMode("grid");
      }
    };

    // Gọi hàm resize khi component mount
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  return (
    <div className="">
      <Header viewMode={viewMode} toggleViewMode={toggleViewMode} />
      {viewMode === "list" ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <ListViewPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {posts.map((post) => (
            <GridViewPost key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

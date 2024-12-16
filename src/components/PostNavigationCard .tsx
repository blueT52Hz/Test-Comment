import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Post = {
  id: string;
  title: string;
  content: string;
  content_type: string;
  author_id: string;
  category_id: string;
  published_at: string;
  thumbnail_image_url: string;
  slug: string;
  excerpt: string;
};

interface PostNavigationCardProps {
  post: Post | null;
  type: "prev" | "next";
}

const PostNavigationCard = ({ post, type }: PostNavigationCardProps) => {
  if (!post) {
    // Nếu `post` là null, hiển thị một thẻ trống
    return (
      <div
        className={cn(
          "flex items-center justify-center p-4 border rounded-lg transition-all duration-300",
          "bg-primary-foreground text-primary opacity-50 cursor-not-allowed",
          type === "prev" ? "flex-row" : "flex-row-reverse"
        )}
        style={{ minHeight: "5rem" }} // Đảm bảo chiều cao cố định.
      >
        <span className="text-sm font-medium">
          {type === "prev" ? (
            <>
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              No Previous Post
            </>
          ) : (
            <>
              No Next Post
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </>
          )}
        </span>
      </div>
    );
  }

  return (
    <Link
      to={`/posts/${post.slug}`}
      className={cn(
        "group flex gap-4 items-center p-4 border rounded-lg transition-all duration-300",
        "bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground",
        type === "prev" ? "flex-row" : "flex-row-reverse"
      )}
      style={{ minHeight: "5rem" }} // Đảm bảo chiều cao cố định.
    >
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={post.thumbnail_image_url}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div
        className={cn(
          "flex flex-col",
          type === "prev" ? "items-start text-left" : "items-end text-right"
        )}
      >
        <span className="text-sm font-medium mb-1">
          {type === "prev" ? (
            <>
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Previous Post
            </>
          ) : (
            <>
              Next Post
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </>
          )}
        </span>
        <h3 className="text-lg font-semibold transition-colors line-clamp-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
};

export default PostNavigationCard;

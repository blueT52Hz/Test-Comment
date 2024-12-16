import { Post } from "@/types/post";
import { Link } from "react-router-dom";

interface RelatedPostCardProps {
  post: Post;
}

const RelatedPostCard = ({ post }: RelatedPostCardProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn lên đầu trang
  };

  return (
    <Link to={`/posts/${post.slug}`} className="group block">
      <div className="aspect-video mb-4 overflow-hidden rounded-lg">
        <img
          src={post.thumbnail_image_url}
          alt={post.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-gray-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-gray-500 line-clamp-2">{post.excerpt}</p>
    </Link>
  );
};

export default RelatedPostCard;

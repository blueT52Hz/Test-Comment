import RelatedPostCard from "./RelatedPostCard";

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

interface RelatedPostsProps {
  posts: Post[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  return (
    <section className="my-12">
      {posts.length > 0 && (
        <h2 className="text-2xl font-bold mb-6">Bài viết liên quan:</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post) => (
          <RelatedPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;

import PostNavigationCard from "@/components/PostNavigationCard ";

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

interface PostNavigationProps {
  prevPost: Post;
  nextPost: Post;
}

const PostNavigation = ({ prevPost, nextPost }: PostNavigationProps) => {
  return (
    <nav className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {<PostNavigationCard post={prevPost} type="prev" />}
      {<PostNavigationCard post={nextPost} type="next" />}
    </nav>
  );
};

export default PostNavigation;

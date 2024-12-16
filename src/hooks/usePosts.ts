import { useState, useEffect } from "react";
import { Post } from "@/types/post";
import supabase from "@/config/supabaseClient";
interface UsePostsOptions {
  category?: string;
  filter: "newest" | "popular";
  page: number;
  limit: number;
}
export function usePosts({ category, filter, page, limit }: UsePostsOptions) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("posts")
          .select(
            `
            *,
            category:categories(*),
            tags:post_tags(tags(*))
          `,
            { count: "exact" }
          )
          .eq("status", "published");

        if (category) {
          query = query.eq("category.slug", category);
        }

        if (filter === "newest") {
          query = query.order("published_at", { ascending: false });
        } else if (filter === "popular") {
          // Assuming you have a 'views' column to determine popularity
          query = query.order("views", { ascending: false });
        }

        const { data, error, count } = await query.range(
          (page - 1) * limit,
          page * limit - 1
        );

        if (error) throw error;

        setPosts(data as Post[]);
        setTotalCount(count || 0);
      } catch (err) {
        setError("Error fetching posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [category, filter, page, limit]);

  return { posts, loading, error, totalCount };
}

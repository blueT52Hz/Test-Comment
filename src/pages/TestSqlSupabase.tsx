import { getAllPostsPublished } from "@/service/post";
import { getAllTagsOfPostId, getAllTags } from "@/service/tag";
import { useEffect } from "react";

export const TestSqlSupabase = () => {
  useEffect(() => {
    const fecthPosts = async () => {
      const posts = await getAllPostsPublished();
      console.log(posts);
    };
    fecthPosts();
  }, []);
  return <div>TestSqlSupabase</div>;
};

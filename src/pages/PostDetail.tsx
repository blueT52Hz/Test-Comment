// src/pages/PostDetail.tsx

import { useState, useEffect } from "react";
import { Calendar, Tag as TagIcon } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import supabase from "@/config/supabaseClient";
import DynamicTableOfContents from "@/components/DynamicTableOfContents";
import { MarkdownRender } from "@/components/convertMD/MarkdownRender_Display";
import {
  getCategoryById,
  getCountOfPostByCategoryId,
} from "@/service/category";
import { getAllTagsOfPostId, getCountOfPostsOfTagId } from "@/service/tag";
import RelatedPosts from "@/components/RelatedPosts";
import PostNavigation from "@/components/PostNavigation";
import { PostDetailLayout } from "@/components/Sidebar/PostDetailLayout";
interface Post {
  id: string;
  title: string;
  content: string;
  content_type: string;
  author_id: string;
  category_id: string;
  published_at: string;
  thumbnail_image_url: string;
}

type Tag = {
  id: string;
  name: string;
  slug: string;
  count: number | null;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
};

export default function PostDetail() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const location = useLocation();
  const postID = location.state?.id;
  const [post, setPost] = useState<Post | null>(null);
  const [tags, setTags] = useState<Tag[] | []>([]);
  const [category, setCategory] = useState<Category | null>();
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [previousPost, setPreviousPost] = useState<Post | null>(null);

  // lấy post từ slug
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, content, content_type, author_id, category_id, published_at, thumbnail_image_url"
        )
        .eq("slug", postSlug);

      if (error) {
        console.error("Error fetching post:", error);
        return;
      }

      if (data && data.length > 0) {
        setPost(data[0]); // Lấy bài viết đầu tiên trong kết quả
      } else {
        setPost(null); // Nếu không có bài viết
      }
    };

    fetchPost();
  }, [postID]);

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     const { data, error } = await supabase
  //       .from('profiles')
  //       .select('display_name')
  //       .eq('user_id', post?.author_id)

  //     if (error) {
  //       console.error("Error fetching profiles:", error);
  //     } else {
  //       setAuthName(data[0].display_name);
  //     }
  //   };

  //   fetchProfiles();
  // }, [post]);

  // lấy tags từ bằng post.id
  useEffect(() => {
    const fetchTags = async () => {
      if (!post?.id) {
        console.error("No post id found");
        return;
      }

      const data = await getAllTagsOfPostId(post.id);

      if (!data) {
        console.error("Failed to fetch tags");
        return;
      }

      // Lấy số lượng bài viết cho mỗi tag
      const updatedTags = await Promise.all(
        data.map(async (tag) => {
          const count = await getCountOfPostsOfTagId(tag.id); // Lấy số lượng bài viết cho tag này
          return { ...tag, count }; // Trả về tag với thông tin count
        })
      );
      setTags(updatedTags);
    };

    if (post) {
      fetchTags();
    }
  }, [post]); // Phụ thuộc vào `post` để khi post thay đổi sẽ fetch lại tags

  // New useEffect for fetching related posts
  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post) return;

      const { data, error } = await supabase
        .from("posts")
        .select(
          `
        id, 
        title, 
        slug, 
        thumbnail_image_url, 
        excerpt, 
        published_at,
        category:category_id (id, name),
        thumbnail_image_url,
        tags (id, name)
      `
        )
        .eq("category_id", post.category_id)
        .neq("id", post.id)
        .limit(6);

      if (error) {
        console.error("Error fetching related posts:", error);
      } else {
        setRelatedPosts(data);
      }
    };

    fetchRelatedPosts();
  }, [post]);

  // New useEffect for fetching next and previous posts
  useEffect(() => {
    const fetchNextPreviousPosts = async () => {
      if (!post) return;

      const { data: nextPostData, error: nextError } = await supabase
        .from("posts")
        .select(
          `
        id, 
        title, 
        slug, 
        thumbnail_image_url, 
        excerpt, 
        published_at,
        category:category_id (id, name),
        tags (id, name)
      `
        )
        .gt("published_at", post.published_at)
        .order("published_at", { ascending: true })
        .limit(1);

      const { data: previousPostData, error: previousError } = await supabase
        .from("posts")
        .select(
          `
        id, 
        title, 
        slug, 
        thumbnail_image_url, 
        excerpt, 
        published_at,
        category:category_id (id, name),
        tags (id, name)
      `
        )
        .lt("published_at", post.published_at)
        .order("published_at", { ascending: false })
        .limit(1);

      if (nextError || previousError) {
        console.error(
          "Error fetching next/previous posts:",
          nextError || previousError
        );
      } else {
        setNextPost(nextPostData[0] || null);
        setPreviousPost(previousPostData[0] || null);
      }
    };

    fetchNextPreviousPosts();
  }, [post]);

  // lấy category từ post.category_id
  useEffect(() => {
    const fetchCategory = async () => {
      if (!post?.category_id) {
        console.error("No category_id found in the post");
        return;
      }

      const data = await getCategoryById(post.category_id);

      if (!data) {
        console.error("Failed to fetch category");
        return;
      }

      const count = await getCountOfPostByCategoryId(data.id);
      const updatedCategory = { ...data, count: count };

      setCategory(updatedCategory); // Cập nhật category từ dữ liệu trả về
    };

    if (post) {
      fetchCategory();
    }
  }, [post]); // Phụ thuộc vào post để khi post thay đổi sẽ fetch lại category

  // màn hình loading ...
  if (!post) {
    return (
      <PostDetailLayout>
        <main className="flex px-4">
          {/* <LeftSidebar /> */}
          <div className="container p-4 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center bg-gradient-to-br mx-auto">
              <div className="text-center">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
              </div>

              <p className="mt-4 text-lg font-medium animate-pulse">
                Loading...
              </p>
            </div>
          </div>
          <DynamicTableOfContents
            markdownContent={""}
            tags={tags}
            category={category || null}
          />
        </main>
      </PostDetailLayout>
    );
  }

  return (
    <PostDetailLayout
      markdownContent={post.content}
      tags={tags}
      category={category || null}
    >
      <main className="flex w-full">
        {/* <LeftSidebar /> */}
        <div className="container mx-auto p-10">
          <h1 className="text-5xl font-bold mb-4 text-center">{post.title}</h1>
          {/* Hiển thị hình ảnh thumbnail */}
          {post.thumbnail_image_url && (
            <div className="flex justify-center mb-6">
              <img
                src={post.thumbnail_image_url}
                alt={post.title}
                className="w-full max-w-4xl rounded-lg shadow-lg"
              />
            </div>
          )}
          <div className="flex items-center mb-6 text-gray-500">
            {/* <span className="mx-2">Tác giả: {post.author_id} </span> */}
            <span className="flex items-center mr-8">
              <Calendar className="w-4 h-4 inline mr-1" />{" "}
              {new Date(post.published_at).toLocaleDateString("vi-VN")}
            </span>
            <span className="mx-2">Thể lọai: {category?.description} </span>
          </div>
          <div className="prose max-w-none mb-6">
            {post.content_type === "markdown" ? (
              <MarkdownRender post={post}></MarkdownRender>
            ) : (
              <div>k phải md</div>
            )}
          </div>
          <PostNavigation prevPost={previousPost} nextPost={nextPost} />

          <RelatedPosts posts={relatedPosts} />
        </div>
        <DynamicTableOfContents
          markdownContent={post.content}
          tags={tags}
          category={category || null}
        />
      </main>
    </PostDetailLayout>
  );
}

import supabase from "@/config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { getPostById } from "./post";

export async function getAllTagsOfPostId(postId: string) {
  const { data } = await supabase
    .from("post_tags")
    .select(
      `
      tags(*)
    `
    )
    .eq("post_id", postId);

  if (!data) {
    console.log("Fail to get all posts by tagId");
    return [];
  }
  let tags: any[] = [];
  data.forEach((item) => {
    tags.push(item.tags);
  });
  return tags;
}

export async function getAllTags() {
  const { data, error } = await supabase.from("tags").select("*");

  if (error) {
    console.error("Error fetching tags:", error);
    return null;
  }

  const tags = Promise.all(
    data.map(async (tag) => {
      const count = await getCountOfPostsOfTagId(tag.id);
      return { ...tag, count };
    })
  );

  return tags;
}

export async function getAllPostsOfTagId(tagId: string) {
  const { data, error } = await supabase
    .from("post_tags")
    .select("post_id")
    .eq("tag_id", tagId);

  if (error) {
    console.log("Error:", error);
    return [];
  }

  // Sử dụng Promise.all để đảm bảo tất cả các lời gọi bất đồng bộ hoàn thành trước khi tiếp tục
  const posts = await Promise.all(
    data.map(async (item: any) => {
      const post = await getPostById(item.post_id);
      return post; // Gắn `tags` vào từng bài viết
    })
  );
  return posts;
}

export async function getCountOfPostsOfTagId(tagId: string) {
  const { error, count } = await supabase
    .from("post_tags")
    .select("*", { count: "exact" }) // Chọn bất kỳ trường nào (chẳng hạn "id" ở đây)
    .eq("tag_id", tagId); // Lọc theo tag_id

  if (error) {
    console.error("Error fetching count:", error);
    return null;
  }
  const data = count;
  return data; // Trả về số lượng bản ghi
}

export async function getTagByTagId(tagId: string) {
  const { data, error } = await supabase
    .from("tags")
    .select(
      `id, 
       name, 
       slug, 
       post_count:post_tags(tag_id)`
    )
    .eq("id", tagId)
    .limit(1); // Lấy tối đa 1 kết quả, do ID là duy nhất

  if (error) {
    console.error("Error fetching tag with post count:", error);
    return null;
  }

  if (!data || data.length === 0) {
    console.warn("No data found for the specified tag ID.");
    return null;
  }

  // Đếm số lượng bài viết liên kết
  const tag = data[0];
  const postCount = tag.post_count.length;

  return {
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    count: postCount,
  };
}

export async function getTagsTrending() {
  const { data, error } = await supabase
    .from("trending_tags")
    .select("*")
    .order("created_at", { ascending: false }) // Sắp xếp giảm dần
    .limit(4); // Lấy tối đa 4 hàng

  if (error) {
    console.error("Error fetching trending tags:", error);
    return [];
  }

  if (!data) {
    return [];
  }

  // Sử dụng Promise.all để đợi tất cả các lời hứa được hoàn thành
  const updatedTags = await Promise.all(
    data.map(async (tag) => {
      const data = await getTagByTagId(tag.id); // Gọi hàm lấy số lượng bài viết của tag
      return data; // Thêm thuộc tính `count` vào tag
    })
  );
  return updatedTags; // Trả về danh sách các tag đã được cập nhật
}

export async function getTagByTagSlug(tagSlug: string) {
  const { data } = await supabase.from("tags").select("*").eq("slug", tagSlug);

  if (!data) {
    console.error("Fail to get tag bay slug.");
    return;
  }

  return data[0];
}

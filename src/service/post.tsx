import supabase from "@/config/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { getAllTagsOfPostId } from "./tag";
import { getCategoryById } from "./category";

export const getAllPostsPublished = async () => {
  let { data, error } = await supabase
    .from("posts") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.log("Error:", error);
    return [];
  }

  if (data) {
    // Sử dụng Promise.all để đảm bảo tất cả các lời gọi bất đồng bộ hoàn thành trước khi tiếp tục
    const postsWithTags = await Promise.all(
      data.map(async (post) => {
        const tags = await getAllTagsOfPostId(post.id);
        return { ...post, tags }; // Gắn `tags` vào từng bài viết
      })
    );

    const postsWithCategory = await Promise.all(
      postsWithTags.map(async (post) => {
        const category = await getCategoryById(post.category_id);
        return { ...post, category };
      })
    );
    return postsWithCategory;
  }
};

export const getAllPostsPublishedFromTo = async (from: number, to: number) => {
  let { data, error } = await supabase
    .from("posts") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .range(from, to);
  if (error) {
    console.log("Error:", error);
    return [];
  }

  if (data) {
    // Sử dụng Promise.all để đảm bảo tất cả các lời gọi bất đồng bộ hoàn thành trước khi tiếp tục
    const postsWithTags = await Promise.all(
      data.map(async (post) => {
        const tags = await getAllTagsOfPostId(post.id);
        return { ...post, tags }; // Gắn `tags` vào từng bài viết
      })
    );

    const postsWithCategory = await Promise.all(
      postsWithTags.map(async (post) => {
        const category = await getCategoryById(post.category_id);
        return { ...post, category };
      })
    );
    return postsWithCategory;
  }
};

export const getAllPost_byCategories = async (category_id: string) => {
  console.log("id dc truyen:", category_id);

  const { data, error } = await supabase
    .from("posts") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết
    .eq("category_id", category_id);
  // .single()
  if (error) {
    console.log("Error get Post by category: ", error);
  }
  if (data) {
    console.log("All Post by category: ", data);
    return data;
  }
};

export const getAPost = async (id: string) => {
  const { data, error } = await supabase
    .from("posts") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết
    .eq("id", id)
    .single();
  if (error) {
    console.log("Error get A post: ", error);
  }
  if (data) {
    console.log("A Post: ", data);
    return data;
  }
};

export const getAllPost_byCategorie_Name = async (
  category: string,
  from: number,
  to: number
) => {
  console.log("Ten cate dc truyen: ", category);

  const { data, error } = await supabase
    .from("categories")
    .select(
      `
            name,
            posts (
                id,
                title,
                content,
                content_type,
                author_id,
                category_id,
                published_at,
                last_updated,
                slug,
                thumbnail_image_url,
                excerpt,
                status
            )
        `
    )
    .range(from, to)
    .eq("name", category);
  if (error) {
    console.log("Error get Post by category: ", error);
  }
  if (data) {
    console.log("All Post by category name: ", data);
    return data;
  }
};

export const createNewPost = async (
  title: string,
  category_id: string,
  content: string,
  author_id: string
) => {
  console.log(title, category_id, content, author_id);
  const id = uuidv4();
  const { data, error } = await supabase
    .from("posts")
    .insert([{ id, title, content, author_id, category_id }]) //có mấy tk nó ko cho add mà ko có uuid nên cái cái thư viện ấy vào, gen nó ra
    .select();
  // .single()
  if (error) {
    console.log(error);
    alert("Error Add new Post:");
  }
  if (data) {
    alert("Add new Post: " + data);
    console.log("Add new Post: ", data);
  }
};

export async function getPostById(id: string) {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  if (data) {
    const post = data[0];
    const tags = await getAllTagsOfPostId(post.id);
    const category = await getCategoryById(post.category_id);
    return { ...post, tags, category };
  }
}

export const getAllPost_byAuthor_ID = async (
  userID: string,
  from: number,
  to: number
) => {
  console.log("ID Tac gia:", userID);

  const { data, error } = await supabase
    .from("posts") //Lấy data từ bảng smoothies
    .select() //Lấy smt, ko để j là lấy hết
    .eq("author_id", userID)
    .range(from, to);
  // .single()
  if (error) {
    console.log("Error get Post by AuthorID : ", error);
  }
  if (data) {
    console.log("All Post by AuthorID : ", data);
    return data;
  }
};

export const getAllPosts_ByCategoryContains = async (
  substring: string,
  from: number,
  to: number
) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `      
                id,
                title,               
                content_type,
                author_id,               
                published_at,              
                slug,
                thumbnail_image_url,
                excerpt,
                status, 
                profiles(display_name),
                categories !inner(name)
            
        `
    )
    .range(from, to)
    .eq("status", "published")
    .ilike("categories.name", `%${substring}%`) // Tìm kiếm chuỗi trong tên danh mục
    .order("published_at", { ascending: false });

  if (error) {
    console.log("Error get Posts by category substring: ", error);
    return null;
  }
  if (data) {
    console.log("All Posts by category substring: ", data);
    return data;
  }
};

export const getAllPosts_ByTitleContains = async (
  substring: string,
  from: number,
  to: number
) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `       
                id,
                title,               
                content_type,
                author_id,               
                published_at,              
                slug,
                thumbnail_image_url,
                excerpt,
                status, 
                profiles(display_name),
                categories(name)           
        `
    )
    .range(from, to)
    .eq("status", "published")
    .order("published_at")
    .ilike("title", `%${substring}%`); // Tìm kiếm chuỗi trong tên danh mục

  if (error) {
    console.log("Error get Posts by Title substring: ", error);
    return null;
  }
  if (data) {
    console.log("All Posts by Title substring: ", data);
    return data;
  }
};

export const getAllPosts_ByTagContains = async (
  substring: string,
  from: number,
  to: number
) => {
  const { data, error } = await supabase
    .from("tags")
    .select(
      `  
            name,
            posts !inner (
                id,
                title,               
                content_type,
                author_id,               
                published_at,              
                slug,
                thumbnail_image_url,
                excerpt,
                status, 
                profiles(display_name),
                categories(name)
            )
        `
    )
    .range(from, to)
    .filter("posts.status", "eq", "published")
    .ilike("name", `%${substring}%`);

  if (error) {
    console.log("Error get Posts by Tag substring: ", error);
    return null;
  }
  if (data) {
    console.log("All Posts by Tag substring: ", data);
    return data;
  }
};

export async function getPostPublishedCount() {
  const { data, error } = await supabase
    .from("posts")
    .select("id", { count: "exact" }) // count: "exact" trả về số lượng bản ghi.
    .eq("status", "published");

  if (error) {
    console.log("Error");
    return 0;
  } else {
    return data?.length || 0; // Nếu không cần toàn bộ dữ liệu, chỉ dùng data.count
  }
}

export async function getPostCount() {
  const { data, error } = await supabase
    .from("posts")
    .select("id", { count: "exact" }); // count: "exact" trả về số lượng bản ghi.

  if (error) {
    console.log("Error");
    return 0;
  } else {
    return data?.length || 0; // Nếu không cần toàn bộ dữ liệu, chỉ dùng data.count
  }
}

export async function getAllPostsByKeyWords(keywords: string) {
  const { data, error } = await supabase.from("posts").select("count(*)");

  if (error) {
    console.error("Error fetching post:", error);
    return null;
  }

  return data;
}

import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import MarkdownRender from "@/components/convertMD/MarkdownRender";
import supabase from "@/config/supabaseClient";

const contentTypes = ["markdown", "latex"];
type Category = {
  id: string;
  description: string;
  name: string;
  slug: string;
};
type Tag = {
  id: string;
  name: string;
};
type Post = {
  id: string;
  title: string;
  content: string;
  content_type: string;
  category?: Category;
  published_at: string;
  author_id: string;
};
export default function EditPost() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const location = useLocation();
  const postID = location.state?.id;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [post, setPost] = useState<Post>(null);
  const [contentType, setContentType] = useState("markdown");
  const [content, setContent] = useState("");

  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategorires] = useState<Category[]>([]);

  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [tagSearchResults, setTagSearchResults] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [thumbnailPrevious, setThumbnailPrevious] = useState<string>("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        //0. Lấy dữ liệu bài viết cần sửa:  (Data + Current Category)
        const { data: dataPost, error: errorPost } = await supabase
          .from("posts")
          .select(
            ` 
                        id, 
                        title, 
                        content, 
                        content_type, 
                        categories:category_id (
                            name,
                            id
                        ), 
                        published_at, 
                        author_id,
                        thumbnail_image_url
                    `
          )
          .eq("id", postID);
        if (errorPost) throw errorPost;
        console.log("Bài viết cần sửa: ", dataPost);
        setTitle(dataPost[0].title);
        setContent(dataPost[0].content);
        setPost(dataPost[0]);

        setCategory(dataPost[0].categories.name);
        setCategoryID(dataPost[0].categories.id);

        setThumbnailPrevious(dataPost[0].thumbnail_image_url);
        setThumbnailFile(dataPost[0].thumbnail_image_url);
        setThumbnailPreview(dataPost[0].thumbnail_image_url);
        //1. Lấy dữ liệu tất cả các Category
        const { data: categoriesData, error: categoriesError } = await supabase
          .from("categories") //Lấy data từ bảng smoothies
          .select(); //Lấy smt, ko để j là lấy hết
        if (categoriesError) throw categoriesError;
        setCategorires(categoriesData);
        console.log("Tất cả các Category: ", categoriesData);

        //2. Lấy tất cả các Tag đã set:
        const { data: currentTagData, error: currentTagError } = await supabase
          .from("post_tags")
          .select(
            `
                        tag_id,
                        tags:tags (
                            id,
                            name
                        )
                    `
          )
          .eq("post_id", postID);
        if (currentTagError) throw currentTagError;
        console.log("Các Tag đã set:", currentTagData);
        // Transform and set selected tags
        const existingTags = currentTagData.map((item) => ({
          id: item.tags.id,
          name: item.tags.name,
        }));
        setSelectedTags(existingTags);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [postID, postSlug]);

  //2. Tìm kiếm tag: Click vào tag, thêm nó vào 1 cái component nào đó.
  //Nếu không sử dụng useCallback, mỗi khi render lại sẽ phải tạo lại 1 lần
  //=> Gây ra 1 lỗi: phải click 1 lần để load gd, click 1 lần để chọn tag
  const searchTags = useCallback(async (query: string) => {
    if (query.trim() === "") {
      setTagSearchResults([]);
      return;
    }

    const { data, error } = await supabase
      .from("tags")
      .select("id, name")
      .ilike("name", `%${query}%`)
      .limit(5);

    if (error) {
      console.error("Error searching tags:", error);
    } else {
      setTagSearchResults(data || []);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchTags(tagSearchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [tagSearchQuery, searchTags]);

  const addTag = useCallback((tag: Tag) => {
    setSelectedTags((prevTags) => {
      if (!prevTags.some((t) => t.id === tag.id)) {
        return [...prevTags, tag];
      }
      return prevTags;
    });
    setTagSearchQuery("");
    setTagSearchResults([]);
  }, []);

  const removeTag = useCallback((tagId: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  }, []);

  //3. Up Thumbnail:

  const uploadThumbnail = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error } = await supabase.storage
      .from("thumbnail-posts")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("thumbnail-posts").getPublicUrl(filePath);
    return publicUrl;
  };
  const removePreviousThumbnail = async () => {
    try {
      const filePath = thumbnailPrevious.split("/").pop();
      if (!filePath) {
        throw new Error("Invalid file path");
      }
      console.log(filePath);
      const { error } = await supabase.storage
        .from("thumbnail-posts")
        .remove([`thumbnails/${filePath}`]);
      if (error) throw error;
    } catch (error) {
      console.error("Error Remove file:", error);
    }
  };
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /*4: Đăng bài viết: */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Xóa thumbnail cũ, thay thumbnail mới
    await removePreviousThumbnail();
    // Gửi ảnh lên supabase
    let thumbnailUrl = null;
    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnail(thumbnailFile);
    }

    // Tạo uuid cho bài post
    const slugContent = title;

    try {
      const { data: dataUpdatePost, error: errorUpdatePost } = await supabase
        .from("posts")
        .update([
          {
            title: title,
            content: content,
            content_type: contentType,
            category_id: categoryID,
            slug: slugContent,
            thumbnail_image_url: thumbnailUrl,
            status: "published",
          },
        ]) //có mấy tk nó ko cho add mà ko có uuid nên cái cái thư viện ấy vào, gen nó ra
        .eq("id", postID)
        .select();
      // .single()
      if (errorUpdatePost) throw errorUpdatePost;
      console.log("Đã sửa Content bài viết: ", dataUpdatePost);

      //2. Xóa hết tất cả các post_tag trươcs khi thêm
      const { error: deleteTagsError } = await supabase
        .from("post_tags")
        .delete()
        .eq("post_id", postID);
      if (deleteTagsError) throw deleteTagsError;

      //3. Thêm các tag mới vào
      const postTags = selectedTags.map((tag) => ({
        post_id: postID,
        tag_id: tag.id,
      }));

      const { data: tagData, error: tagError } = await supabase
        .from("post_tags")
        .insert(postTags);

      if (tagError) throw tagError;
      alert("Edit Post Completed");
      console.log("New Tag of Post: ", tagData);
      navigate(`/admin/posts/${postSlug}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-10 max-w-20xl mt-5 p-6">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <Menu>
            <Menu.Button className="w-full flex justify-between items-center px-3 py-2 border rounded-md">
              {category || "Select Category"}
              <span className="ml-2">▼</span>
            </Menu.Button>
            <Menu.Items className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
              {categories.map((cat) => (
                <Menu.Item key={cat.name}>
                  {({ active }) => (
                    <button
                      type="button"
                      className={classNames(
                        "w-full text-left px-3 py-2",
                        active ? "bg-gray-100" : ""
                      )}
                      onClick={() => {
                        setCategory(cat.name);
                        setCategoryID(cat.id);
                      }}
                    >
                      {cat.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>

        {/*Tag Selection*/}
        <div className="space-y-4">
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="relative">
            <input
              type="text"
              value={tagSearchQuery}
              onChange={(e) => setTagSearchQuery(e.target.value)}
              placeholder="Search for tags..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {tagSearchResults.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                {tagSearchResults.map((tag) => (
                  <li
                    key={tag.id}
                    onClick={() => addTag(tag)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="bg-primary text-white px-2 py-1 rounded-md text-sm flex items-center"
              >
                {tag.name}
                <button
                  onClick={() => removeTag(tag.id)}
                  className="ml-2 text-xs font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Content Type Selection */}
        <div className="flex gap-4">
          {contentTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="radio"
                name="contentType"
                value={type}
                checked={contentType === type}
                onChange={(e) => setContentType(e.target.value)}
                className="mr-2"
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
            Thumbnail
          </label>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="mt-2 max-w-xs"
            />
          )}
        </div>

        {/* Content Editor and Preview */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[500px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write your content here..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div className="w-full h-[500px] px-3 py-2 border rounded-md overflow-auto prose prose-sm">
              <MarkdownRender content={content}></MarkdownRender>
            </div>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Edit Post
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

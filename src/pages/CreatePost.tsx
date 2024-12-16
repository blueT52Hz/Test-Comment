import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import classNames from "classnames";
import MarkdownRender from "@/components/convertMD/MarkdownRender";
import { v4 as uuidv4 } from "uuid";
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

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [contentType, setContentType] = useState("markdown");
  const [content, setContent] = useState("");

  //1. Lấy ra mảng obj dữ liệu gồm: cate - idcate, cho ng dùng chọn
  const [category, setCategory] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategorires] = useState<Category[]>([]);
  useEffect(() => {
    const getAllCategories = async () => {
      const { data, error } = await supabase
        .from("categories") //Lấy data từ bảng smoothies
        .select(); //Lấy smt, ko để j là lấy hết
      if (error) {
        console.log("Error:", error);
      }
      if (data) {
        console.log("Data All Categories: ", data);
        setCategorires(data);
      }
    };
    getAllCategories();
  }, []);

  //2. Tìm kiếm tag: Click vào tag, thêm nó vào 1 cái component nào đó.
  const [tagSearchQuery, setTagSearchQuery] = useState("");
  const [tagSearchResults, setTagSearchResults] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

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
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
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

    // Gửi ảnh lên supabase
    let thumbnailUrl = null;
    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnail(thumbnailFile);
    }
    // Tạo uuid cho bài post
    const id = uuidv4();
    const slugContent = title;
    const { data, error } = await supabase
      .from("posts")
      .insert([
        {
          id: id,
          title: title,
          content: content,
          content_type: contentType,
          author_id: "44424e17-0794-4843-93b8-58ca02b34a71",
          category_id: categoryID,
          slug: slugContent,
          thumbnail_image_url: thumbnailUrl,
          status: "published",
        },
      ]) //có mấy tk nó ko cho add mà ko có uuid nên cái cái thư viện ấy vào, gen nó ra
      .select();
    // .single()
    if (error) {
      console.log(error);
      alert("Error Add new Post:");
    }
    if (data) {
      console.log({ title, category, contentType, content });
      // Insert post tags
      const postTags = selectedTags.map((tag) => ({
        post_id: id,
        tag_id: tag.id,
      }));

      const { error: tagError } = await supabase
        .from("post_tags")
        .insert(postTags);

      if (tagError) {
        console.log("Error adding tags:", tagError);
        alert("Post created but error adding tags");
      } else {
        alert("Add new Post - Tags Completed");
        navigate("/");
        console.log("Add new Post: ", data);
      }
    }

    // Đăng các tag đã chọn cho bài viết
  };

  return (
    <div className="mx-10 max-w-20xl mt-5 p-6">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>

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
            Create Post
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

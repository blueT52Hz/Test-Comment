// src/pages/PostDetail.tsx
import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import supabase from "@/config/supabaseClient";
import { MarkdownRender } from "@/components/convertMD/MarkdownRender_Display";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Post {
  id: string;
  title: string;
  content: string;
  content_type: string;
  category_id: string;
  published_at: string;
  author_id: string;
}
export default function PostManagementDetail() {
  const { postSlug } = useParams<{ postSlug: string }>();
  const location = useLocation();
  const postID = location.state?.id;
  console.log("id", postID);

  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [authName, setAuthName] = useState<string>("user");
  const [category, setCategory] = useState<string>("thể loại");
  // const { user, logout } = useAuth()

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, title, content, content_type, category_id, published_at, author_id"
        )
        .eq("id", postID);

      if (error) {
        console.error("Error fetching post:", error);
      } else if (data && data.length > 0) {
        setPost(data[0]); // Lấy bài viết đầu tiên trong kết quả
      } else {
        setPost(null); // Nếu không có bài viết
      }
    };

    fetchPost();
  }, [postSlug, postID]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", post.author_id);

      if (error) {
        console.error("Error fetching profiles:", error);
      } else {
        setAuthName(data[0].display_name);
      }
    };

    fetchProfiles();
  }, [post]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .eq("id", post.category_id);

      if (error) {
        console.error("Error fetching categorys:", error);
      } else {
        setCategory(data[0].name);
      }
    };

    fetchCategories();
  }, [post]);

  // Xóa theo slug, không biết có chuẩn chỉ hay ko nữa.
  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postID)
      .select();

    if (error) alert("XOA BI LOI", error);
    if (data) {
      console.log("XOA THANH CONG");
      navigate("/");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 overflow-y-auto">
      <h1 className="text-5xl font-bold mb-4 text-center">{post.title}</h1>
      <div className="flex items-center mb-6 text-gray-500 gap-[30px]">
        <span className="mx-2">Tác giả: {authName} </span>
        <span>
          <Calendar className="w-4 h-4 mr-2 inline" />{" "}
          {new Date(post.published_at).toLocaleDateString("vi-VN")}
        </span>
        <span className="mx-2">Thể lọai: {category} </span>
      </div>

      <div className="prose max-w-none mb-6 ">
        {post.content_type == "markdown" ? (
          <>
            <MarkdownRender content={post.content} />
            <p className="text-center">--- hết ---</p>
          </>
        ) : (
          <div>k phải md</div>
        )}
      </div>
      <div className="flex space-x-4">
        <Button>
          <Link to={`/admin/edit/${postSlug}`} state={{ id: postID }}>
            Sửa
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Xóa</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import supabase from "@/config/supabaseClient";

interface Post {
  id: string;
  title: string;
  author_id: string;
  category_id: string;
  status: "published" | "draft";
  slug: string;
  content_type: string;
  published_at: Date;
  // deleted_at?: Date,
  profiles: {
    display_name: string;
  };
  categories: {
    name: string;
  };
}

export function PostManagement() {
  const [posts, setPosts] = useState<Post[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postStatus, setPostStatus] = useState("published");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTPERPAGES = 4;
  useEffect(() => {
    const fetchPublicPost = async () => {
      const startIndex = (currentPage - 1) * POSTPERPAGES;
      const endIndex = startIndex + POSTPERPAGES - 1;
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
          id, 
          title, 
          author_id, 
          category_id, 
          status, 
          slug, 
          content_type,
          published_at,
          profiles (display_name),       
          categories (name)              
        `
        )
        .eq("status", postStatus)
        .order("published_at", { ascending: false })
        .range(startIndex, endIndex);

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPublicPost();
  }, [currentPage, postStatus]);

  const handleNextPage = () => setCurrentPage(currentPage + 1);
  const handlePreviousPage = () =>
    setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);

  const filteredPosts = posts?.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (postId: string) => {
    setPosts(
      posts?.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: post.status === "published" ? "draft" : "published",
            }
          : post
      )
    );
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      setPosts(posts?.filter((post) => post.id !== postToDelete.id));
      const deletePost = async () => {
        const { data, error } = await supabase
          .from("posts") // Tên bảng
          .delete() // Hàm xóa bản ghi
          .eq("id", postToDelete.id); // Điều kiện để xác định bản ghi

        if (error) {
          console.error("Error deleting post:", error.message);
          return null;
        }
        console.log("Deleted post:", data);
        return data;
      };
      deletePost();
      setPostToDelete(null);
    }
  };
  if (!posts) return <div>loading</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post Management</h1>
      {/* <button className="m-5 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" onClick={() => { setPostStatus("published") }}>Published</button>
      <button className="m-5 px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition" onClick={() => { setPostStatus("deleted") }}>Deleted</button> */}
      <Input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            {postStatus == "published" ? (
              <TableHead>Time Creation</TableHead>
            ) : (
              <TableHead>Time Delete</TableHead>
            )}
            {/*<TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell>
                <Link to={`/admin/posts/${post.slug}`} state={{ id: post.id }}>
                  {post.title}
                </Link>
              </TableCell>
              <TableCell>{post.profiles.display_name}</TableCell>
              <TableCell>{post.categories.name}</TableCell>
              <TableCell>{post.content_type}</TableCell>
              {postStatus == "published" ? (
                <TableCell>
                  {new Date(post.published_at).toLocaleString()}
                </TableCell>
              ) : (
                <TableCell>null</TableCell>
              )}

              <TableCell>
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusToggle(post.id)}
                  className="mr-2"
                >
                  {post.status === 'published' ? 'Unpublish' : 'Publish'}
                </Button> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setPostToDelete(post)}
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  {postToDelete != null && (
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete this post?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete the post and remove its data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setPostToDelete(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeletePost}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center space-x-4 mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium text-gray-700">
          Trang {currentPage}
        </span>
        <button
          onClick={handleNextPage}
          disabled={posts.length < POSTPERPAGES}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next page"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

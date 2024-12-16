import { Routes, Route } from "react-router-dom";
import { AdminContent } from "@/pages/managementpage/AdminComponent";
import { UserManagement } from "@/pages/managementpage/UserManagement";
import { PostManagement } from "@/pages/managementpage/PostManagement";
import { UserDetail } from "@/pages/managementpage/UserDetail";
import PostManagementDetail from "@/components/management_components/PostManagementDetail";
import { AdminTopBar } from "@/components/AdminTopBar";
import CreatePost from "@/pages/CreatePost";
import EditPost from "@/pages/EditPost";
import CategoryManagement from "./CategoryManagement";


export function AdminDashboard() {
  return (
    <div className="h-screen bg-gray-100">
      <AdminTopBar />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* <AdminHeader /> */}

        <Routes>
          <Route path="/posts" element={<PostManagement />} />
          <Route path="/posts/:postSlug" element={<PostManagementDetail />} />
          <Route path="/" element={<AdminContent />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:postSlug" element={<EditPost />} />
          {/* <Route path="/tags" element={<TagsAdmin />} /> */}
          <Route path="/categories" element={<CategoryManagement/>}/>
          <Route path="/userdetail/:userId" element={<UserDetail />} />
          <Route path="/users" element={<UserManagement />} />
        </Routes>
      </div>
    </div>
  );
}

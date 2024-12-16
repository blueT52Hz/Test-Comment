import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { User, Post } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Blog from "@/components/Blog";
import supabase from "@/config/supabaseClient";

export const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileUser, setprofileUser] = useState();
  const [postUser, setpostUser] = useState();

  // Lấy hết thông tin người dùng trong Profiles
  useEffect(() => {
    const getUserProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("user_id", userId);
      if (error) {
        console.error("Error fetching role:", error);
      } else {
        setprofileUser(data);
        console.log("Trang chi tiết ng dùng - Profile:", data);
      }
    };

    const getUserPost = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("author_id", userId);
      if (error) {
        console.error("Error fetching role:", error);
      } else {
        setpostUser(data);
        console.log("Trang chi tiết ng dùng - Posts:", data);
      }
    };
    getUserProfile();
    getUserPost();
  }, [userId]);

  // Lấy tất cả bài viết trong post

  //   if (!userData) {
  //     return <div className="container mx-auto px-4 py-8">User not found</div>;
  //   }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen overflow-y-auto">
      {profileUser ? (
        <div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold">User Details</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              {/* <Avatar className="h-24 w-24">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar> */}
              <div>
                <h2 className="text-2xl font-semibold">
                  Name: {profileUser[0].display_name}
                </h2>
                {/* <p className="text-gray-600">{profileUser.email}</p>
                            <Badge variant={profileUser.role_id === 'admin' ? 'default' : 'secondary'} className="mt-2">
                            {profileUser.role.charAt(0).toUpperCase() + profileUser.role.slice(1)}
                            </Badge> */}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">User's Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <Blog
                isHomePage={false}
                category=""
                userID={profileUser[0].user_id}
              />
            </CardContent>
          </Card>
        </div>
      ) : (
        <>Không tìm thấy người dùng</>
      )}
    </div>
  );
};

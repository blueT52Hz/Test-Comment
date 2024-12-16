import React, { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function AdminHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = sessionStorage.getItem("id");
    console.log(storedUser);

    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);
  const handleLogout = (event) => {
    sessionStorage.removeItem("id");
    navigate("/login");
  };
  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/2">
          <Input
            type="text"
            placeholder="Search users or posts..."
            className="w-full"
          />
          <Button variant="ghost" size="icon" className="ml-2">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleLogout}>Đăng xuất</Button>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}

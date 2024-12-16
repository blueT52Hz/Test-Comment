import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DarkModeSwitch from "./DarkModeSwitch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { AdminTopBar } from "@/components/AdminTopBar";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("slug", encodeURIComponent(searchQuery.trim()));
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="fixed z-10 top-0 left-0 right-0 w-full border-b bg-background">
      <AdminTopBar />
      <header className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-3xl font-bold text-primary hover:text-primary/90"
            >
              ProPTIT Blog
            </Link>
            <nav className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" className="text-base">
                  Home
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base">
                    Lập Trình
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem className="py-2">
                    <Link to="/subject/Java" className="w-full">
                      Java
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2">
                    <Link to="/subject/JavaFX" className="w-full">
                      JavaFX
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2">
                    <Link to="/subject/C++" className="w-full">
                      C++
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2">
                    <Link to="/subject/C" className="w-full">
                      C
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-base">
                    Công nghệ
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem className="py-2">
                    <Link to="/tech/AI" className="w-full">
                      AI
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2">
                    <Link to="/tech/BlockChain" className="w-full">
                      BlockChain
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/aboutus">
                <Button variant="ghost" className="text-base">
                  About Us
                </Button>
              </Link>

              <Button variant="ghost" className="text-base">
                <a
                  href="https://proptit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  Website
                </a>
              </Button>
            </nav>
          </div>

          {/* Search, Auth, and Theme */}
          <div className="flex items-center space-x-6">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-64 pl-4 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Button>
            </form>

            {/* {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate("/create")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create Post
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80">
                      <AvatarImage src={user?.avatarUrl} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="py-2" onSelect={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="py-2" onSelect={handleLogout}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/login")}
                  className="text-base"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Register
                </Button>
              </div>
            )} */}

            <DarkModeSwitch />
          </div>
        </div>
      </header>
    </div>
  );
}

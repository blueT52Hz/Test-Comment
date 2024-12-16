import React from "react";
import { LeftSidebar } from "@/components/Sidebar/NewLeftSidebar";
import { RightSidebar } from "@/components/Sidebar/NewRightSidebar";
import { Button } from "../ui/button";
import { Menu, TrendingUp } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import DarkModeSwitch from "../DarkModeSwitch";
import { useLocation } from "react-router-dom";

export const PostDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isPostDetail = location.pathname.startsWith("/posts/");

  return (
    <div className="min-h-screen bg-background relative">
      {/* Header for Mobile with Menu Buttons */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-background p-4 flex justify-between items-center border-b">
        {/* Left Sidebar Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <LeftSidebar />
          </SheetContent>
        </Sheet>

        {/* Blog Title in the Middle */}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-semibold">ProPTIT's Blog</h1>
        </div>

        {/* Right Sidebar Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <TrendingUp className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 p-0">
            {!isPostDetail ? <RightSidebar /> : null}
          </SheetContent>
        </Sheet>

      </div>

      <div className="flex relative">
        <div className="flex justify-between">
          {/* Desktop Left Sidebar */}
          <div className="sm:fixed top-0 left-0 hidden md:block w-64 shrink-0">
            <LeftSidebar />
          </div>
          {/* Desktop Right Sidebar */}

          {!isPostDetail && (
            <div className="sm:fixed top-0 right-0 hidden md:block w-64 shrink-0">
              <RightSidebar />
            </div>
          )}
        </div>

        {/* Main Content */}
        <main className="flex-1 min-h-screen sm:mx-64 max-w-5xl">
          {children}
        </main>
      </div>
    </div>
  );
};

// src/pages/Search.tsx
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Posts from "@/components/Posts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Search() {
  const { keyword } = useParams<{ keyword: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("title");
  let timeoutId = null;
  useEffect(() => {
    setSearchQuery(keyword);
    console.log("key", keyword);
    console.log("search", searchQuery);
  }, [keyword]);

  const handleOnChange = (input) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // Đặt bộ hẹn giờ mới
    timeoutId = setTimeout(() => {
      setSearchQuery(input);
    }, 500);
  };

  return (
    <div>
      <Header />
      <div className="h-[150px]" />
      <div className="flex">
        {/* Left Sidebar */}
        <div className="min-w-[250px]">
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <main className="w-[full] flex-grow p-4">
          <h2 className="text-2xl font-bold mb-4">Trang tìm kiếm</h2>
          <div className="flex">
            <Select
              defaultValue="title"
              onValueChange={(value) => {
                setSearchType(value);
              }}
            >
              <SelectTrigger className="w-[120px] m-4 ">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="category">Category</SelectItem>
                <SelectItem value="tag">Tag</SelectItem>
              </SelectContent>
            </Select>
            <form className="relative w-full m-4 sm:w-2/3">
              <Input
                // value={searchQuery}
                defaultValue={searchQuery}
                onChange={(e) => {
                  handleOnChange(e.target.value);
                }}
                // onChange={(e) => {setSearchQuery(e.target.value)}}
                type="search"
                placeholder="Tìm kiếm..."
                className="w-full pl-4 pr-10 py-2 rounded-full"
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
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
          </div>
          <div className="mt-8 overflow-y-auto h-[350px]">
            {searchQuery?.trim() ? (
              <Posts
                filter="newest"
                search={{ type: searchType, query: searchQuery.trim() }}
              />
            ) : (
              <></>
            )}
          </div>
        </main>

        {/* Right Sidebar */}
        <div className="min-w-[250px] overflow-y-auto h-[550px]">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}

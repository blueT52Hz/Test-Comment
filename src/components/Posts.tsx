import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePosts } from "../hooks/usePosts";
import { ListViewPost } from "@/components/posts/ListViewPost";
import { GridViewPost } from "@/components/posts/GridViewPost";
import { ViewMode } from "@/components/posts/types";

interface PostsProps {
  filter: "newest" | "popular";
  category?: string;
  viewMode: ViewMode;
}

export default function Posts({ filter, category, viewMode }: PostsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const { posts, loading, error, totalCount } = usePosts({
    category,
    filter,
    page: currentPage,
    limit: postsPerPage,
  });

  const pageCount = Math.ceil(totalCount / postsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (posts.length === 0) return <div>No posts found</div>;

  return (
    <div>
      {viewMode === "list" ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <ListViewPost key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <GridViewPost key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={`${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed border-primary"
                  : "hover:bg-primary hover:text-primary-foreground"
              } transition-colors duration-200`}
            />
          </PaginationItem>
          {Array.from({ length: pageCount }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                isActive={currentPage === i + 1}
                className={`${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-primary/10 hover:border-primary"
                } transition-colors duration-200`}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < pageCount) setCurrentPage(currentPage + 1);
              }}
              className={`${
                currentPage === pageCount
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary hover:text-primary-foreground"
              } transition-colors duration-200`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

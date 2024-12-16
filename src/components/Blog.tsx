import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, LayoutList } from "lucide-react";
import Posts from "@/components/Posts";

interface BlogProps {
  isHomePage?: boolean;
  category?: string;
}

type ViewMode = "list" | "grid";

export default function Blog({ isHomePage = false, category }: BlogProps) {
  const [filter, setFilter] = useState<"newest" | "popular">("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="sticky top-16 bg-background z-10 pt-8 pb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Các bài viết:</h2>
        <div className="flex justify-between items-center">
          <div>
            {isHomePage && (
              <div className="mb-4 space-x-2">
                <Button
                  variant={filter === "newest" ? "default" : "outline"}
                  onClick={() => setFilter("newest")}
                >
                  Mới nhất
                </Button>
                <Button
                  variant={filter === "popular" ? "default" : "outline"}
                  onClick={() => setFilter("popular")}
                >
                  Nổi bật nhất
                </Button>
              </div>
            )}
            {category && (
              <div className="mb-4">
                <span className="text-lg font-semibold">
                  Category: {category}
                </span>
              </div>
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
          >
            {viewMode === "list" ? (
              <LayoutList className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto pt-4">
        <Posts filter={filter} category={category} viewMode={viewMode} />
      </div>
    </div>
  );
}

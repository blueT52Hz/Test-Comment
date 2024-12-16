import { LayoutGrid, LayoutList } from "lucide-react";
import { useLocation, useParams } from "react-router-dom"; // Import các hook từ React Router

interface HeaderProps {
  viewMode: "grid" | "list"; // Define the possible values for viewMode
  toggleViewMode: () => void; // Define toggleViewMode as a function with no arguments and no return value
}

export const Header = ({ viewMode, toggleViewMode }: HeaderProps) => (
  <div className="sticky top-16 sm:top-0 bg-background p-4 z-10 shadow-md">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Latest Posts</h2>
      <button
        onClick={toggleViewMode}
        className="p-2 rounded-lg items-center gap-2 bg-muted hover:shadow transition hidden sm:flex"
      >
        {viewMode === "grid" ? (
          <LayoutList className="w-5 h-5" />
        ) : (
          <LayoutGrid className="w-5 h-5" />
        )}
        <span className="text-sm font-medium">
          {viewMode === "grid" ? "List View" : "Grid View"}
        </span>
      </button>
    </div>
  </div>
);

import { useState } from "react";
import { Home, List, Tag, Archive, ChevronLeft, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: List, label: "Categories", path: "/categories" },
  { icon: Tag, label: "Tags", path: "/tags" },
  { icon: Archive, label: "Archives", path: "/archives" },
];

export function LeftSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      <div
        className={cn(
          "h-fit sticky top-40 border rounded-md bg-sidebar-bg transition-width duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <h1 className={cn("font-bold text-xl", collapsed && "hidden")}></h1>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-sidebar-hover rounded-md transition-colors"
            >
              {collapsed ? (
                <Menu className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>

          <nav className="flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center justify-center px-4 py-3 text-700 hover:bg-sidebar-hover transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className={cn("ml-8 flex-1 ", collapsed && "hidden")}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

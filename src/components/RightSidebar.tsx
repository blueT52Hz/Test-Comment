import { Tag, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTagsTrending } from "@/service/tag";

type Tag = {
  id: string;
  name: string | "heheheeh";
  slug: string;
  count: number;
};

const latestUpdates = [
  { title: "Getting Started with React", date: "2024-01-20" },
  { title: "TypeScript Best Practices", date: "2024-01-19" },
  { title: "CSS Grid Layout Guide", date: "2024-01-18" },
];

interface RightSidebarProps {
  children?: React.ReactNode; // Cho phép truyền `children`
}

export function RightSidebar({ children }: RightSidebarProps) {
  const [tags, setTags] = useState<Tag[] | []>([]);

  useEffect(() => {
    const getTag = async () => {
      const data = await getTagsTrending();
      if (!data) {
        console.error("Error");
        return;
      }
      setTags(data);
    };

    getTag();
  }, []);

  return (
    <div className="border rounded-md bg-sidebar-bg p-4">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <TrendingUp className="w-5 h-5 text-primary mr-2" />
          <h2 className="font-semibold">Trending Tags</h2>
        </div>
        <div className="space-y-2">
          {tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/tags/${tag.id.toLowerCase()}`}
              className="flex items-center justify-between p-2 hover:bg-sidebar-hover rounded transition-colors"
            >
              <div className="flex items-center">
                <Tag className="w-4 h-4 text-primary mr-2" />
                <span>{tag.name}</span>
              </div>
              <span className="text-sm text-500">{tag.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-4">Latest Updates</h2>
        <div className="space-y-4">
          {latestUpdates.map((update) => (
            <Link
              key={update.title}
              to="#"
              className="block p-3 border rounded-lg shadow-sm hover:shadow transition-shadow"
            >
              <h3 className="font-medium text-sm mb-1">{update.title}</h3>
              <time className="text-xs text-500">{update.date}</time>
            </Link>
          ))}
        </div>
      </div>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );
}

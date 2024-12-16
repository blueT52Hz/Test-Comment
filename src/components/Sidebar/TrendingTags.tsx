import { Tag as TagIcon, TrendingUp } from "lucide-react"; // Renamed Tag to TagIcon to avoid naming conflict
import { Tag } from "@/types/tag"; // Import Tag type correctly
import { Link } from "react-router-dom";

export const tags: Tag[] = [
  {
    id: "1",
    slug: "web-development",
    name: "Web Development",
    count: 120,
  },
  {
    id: "2",
    slug: "javascript",
    name: "JavaScript",
    count: 95,
  },
  {
    id: "3",
    slug: "react",
    name: "React",
    count: 80,
  },
  {
    id: "4",
    slug: "typescript",
    name: "TypeScript",
    count: 45,
  },
  {
    id: "5",
    slug: "nodejs",
    name: "Node.js",
    count: 60,
  },
  {
    id: "6",
    slug: "css",
    name: "CSS",
    count: 70,
  }
];

export const TrendingTags = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <TrendingUp className="w-5 h-5 text-primary mr-2" />
        <h2 className="font-semibold">Trending Tags</h2>
      </div>
      <div className="space-y-2">
        {tags.map((tag) => (
          <Link
            key={tag.id}
            to={`/tags/${tag.slug}`} // Use tag.slug for the URL
            className="flex items-center justify-between p-2 hover:bg-sidebar-hover rounded transition-colors"
          >
            <div className="flex items-center">
              <TagIcon className="w-4 h-4 text-primary mr-2" /> {/* Renamed Tag to TagIcon */}
              <span>{tag.name}</span>
            </div>
            <span className="text-sm text-500">{tag.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

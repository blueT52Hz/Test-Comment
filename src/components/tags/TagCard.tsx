import { Link } from "react-router-dom";
import { Tag } from "@/types/tag";
import { Tag as TagIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TagCardProps {
  tag: Tag;
}

const TagCard = ({ tag }: TagCardProps) => {
  return (
    <Link
      to={`/tags/${tag.slug}`}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-400 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
    >
      <TagIcon className="w-4 h-4" />
      <span className="group-hover:text-primary dark:group-hover:text-primary">
        {tag.name}
      </span>
      <Badge variant="secondary" className="ml-2">
        {tag.count || 0}
      </Badge>
    </Link>
  );
};

export default TagCard;

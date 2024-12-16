import { useEffect, useState } from "react";
import TagCard from "@/components/tags/TagCard";
import TagSkeleton from "@/components/tags/TagSkeleton";
import { Card } from "@/components/ui/card";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { Tag } from "@/types/tag";
import { getAllTags } from "@/service/tag";

const Tags = () => {
  const [isLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const getTags = async () => {
      const data = await getAllTags();
      if (!data) {
        console.error("Fail get tag");
        return;
      }
      console.log(data);
      setTags(data);
    };
    getTags();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto pb-12">
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex flex-col space-y-4 mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Danh sách các Tags:
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <TagSkeleton key={index} />
                  ))
                : tags.map((tag) => <TagCard key={tag.id} tag={tag} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;

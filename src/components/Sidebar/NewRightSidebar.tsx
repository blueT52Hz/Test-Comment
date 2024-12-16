import { TrendingTags } from "@/components/Sidebar/TrendingTags";
import { RecentPosts } from "@/components/Sidebar/RecentPosts";

export const RightSidebar = () => {
  return (
    <aside className="w-full border-l-2 p-4 h-screen overflow-hidden">
      {/* <div className="mb-4 flex justify-end">
          <DarkModeSwitch />
        </div> */}
      <TrendingTags />
      <RecentPosts />
    </aside>
  );
};

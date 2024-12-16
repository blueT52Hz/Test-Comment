import React, { useState, useEffect } from "react";
import { Folder, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
interface TOCItem {
  id: string;
  title: string;
  level: number;
  children: TOCItem[];
}
interface Tag {
  id: string;
  slug: string;
  name: string;
  count: number | null;
}
type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
};
interface Props {
  markdownContent: string;
  tags: Tag[] | [];
  category: Category | null;
}
const DynamicTableOfContents: React.FC<Props> = ({
  markdownContent,
  tags,
  category,
}) => {
  const [toc, setToc] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const generateTOC = (content: string): TOCItem[] => {
    const lines = content.split("\n");
    const tocItems: TOCItem[] = [];
    const stack: TOCItem[] = [];
    lines.forEach((line) => {
      if (line.startsWith("## ") || line.startsWith("### ")) {
        const level = line.startsWith("## ") ? 2 : 3;
        const title = line.slice(level + 1).trim();
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const item: TOCItem = { id, title, level, children: [] };
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }
        if (stack.length === 0) {
          tocItems.push(item);
        } else {
          stack[stack.length - 1].children.push(item);
        }
        stack.push(item);
      }
    });
    return tocItems;
  };

  useEffect(() => {
    if (markdownContent) {
      const tocData = generateTOC(markdownContent);
      setToc(tocData);
    }
  }, [markdownContent]);

  // Add scroll spy functionality
  useEffect(() => {
    let lastScrollY = window.scrollY; // Biến theo dõi hướng cuộn
    const observer = new IntersectionObserver(
      (entries) => {
        const sortedEntries = entries
          .map((entry) => ({
            id: entry.target.id,
            isIntersecting: entry.isIntersecting,
            top: entry.target.getBoundingClientRect().top,
          }))
          .sort((a, b) => a.top - b.top);

        const scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
        lastScrollY = window.scrollY;

        if (scrollDirection === "up") {
          const activeEntry =
            sortedEntries.find((entry) => entry.isIntersecting) ||
            sortedEntries.reverse().find((entry) => entry.top < 0);
          if (activeEntry) {
            setActiveId(activeEntry.id);
          }
        } else {
          const activeEntry = sortedEntries.find(
            (entry) => entry.isIntersecting
          );
          if (activeEntry) {
            setActiveId(activeEntry.id);
          }
        }
      },
      {
        rootMargin: "0px 0px -50% 0px",
        threshold: [0.1, 0.5, 1],
      }
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    const initialActiveHeading = Array.from(headings).find((heading) => {
      const rect = heading.getBoundingClientRect();
      return rect.top >= 0 && rect.bottom <= window.innerHeight;
    });
    if (initialActiveHeading) {
      setActiveId(initialActiveHeading.id);
    }

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  });

  const renderTOC = (items: TOCItem[]) => (
    <ul className="pl-4">
      {items.map((item) => (
        <li key={item.id} className="my-2">
          <a
            href={`#${item.id}`}
            className={cn("hover:underline transition-all duration-300", {
              "text-red-500 font-bold": activeId === item.id, // Đang active
              "text-blue-600": activeId !== item.id, // Không active
              "text-sm": item.level === 3, // Heading cấp 3
              "text-base": item.level !== 3, // Heading cấp 2
            })}
            onClick={(e) => {
              e.preventDefault();
              const targetElement = document.getElementById(item.id);
              if (targetElement) {
                const rootFontSize = parseFloat(
                  getComputedStyle(document.documentElement).fontSize
                );
                // const offset = 10 * rootFontSize;
                const offset = 0 * rootFontSize;
                const targetPosition =
                  targetElement.getBoundingClientRect().top +
                  window.scrollY -
                  offset;
                window.scrollTo({
                  top: targetPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            {item.title}
          </a>
          {item.children.length > 0 && renderTOC(item.children)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex fixed right-0 top-0 w-64">
      <div className="w-full border-l-2 p-4 h-screen overflow-hidden">
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <h2 className="font-semibold">Current Tags</h2>
          </div>
          <div className="space-y-2">
            {tags.map((tag) => (
              <Link
                key={tag.id}
                to={`/tags/${tag.name.toLowerCase()}`}
                className="flex items-center justify-between p-2 rounded transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
              >
                <div className="flex items-center">
                  <Tag className="w-4 h-4 text-primary mr-2 group-hover:text-primary" />
                  <span>{tag.name}</span>
                </div>
                <span className="text-sm text-500">{tag.count}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <h2 className="font-semibold">Current Category</h2>
          </div>
          <div className="space-y-2">
            <Link
              key={category?.id}
              to={`/tags/${category?.name.toLowerCase()}`}
              className="flex items-center justify-between p-2 rounded transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg"
            >
              <div className="flex items-center">
                <Folder className="w-4 h-4 text-primary mr-2 group-hover:text-white" />
                <span>{category?.name}</span>
              </div>
              <span className="text-sm text-500">{category?.count}</span>
            </Link>
          </div>
        </div>
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="font-semibold">Mục lục:</h2>
          </div>
          <div className="space-y-2">{renderTOC(toc)}</div>
        </div>
      </div>
    </div>
  );
};
export default DynamicTableOfContents;

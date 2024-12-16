import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import Blog from "@/components/Blog";

export default function Home() {
  const blogRef = useRef<HTMLDivElement>(null);

  const scrollToBlog = () => {
    if (blogRef.current) {
      const offset = 10 * 16; // 10rem -> pixels
      const elementTop =
        blogRef.current.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementTop - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[calc(100vh-4rem)]">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/1920/600"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Welcome to <br /> Our Tech Blog
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Discover the latest in programming and technology
            </p>
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
              onClick={scrollToBlog}
            >
              Start Reading
            </Button>
          </div>
        </div>
      </div>

      <div ref={blogRef} className="flex-grow bg-background">
        <div className="relative max-w-[1920px] mx-auto">
            

            <main className="w-full mx-auto">
              <Blog isHomePage={true} category="" />
            </main>

            
        </div>
      </div>
    </div>
  );
}

import { Link, NavLink } from "react-router-dom";
import { Input } from "../ui/input";
import {
  Home,
  LayoutList,
  Tags,
  Archive,
  Info,
  Moon,
  Github,
  Mail,
  Rss,
} from "lucide-react";
import { Button } from "../ui/button";
import { X, Twitter } from "lucide-react";
import DarkModeSwitch from "../DarkModeSwitch";

export const LeftSidebar = () => {
  return (
    <aside className="w-full h-screen border-r-2 bg-background p-4 flex flex-col">
      {/* <div className="flex justify-end mb-4">
        <DarkModeSwitch />
      </div> */}
      {/* Profile Section */}
      <div className="text-center mb-8">
        <img
          src="https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-1/466980787_1123076103154847_8465513501076266870_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=107&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeGJ2_ycSiVD5mFTpLuI57WNx3SNR6CDSlnHdI1HoINKWVA33siIyP2WjEwgtFDiY5vSuxMdS407jS7vwI1DmZKU&_nc_ohc=3JdF7iQjUYEQ7kNvgHtNh9I&_nc_zt=24&_nc_ht=scontent.fhan14-4.fna&_nc_gid=AzIVypeS1a1GbMTZC7f5efA&oh=00_AYA7zyl24LTRE7WosDeTr0vBaoUvI12F5a_L6rcve56gUQ&oe=676348A7"
          alt="Blog Logo"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-1">ProPTIT's Blog</h1>
        {/* <p className="text-muted-foreground text-sm">My Personal Blog</p> */}
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <Input type="search" placeholder="Search..." className="w-full" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/test"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 ${
                  isActive
                    ? "bg-accent/50 text-sky-500"
                    : "text-muted-foreground"
                } hover:text-primary hover:bg-accent/50 rounded-lg transition-colors`
              }
            >
              <Home size={20} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 ${
                  isActive
                    ? "bg-accent/50 text-sky-500"
                    : "text-muted-foreground"
                } hover:text-primary hover:bg-accent/50 rounded-lg transition-colors`
              }
            >
              <LayoutList size={20} />
              <span>Categories</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tags"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 ${
                  isActive
                    ? "bg-accent/50 text-sky-500"
                    : "text-muted-foreground"
                } hover:text-primary hover:bg-accent/50 rounded-lg transition-colors`
              }
            >
              <Tags size={20} />
              <span>Tags</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/archives"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 ${
                  isActive
                    ? "bg-accent/50 text-sky-500"
                    : "text-muted-foreground"
                } hover:text-primary hover:bg-accent/50 rounded-lg transition-colors`
              }
            >
              <Archive size={20} />
              <span>Archive</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 ${
                  isActive
                    ? "bg-accent/50 text-sky-500"
                    : "text-muted-foreground"
                } hover:text-primary hover:bg-accent/50 rounded-lg transition-colors`
              }
            >
              <Info size={20} />
              <span>About</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Social Links */}
      {/* <div className="mt-auto pt-4 border-t">
        <div className="flex justify-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Toggle theme">
              <Moon size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/buiquangdat1710" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="Email">
              <Mail size={20} />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a href="#" aria-label="RSS feed">
              <Rss size={20} />
            </a>
          </Button>
        </div>
      </div> */}

      <div className="flex justify-start mb-4">
        <DarkModeSwitch />
      </div>
    </aside>
  );
};

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function DarkModeSwitch() {
  const { theme, toggleTheme } = useTheme(); // Lấy giá trị theme và hàm toggleTheme từ context

  return (
    <button
      onClick={toggleTheme} // Gọi toggleTheme khi click
      className={`w-14 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 ${
        theme === "dark" ? "bg-white" : "bg-black"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full transition-transform duration-200 ease-in-out transform ${
          theme === "dark" ? "translate-x-6 bg-black" : "translate-x-0 bg-white"
        } flex items-center justify-center`}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-black" />
        )}
      </div>
    </button>
  );
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchForm() {
  return (
    <form className="w-full">
      <div className="flex items-center">
        {/* Dropdown Menu */}
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-s-lg flex items-center space-x-2 px-4 py-2"
            >
              <span>All</span>
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  d="m1 1 4 4 4-4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44">
            <DropdownMenuItem>Mockups</DropdownMenuItem>
            <DropdownMenuItem>Templates</DropdownMenuItem>
            <DropdownMenuItem>Design</DropdownMenuItem>
            <DropdownMenuItem>Logos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* Search Input */}
        <div className="relative flex-1">
          <Input
            type="search"
            placeholder="Search ..."
            className="rounded-none rounded-e-lg"
          />
          <Button
            type="submit"
            variant="default"
            className="absolute top-0 right-0 rounded-e-lg px-4 h-full"
          >
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </form>
  );
}

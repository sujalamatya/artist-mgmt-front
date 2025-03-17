import React from "react";
import { SidebarSeparator } from "@/components/ui/sidebar";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Assuming you're using shadcn's DropdownMenu
import { User, LogOut } from "lucide-react"; // Icons for dropdown items

const Navbar = () => {
  return (
    <header className="sticky top-0 w-full bg-background">
      <nav className="flex items-center justify-between w-full px-4 py-2">
        <div className="flex items-center gap-4">
          {/* Add additional navbar items here */}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="h-10 w-10 cursor-pointer border-2 border-white/20 hover:border-white/50 transition-colors bg-amber-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-lg bg-white/90 backdrop-blur-md shadow-lg border border-white/20"
          >
            <DropdownMenuItem className="p-2 hover:bg-gray-100/50 rounded-md cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 hover:bg-gray-100/50 rounded-md cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      {/* Separator below the navbar */}
      {/* <SidebarSeparator className="mx-0 mt-1" /> */}
    </header>
  );
};

export default Navbar;

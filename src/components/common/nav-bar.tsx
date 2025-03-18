import React from "react";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, HelpCircle, Bell, Mail } from "lucide-react"; // Import additional Lucide icons

const Navbar = () => {
  return (
    <div className="flex items-center justify-end p-2 right-0">
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
          {/* Profile */}
          <DropdownMenuItem className="p-2 hover:bg-gray-100/50 rounded-md cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {/* Help */}
          <DropdownMenuItem className="p-2 hover:bg-gray-100/50 rounded-md cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>

          {/* Logout */}
          <DropdownMenuItem className="p-2 hover:bg-gray-100/50 rounded-md cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;

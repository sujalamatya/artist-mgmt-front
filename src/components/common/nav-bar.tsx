"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HelpCircle, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle";
import { removeCookie } from "@/actions/cookies";

const Navbar = () => {
  const router = useRouter();
  const [userInitial, setUserInitial] = useState<string>("");

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.first_name) {
        setUserInitial(parsedUser.first_name[0].toUpperCase());
      }
    }
  }, []);

  const handleLogout = async () => {
    await removeCookie("access_token");
    await removeCookie("refresh_token");
    sessionStorage.removeItem("user");
    router.push("/"); // Redirect to home or login page
  };

  return (
    <div className="flex items-center justify-end gap-4 p-2">
      <ThemeToggle />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none relative flex items-center justify-center h-10 w-10 rounded-full bg-amber-600 text-white text-lg font-bold">
            {userInitial || "?"}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 rounded-lg bg-white dark:bg-gray-900 backdrop-blur-md shadow-lg border border-white/20"
        >
          <DropdownMenuItem
            className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex items-center p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-md cursor-pointer text-red-600 dark:text-red-400"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;

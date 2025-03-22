"use client";

import {
  Calendar,
  Library,
  Music,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

interface NavMainProps {
  items: NavItem[];
}

// NavMain component
export function NavMain({ items }: NavMainProps) {
  return (
    <nav>
      <ul className="space-y-1">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.url}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white rounded transition-all"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="transition-all duration-200 group-[.collapsed]:hidden">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Sidebar Data
const getNavItems = (role: string) => {
  const dashboardItem = {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  };
  const eventsItem = { title: "Events", url: "/events", icon: Calendar };
  const settingsItem = { title: "Settings", url: "/settings", icon: Settings };

  if (role === "artist") {
    return [
      dashboardItem,
      { title: "MyMusic", url: "/my-music", icon: Music },
      { title: "MyAlbums", url: "/my-albums", icon: Library },
      eventsItem,
      settingsItem,
    ];
  } else if (role === "super_admin" || "artist_manager") {
    return [
      dashboardItem,
      { title: "Artists", url: "/artists", icon: User },
      { title: "Music", url: "/music", icon: Music },
      { title: "Albums", url: "/albums", icon: Library },
      eventsItem,
      settingsItem,
    ];
  } else {
    // Default for other roles
    return [dashboardItem, eventsItem, settingsItem];
  }
};

// AppSidebar component
export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch the user role from sessionStorage on component mount
  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }
  }, []);

  // Get the navigation items based on the user role
  const navItems = userRole ? getNavItems(userRole) : [];

  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      {...props}
      className="group min-h-screen w-60"
    >
      <SidebarHeader>
        <Link href={"/dashboard"} className="flex items-center gap-2 p-2">
          {/* Ensure the Music icon is always visible */}
          <Music className="h-6 w-6 flex-shrink-0" />
          {/* Hide the text when collapsed */}
          <span className="text-xl font-bold transition-all duration-200 group-[.collapsed]:opacity-0 group-[.collapsed]:w-0 overflow-hidden">
            MelodySphere
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="ml-3 mt-10">
        <NavMain items={navItems} />
      </SidebarContent>
    </Sidebar>
  );
}

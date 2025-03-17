"use client";

import { Calendar, Library, Music, Settings, User } from "lucide-react";
import * as React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "../nav-main";

// Sample data.
const data = {
  teams: [
    {
      name: "MelodySphere",
      logo: Music,
      plan: "admin",
    },
  ],
  navMain: [
    { title: "Artists", url: "/artists", icon: User },
    { title: "Music", url: "/music", icon: Music },
    { title: "Albums", url: "/albums", icon: Library },
    { title: "Events", url: "/events", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props} className="group">
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2 p-2">
          {/* Ensure the Music icon is always visible */}
          <Music className="h-6 w-6 flex-shrink-0" />
          {/* Hide the text when collapsed */}
          <span className="text-xl font-bold transition-all duration-200 group-[.collapsed]:opacity-0 group-[.collapsed]:w-0 overflow-hidden">
            MelodySphere
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}

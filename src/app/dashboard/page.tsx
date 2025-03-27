"use client"; // Ensure this runs only on the client side

import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/nav-bar";
import ImageCarousel from "@/components/dashboard/main-pics";
import { TotalAlbums } from "@/components/dashboard/total-album";
import { TotalArtists } from "@/components/dashboard/total-artist";
import { useEffect, useState } from "react";
// import { MySongs } from "@/components/dashboard/my-songs";
// import { MyAlbums } from "@/components/dashboard/my-albums";
import { MusicGenresChart } from "@/components/dashboard/music-genre-chart";
import { MyMusicChart } from "@/components/dashboard/my-music-genre-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
  }, []);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header Section */}
          <header className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Home</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Navbar />
          </header>

          {/* Main Content */}
          <div className="p-4">
            <ImageCarousel />
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-6">
              {userRole === "artist" ? (
                <>
                  <MyMusicChart />
                  <div>My songs</div>
                  <div>My albums</div>
                  {/* <MySongs />
                  <MyAlbums /> */}
                </>
              ) : (
                <>
                  <MusicGenresChart />
                  <TotalArtists />
                  <TotalAlbums />
                </>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

"use client";

import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/nav-bar";
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
import ArtistsPerMonthChart from "@/features/dashboard/components/artist-date";
import ImageCarousel from "@/features/dashboard/components/main-pics";
import { MusicGenresChart } from "@/features/dashboard/components/music-genre-chart";
import { MyMusicChart } from "@/features/dashboard/components/my-music-genre-chart";
import MyTotalAlbums from "@/features/dashboard/components/my-total-alnums";
import MyTotalSongs from "@/features/dashboard/components/my-total-songs";
import SongsPerArtistChart from "@/features/dashboard/components/songs-chart";
import TotalAlbums from "@/features/dashboard/components/total-album";
import TotalArtists from "@/features/dashboard/components/total-artist";
import UserRolesDonutChart from "@/features/dashboard/components/user-role-chart";
import { useEffect, useState } from "react";

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
                  <MyTotalSongs />
                  <MyTotalAlbums />
                </>
              ) : (
                <>
                  <MusicGenresChart />
                  <TotalArtists />
                  <TotalAlbums />
                  <SongsPerArtistChart artistIds={[4, 6, 22, 20, 18]} />
                  <UserRolesDonutChart />
                  <ArtistsPerMonthChart />
                </>
              )}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

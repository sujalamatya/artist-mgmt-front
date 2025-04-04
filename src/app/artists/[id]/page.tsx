import ViewArtist from "@/components/artist-profile";
import ArtistProfileSongs from "@/components/artist-profile-songs";
import Navbar from "@/components/common/nav-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function ArtistP() {
  return (
    <div>
      <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/artists">Go back</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Artist Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Navbar />
      </header>
      <div className="w-full p-4 mt-10">
        <ViewArtist />
        <ArtistProfileSongs />
      </div>
    </div>
  );
}

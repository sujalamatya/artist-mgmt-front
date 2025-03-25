// app/artists/page.tsx
import ArtistTable from "@/components/artist/artist-table";
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
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Artist() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb className="top-0">
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Artist</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="px-4">
              <Navbar />
            </div>
          </header>
          <div className=" w-full h-full gap-4 p-4 mt-10">
            <div className="flex justify-end">
              <Link href="/artists/add">
                <Button className="mr-16" variant={"outline"}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Artist
                </Button>
              </Link>
            </div>
            <ArtistTable />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

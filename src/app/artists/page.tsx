import ArtistTable from "@/components/artist-table";
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

export default function Artist() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          {/* Header with SidebarTrigger, Breadcrumb, and Navbar */}
          <header className="flex h-16 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            {/* Left side: SidebarTrigger and Breadcrumb */}
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

            {/* Right side: Navbar */}
            <div className="px-4">
              <Navbar />
            </div>
          </header>
          {/* Main content */}
          <div className="flex flex-col w-full h-full gap-4 p-4 mt-10">
            <ArtistTable />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

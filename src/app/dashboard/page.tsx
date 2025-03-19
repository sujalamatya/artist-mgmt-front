import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/nav-bar";
import ImageCarousel from "@/components/main-pics";
import { TotalArtists } from "@/components/total-artist";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Album } from "lucide-react"; // Icons
import { MusicGenresChart } from "@/components/music-genre-chart";

export default function Page() {
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
              {/* Music Card */}
              <MusicGenresChart />

              {/* Total Artists */}
              <TotalArtists />

              {/* Albums Card */}
              <Card className="dark:bg-muted/40">
                <CardHeader className="flex items-center gap-3">
                  <Album className="w-6 h-6 text-primary" />
                  <CardTitle>Albums</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold">Coming soon</p>
                  <p className="text-muted-foreground text-sm">
                    Album statistics feature
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

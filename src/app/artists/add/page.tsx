import AddArtist from "@/features/artist/components/artist-add";
import Navbar from "@/components/common/nav-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AddArtistP() {
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
              <BreadcrumbPage>Add Artist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Navbar />
      </header>
      <div className="w-full p-4 mt-10">
        <AddArtist />
      </div>
    </div>
  );
}

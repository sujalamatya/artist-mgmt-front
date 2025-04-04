"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Eye, Edit, Trash } from "lucide-react";
import { fetchArtistsByUserId, deleteArtist } from "@/api/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastContainer, toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function MyArtistTable() {
  const [artists, setArtists] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (!storedUser) {
      toast.error("User not found in session.");
      setIsLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user?.id;

    if (!userId) {
      toast.error("Invalid user data.");
      setIsLoading(false);
      return;
    }

    const getArtists = async () => {
      setIsLoading(true);
      try {
        const data = await fetchArtistsByUserId(userId, page, pageSize);
        setArtists(data.artists);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching artists:", error);
        toast.error("Failed to load artists");
      } finally {
        setIsLoading(false);
      }
    };
    getArtists();
  }, [page, pageSize]);

  const handleEdit = (id: number) => {
    router.push(`/artists/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        await deleteArtist(id);
        toast.success("Artist deleted successfully!");
        setArtists(artists.filter((artist) => artist.id !== id));
      } catch (error) {
        console.error("Error deleting artist:", error);
        toast.error("Failed to delete artist.");
      }
    }
  };

  const handleView = (id: number) => {
    router.push(`/artists/${id}`);
  };

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-4 md:p-6 space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="text-muted-foreground">
            List of My Artists
          </TableCaption>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="min-w-[150px]">Name</TableHead>
              <TableHead className="w-[120px]">Date of Birth</TableHead>
              <TableHead className="w-[100px]">Gender</TableHead>
              <TableHead className="min-w-[180px]">Address</TableHead>
              <TableHead className="w-[120px]">First Release</TableHead>
              <TableHead className="w-[120px]">Albums</TableHead>
              <TableHead className="w-[140px]">Joined At</TableHead>
              <TableHead className="w-[140px]">Updated At</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[120px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[80px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : artists.length > 0 ? (
              artists.map((artist) => (
                <TableRow key={artist.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Avatar className="h-[5rem] w-[5rem]">
                      <AvatarImage
                        src={
                          artist.image
                            ? `http://localhost:8000${artist.image}`
                            : undefined
                        }
                        alt={artist.name}
                      />
                      <AvatarFallback>
                        {artist.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{artist.name}</TableCell>
                  <TableCell>{artist.dob || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {artist.gender || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {artist.address || "-"}
                  </TableCell>
                  <TableCell>{artist.first_release_year || "-"}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {artist.no_of_albums || "0"} albums
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(artist.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(artist.updated_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleView(artist.id)}
                          className="cursor-pointer gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEdit(artist.id)}
                          className="cursor-pointer gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(artist.id)}
                          className="cursor-pointer text-destructive focus:text-destructive gap-2"
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} className="h-24 text-center">
                  No artists found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center gap-2 pt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteSong, fetchMyMusic, searchMyMusic } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, MoreVertical, Search, Trash } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";

export default function MyMusicTable() {
  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetchMyMusic();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
        toast.error("Failed to load songs");
      } finally {
        setIsLoading(false);
      }
    };
    getSongs();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const data = await searchMyMusic(searchQuery);
      setSongs(data);
    } catch (error) {
      console.error("Error searching songs:", error);
      toast.error("Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await deleteSong(id);
        toast.success("Song deleted successfully!");
        setSongs(songs.filter((song) => song.id !== id));
      } catch (error) {
        console.error("Error deleting song:", error);
        toast.error("Failed to delete song.");
      }
    }
  };

  const handleView = (id: number) => {
    router.push(`/music/${id}`);
  };

  return (
    <div className="flex flex-col w-full p-4 md:p-6 gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search songs..."
            className="w-full pl-9 pr-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <Button
          onClick={() => router.push("/my-music/add")}
          className="w-full md:w-auto"
          variant={"outline"}
        >
          Add New Song
        </Button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="text-muted-foreground">
            Your music collection
          </TableCaption>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[25%]">Title</TableHead>
              <TableHead className="w-[20%]">Album</TableHead>
              <TableHead className="w-[15%]">Genre</TableHead>
              <TableHead className="w-[15%]">Created</TableHead>
              <TableHead className="w-[15%]">Updated</TableHead>
              <TableHead className="w-[10%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-[80%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[60%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[50%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70%]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[70%]" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : songs.length > 0 ? (
              songs.map((song) => (
                <TableRow key={song.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{song.title}</TableCell>
                  <TableCell>{song.album_name || "-"}</TableCell>
                  <TableCell>{song.genre}</TableCell>
                  <TableCell>
                    {new Date(song.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(song.updated_at).toLocaleDateString()}
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
                          onClick={() => handleView(song.id)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(song.id)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  {searchQuery
                    ? "No matching songs found"
                    : "No songs added yet"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

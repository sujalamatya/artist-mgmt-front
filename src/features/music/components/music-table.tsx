"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import { Eye, MoreVertical, Search } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import { Badge } from "../../../components/ui/badge";
import ExportCSVButton from "../../csv/components/export-csv";
import ImportCSVButton from "../../csv/components/import-csv";
import { searchSongs } from "../actions/music.action";
import { fetchArtistSongs } from "@/features/artist/actions/artist.action";

export default function MusicTable() {
  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getSongs = async () => {
      try {
        const data = await fetchArtistSongs();
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
      const data = searchQuery
        ? await searchSongs(searchQuery)
        : await fetchArtistSongs();
      setSongs(data);
    } catch (error) {
      console.error("Error searching songs:", error);
      toast.error("Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (id: number) => {
    router.push(`/music/${id}`);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto p-4 md:p-6 gap-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableCaption className="text-muted-foreground">
            List of all songs
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
                  <TableCell>
                    <Badge variant="outline">{song.genre}</Badge>
                  </TableCell>
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
                          className="cursor-pointer gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
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
                    : "No songs available"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between">
        <ImportCSVButton />
        <ExportCSVButton />
      </div>
    </div>
  );
}

"use client";

import { fetchArtistSongs, searchSongsById } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtistProfileSongs() {
  const params = useParams();
  const id = params.id as string;

  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (id) {
      const artistId = parseInt(id, 10);
      const getSongs = async () => {
        try {
          const data = await fetchArtistSongs(artistId);
          setSongs(data);
        } catch (error) {
          console.error("Error fetching songs:", error);
        } finally {
          setIsLoading(false);
        }
      };
      getSongs();
    }
  }, [id]);

  const handleSearch = async () => {
    if (!id) return;
    try {
      const artistId = parseInt(id, 10);
      const data = searchQuery
        ? await searchSongsById(searchQuery, artistId)
        : await fetchArtistSongs(artistId);
      setSongs(data);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-6 w-full mt-4" />
        <Skeleton className="h-6 w-full mt-2" />
        <Skeleton className="h-6 w-full mt-2" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Artist Songs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border px-3.5 py-2 mb-4">
            <Input
              type="search"
              placeholder="Search"
              className="w-full border-0 h-8 font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button variant="ghost" size="icon" onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
            {/* <Button onClick={handleSearch}>Search</Button> */}
          </div>
          {songs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Album</TableHead>
                  <TableHead>Genre</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {songs.map((song) => (
                  <TableRow key={song.id}>
                    <TableCell>{song.title}</TableCell>
                    <TableCell>{song.album_name}</TableCell>
                    <TableCell>{song.genre}</TableCell>
                    <TableCell>
                      {new Date(song.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No songs available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

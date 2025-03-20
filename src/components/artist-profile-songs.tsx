"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchArtistSongs } from "@/api/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArtistProfileSongs() {
  const params = useParams();
  const id = params.id as string;

  const [songs, setSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

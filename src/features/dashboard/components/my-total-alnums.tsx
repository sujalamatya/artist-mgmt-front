"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Album } from "lucide-react";
import { fetchMyMusic } from "../actions/dashboard.action";

export default function MyTotalAlbums() {
  const [albumCount, setAlbumCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlbum = async () => {
      try {
        const songs = await fetchMyMusic();
        const uniqueAlbums = new Set(
          songs.map((song: { album_name: string }) => song.album_name)
        );
        setAlbumCount(uniqueAlbums.size);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    getAlbum();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <Album className="w-6 h-6 text-primary" />
        <CardTitle>Albums</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-2 text-muted-foreground text-sm">Loading...</p>
          </div>
        ) : albumCount !== null ? (
          <>
            <p className="mt-10 text-7xl font-semibold">{albumCount}</p>
            <p className="text-muted-foreground text-sm">Your Total Albums</p>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}

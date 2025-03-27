"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ListMusic } from "lucide-react";
import { fetchMyMusic } from "@/api/api";

export function MyTotalSongs() {
  const [songsCount, setSongsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      try {
        const songs = await fetchMyMusic();
        setSongsCount(songs.length);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    getSongs();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <ListMusic className="w-6 h-6 text-primary" />
        <CardTitle>Songs</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-2 text-muted-foreground text-sm">Loading...</p>
          </div>
        ) : songsCount !== null ? (
          <>
            <p className="mt-10 text-7xl font-semibold">{songsCount}</p>
            <p className="text-muted-foreground text-sm">Total Songs By You</p>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}

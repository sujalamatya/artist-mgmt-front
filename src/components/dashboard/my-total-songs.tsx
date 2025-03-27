"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { fetchMyMusic } from "@/api/api";

export function MyTotalSongs() {
  const [songsCount, setsongsCount] = useState<number | null>(null);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const songs = await fetchMyMusic();
        setsongsCount(songs.length);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    getArtists();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <Users className="w-6 h-6 text-primary" />
        <CardTitle>Artists</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-10 text-7xl font-semibold">
          {songsCount !== null ? songsCount : "Loading..."}
        </p>
        <p className="text-muted-foreground text-sm">Total Songs By You</p>
      </CardContent>
    </Card>
  );
}

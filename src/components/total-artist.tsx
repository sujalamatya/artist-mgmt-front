"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { fetchArtists } from "@/api/api";

export function TotalArtists() {
  const [artistCount, setArtistCount] = useState<number | null>(null);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const artists = await fetchArtists();
        setArtistCount(artists.length);
      } catch (error) {
        console.error("Error fetching artists:", error);
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
        <p className="text-2xl font-semibold">
          {artistCount !== null ? artistCount : "Loading..."}
        </p>
        <p className="text-muted-foreground text-sm">
          Total registered artists
        </p>
      </CardContent>
    </Card>
  );
}

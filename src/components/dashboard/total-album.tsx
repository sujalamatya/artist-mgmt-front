"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Album } from "lucide-react";
import axios from "axios";

export function TotalAlbums() {
  const [albumCount, setAlbumCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Get token from localStorage

        if (!token) {
          console.error("No token found. Please log in.");
          return;
        }

        const response = await axios.get(
          "http://127.0.0.1:8000/api/artist/songs/",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to request
            },
          }
        );

        const songs = response.data;
        const uniqueAlbums = new Set(songs.map((song: any) => song.album_name));

        setAlbumCount(uniqueAlbums.size);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <Album className="w-6 h-6 text-primary" />
        <CardTitle>Albums</CardTitle>
      </CardHeader>
      <CardContent>
        {albumCount !== null ? (
          <>
            <p className="mt-10 text-7xl font-semibold">{albumCount}</p>
            <p className="text-muted-foreground text-sm ">Total albums</p>
          </>
        ) : (
          <p className="text-muted-foreground text-sm">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}

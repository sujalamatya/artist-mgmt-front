"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { fetchArtists } from "@/api/api";

export function TotalArtists() {
  const [artistCount, setArtistCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getArtists = async () => {
      setIsLoading(true);
      try {
        const response = await fetchArtists(1, 1); // Minimal fetch just to get the count

        if (response && typeof response.total_count === "number") {
          setArtistCount(response.total_count);
        } else {
          console.error("Unexpected API response format");
          setArtistCount(0);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
        setArtistCount(0); // Fallback to 0 on error
      } finally {
        setIsLoading(false);
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
        {!isLoading ? (
          <>
            <p className="mt-10 text-7xl font-semibold">
              {artistCount !== null ? artistCount : "0"}
            </p>
            <p className="text-muted-foreground text-sm">
              Total registered artists
            </p>
          </>
        ) : (
          <p className="mt-10 text-7xl font-semibold">Loading...</p>
        )}
      </CardContent>
    </Card>
  );
}

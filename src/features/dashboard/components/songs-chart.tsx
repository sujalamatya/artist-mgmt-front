"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchArtistSongs } from "@/features/artist/actions/artist.action";

type Song = {
  id: number;
  title: string;
  artist_id: number;
  artist_name: string;
};

type ChartData = {
  artist: string;
  songCount: number;
};

export default function SongsPerArtistChart({
  artistIds,
}: {
  artistIds?: number[];
}) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        let songs: Song[] = [];

        if (artistIds && artistIds.length > 0) {
          const allSongs = await Promise.all(
            artistIds.map((id) => fetchArtistSongs(id))
          );
          songs = allSongs.flat();
        } else {
          songs = await fetchArtistSongs();
        }

        const grouped: { [artist: string]: number } = {};
        songs.forEach((song) => {
          const artistName = song.artist_name || `Artist ${song.artist_id}`;
          grouped[artistName] = (grouped[artistName] || 0) + 1;
        });

        const chart: ChartData[] = Object.entries(grouped).map(
          ([artist, songCount]) => ({
            artist,
            songCount,
          })
        );

        setChartData(chart);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, [artistIds]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Number of Songs per Artist</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="artist" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="songCount" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

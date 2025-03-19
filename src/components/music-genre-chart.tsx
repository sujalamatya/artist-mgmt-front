"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import axios from "axios";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#d45087",
  "#0088FE",
  "#00C49F",
];

export const MusicGenresChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/artist/songs/"
        );
        const songs = response.data;

        // Count genres
        const genreCount: Record<string, number> = {};
        songs.forEach((song: { genre: string }) => {
          genreCount[song.genre] = (genreCount[song.genre] || 0) + 1;
        });

        // Format data for Pie Chart
        const chartData = Object.keys(genreCount).map((genre) => ({
          name: genre,
          value: genreCount[genre],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusic();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <Music className="w-6 h-6 text-primary" />
        <CardTitle>Music Genres</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {data.length > 0 ? (
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        ) : (
          <p className="text-sm text-muted-foreground">No data available</p>
        )}
      </CardContent>
    </Card>
  );
};

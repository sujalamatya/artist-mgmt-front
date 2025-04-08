"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music } from "lucide-react";
import { fetchMyMusic } from "../actions/dashboard.action";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#d45087",
  "#0088FE",
  "#00C49F",
];

export const MyMusicChart = () => {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const songs = await fetchMyMusic();

        // Count genres
        const genreCount: Record<string, number> = {};
        songs.forEach((song: { genre: string }) => {
          genreCount[song.genre] = (genreCount[song.genre] || 0) + 1;
        });

        // Format data for Pie Chart
        const chartData = Object.entries(genreCount).map(([name, value]) => ({
          name,
          value,
        }));

        setData(chartData);
      } catch (error) {
        setError("Failed to fetch user music data.");
        console.error("Error fetching user music data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return (
    <Card className="dark:bg-muted/40">
      <CardHeader className="flex items-center gap-3">
        <Music className="w-6 h-6 text-primary" />
        <CardTitle>My Music Genres</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                label
                outerRadius={80}
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
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-muted-foreground">No data available</p>
        )}
      </CardContent>
    </Card>
  );
};

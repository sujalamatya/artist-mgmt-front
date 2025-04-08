"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { format, parseISO } from "date-fns";
import { fetchArtists } from "@/features/artist/actions/artist.action";

type Artist = {
  id: number;
  created_at?: string;
};

type MonthlyData = {
  month: string;
  count: number;
};

export default function ArtistsPerMonthChart() {
  const [chartData, setChartData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllArtists = async () => {
      try {
        setLoading(true);
        let allArtists: Artist[] = [];
        let currentPage = 1;
        let hasMore = true;
        const pageSize = 10; // Adjust based on your API's max page size

        // Fetch all pages of artists
        while (hasMore) {
          const response = await fetchArtists(currentPage, pageSize);
          allArtists = [...allArtists, ...response.artists];

          hasMore = response.next_page !== null;
          currentPage++;
        }

        // Process the data
        const counts: Record<string, number> = {};

        allArtists.forEach((artist) => {
          if (!artist.created_at) return;

          try {
            const date = parseISO(artist.created_at);
            const key = format(date, "yyyy-MM");
            counts[key] = (counts[key] || 0) + 1;
          } catch (err) {
            console.warn("Invalid date format for artist:", artist);
          }
        });

        // Sort and format for chart
        const sorted = Object.entries(counts)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([month, count]) => ({
            month: format(parseISO(month + "-01"), "MMM yyyy"),
            count,
          }));

        setChartData(sorted);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAllArtists();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Artists Joined Per Month</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            Loading artist data...
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            No artist data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                interval={Math.ceil(chartData.length / 6) - 1} // Show ~6 labels
              />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [`${value} artists`, "Count"]}
                labelFormatter={(label) => `Month: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="count"
                name="Artists"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

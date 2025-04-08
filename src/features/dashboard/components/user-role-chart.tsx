"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { fetchUsers } from "@/features/user/actions/user.action";

type User = {
  id: number;
  role: "super_admin" | "artist_manager" | "artist";
};

type RoleData = {
  name: string;
  value: number;
};

const COLORS = ["#6366f1", "#10b981", "#f59e0b"]; // Tailwind Indigo, Green, Amber

export default function UserRolesDonutChart() {
  const [data, setData] = useState<RoleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users: User[] = await fetchUsers();

        const counts = {
          super_admin: 0,
          artist_manager: 0,
          artist: 0,
        };

        users.forEach((user) => {
          if (counts.hasOwnProperty(user.role)) {
            counts[user.role]++;
          }
        });

        const chartData: RoleData[] = [
          { name: "Super Admin", value: counts.super_admin },
          { name: "Artist Manager", value: counts.artist_manager },
          { name: "Artist", value: counts.artist },
        ];

        setData(chartData);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Roles Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

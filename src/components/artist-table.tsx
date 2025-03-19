"use client";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { fetchArtists } from "@/api/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ArtistTable() {
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    const getArtists = async () => {
      try {
        const data = await fetchArtists();
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    getArtists();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="rounded-lg border shadow-md overflow-hidden">
        <Table className="w-full text-sm text-left">
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of Artists.
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Date Of Birth</TableHead>
              <TableHead className="px-4 py-2">Gender</TableHead>
              <TableHead className="px-4 py-2">Address</TableHead>
              <TableHead className="px-4 py-2">First Release Year</TableHead>
              <TableHead className="px-4 py-2">Albums Released</TableHead>
              <TableHead className="px-4 py-2">Joined At</TableHead>
              <TableHead className="px-4 py-2">Updated At</TableHead>
              <TableHead className="px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artists.length > 0 ? (
              artists.map((artist) => (
                <TableRow
                  key={artist.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TableCell className="px-4 py-2">{artist.name}</TableCell>
                  <TableCell className="px-4 py-2">{artist.dob}</TableCell>
                  <TableCell className="px-4 py-2">{artist.gender}</TableCell>
                  <TableCell className="px-4 py-2">{artist.address}</TableCell>
                  <TableCell className="px-4 py-2">
                    {artist.first_release_year}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {artist.no_of_albums}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(artist.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(artist.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="flex justify-center px-4 py-2">
                    <Eye />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  No artists found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

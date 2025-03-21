"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchArtistSongs, searchSongs } from "@/api/api";
import { MoreVertical, Eye, Edit, Trash, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToastContainer, toast } from "react-toastify";
import { Input } from "../ui/input";

export default function MusicTable() {
  const [songs, setSongs] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  useEffect(() => {
    setIsMounted(true);
    const getSongs = async () => {
      try {
        const data = await fetchArtistSongs(); // No ID needed
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };
    getSongs();
  }, []);

  const handleSearch = async () => {
    try {
      const data = searchQuery
        ? await searchSongs(searchQuery)
        : await fetchArtistSongs();
      setSongs(data);
    } catch (error) {
      console.error("Error searching songs:", error);
    }
  };

  const handleView = (id: number) => {
    if (isMounted) {
      router.push(`/music/${id}`);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <div className="flex items-center w-full max-w-sm space-x-2 rounded-lg border px-3.5 py-2 mb-4">
        <Search className="h-4 w-4" />
        <Input
          type="search"
          placeholder="Search"
          className="w-full border-0 h-8 font-semibold"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="dark:bg-gray-500" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="rounded-lg border shadow-md overflow-hidden">
        <Table className="w-full text-sm text-left">
          <TableCaption className="text-gray-500 dark:text-gray-400">
            A list of Songs.
          </TableCaption>
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            <TableRow>
              <TableHead className="px-4 py-2">Title</TableHead>
              <TableHead className="px-4 py-2">Album</TableHead>
              <TableHead className="px-4 py-2">Genre</TableHead>
              <TableHead className="px-4 py-2">Created At</TableHead>
              <TableHead className="px-4 py-2">Updated At</TableHead>
              <TableHead className="px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.length > 0 ? (
              songs.map((song) => (
                <TableRow
                  key={song.id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <TableCell className="px-4 py-2">{song.title}</TableCell>
                  <TableCell className="px-4 py-2">{song.album_name}</TableCell>
                  <TableCell className="px-4 py-2">{song.genre}</TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(song.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {new Date(song.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="px-4 py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleView(song.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="px-4 py-2 text-center text-gray-500 dark:text-gray-400"
                >
                  No songs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

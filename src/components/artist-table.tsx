"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for newer Next.js versions
import { MoreVertical, Eye, Edit, Trash } from "lucide-react";
import { fetchArtists, deleteArtist } from "@/api/api";
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

export default function ArtistTable() {
  const [artists, setArtists] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Track mount status
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

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

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        await deleteArtist(id);
        toast.success("Artist deleted successfully!");
        setArtists(artists.filter((artist) => artist.id !== id));
      } catch (error) {
        console.error("Error deleting artist:", error);
        toast.error("Failed to delete artist.");
      }
    }
  };

  const handleView = (id: number) => {
    if (isMounted) {
      router.push(`/artists/${id}`); // Navigate only if mounted
    }
  };

  if (!isMounted) {
    return null; // Prevent rendering on server
  }

  return (
    <div className="w-full max-w-8xl mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} />
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
                  <TableCell className="px-4 py-2 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleView(artist.id)} // Use handleView for navigation
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => console.log(`Edit ${artist.id}`)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(artist.id)}
                          className="text-red-500"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={9}
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

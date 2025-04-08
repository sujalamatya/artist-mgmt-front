"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/common/nav-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { addArtistSong } from "../actions/artist.action";

const GENRES = [
  "Blues",
  "country",
  "Hip-Hop",
  "Jazz",
  "Lo-Fi",
  "pop",
  "rap",
  "Rock",
  "rnb",
] as const;

export default function AddSongPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState<(typeof GENRES)[number]>("Blues");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSong = async () => {
    if (!title.trim() || !album.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    toast.promise(
      addArtistSong({ artist_id: id, title, album_name: album, genre }),
      {
        loading: "Adding song...",
        success: () => {
          router.push(`/artists/${id}`);
          return "Song added successfully!";
        },
        error: (error) => {
          console.error("Error adding song:", error);
          return "Failed to add song. Please try again.";
        },
        finally: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 shrink-0 items-center justify-between px-4 md:px-6 border-b bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/artists"
                className="hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/artists");
                }}
              >
                Artists
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">
                Add Song
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Navbar />
      </header>

      <main className="flex-1 flex items-center justify-center p-4 ">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Add New Song
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSong();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter song title"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="album" className="text-sm font-medium">
                  Album <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="album"
                  type="text"
                  value={album}
                  onChange={(e) => setAlbum(e.target.value)}
                  placeholder="Enter album name"
                  className="focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-sm font-medium">
                  Genre
                </Label>
                <Select
                  value={genre}
                  onValueChange={(value) =>
                    setGenre(value as (typeof GENRES)[number])
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map((genreOption) => (
                      <SelectItem key={genreOption} value={genreOption}>
                        {genreOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/artists/${id}`)}
                  disabled={isLoading}
                  className="w-24"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="w-24">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Song"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

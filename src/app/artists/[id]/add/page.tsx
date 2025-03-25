"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { addArtistSong } from "@/api/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddSongPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("Blues");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSong = async () => {
    if (!title || !album) return alert("Please fill in all fields.");
    try {
      setIsLoading(true);
      await addArtistSong({ artist_id: id, title, album_name: album, genre });
      router.push(`/artists/${id}`);
    } catch (error) {
      console.error("Error adding song:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add New Song</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter song title"
              />
            </div>
            <div>
              <Label>Album</Label>
              <Input
                type="text"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="Enter album name"
              />
            </div>
            <div>
              <Label>Genre</Label>
              <Input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Enter genre"
              />
            </div>
            <Button onClick={handleAddSong} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Song"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

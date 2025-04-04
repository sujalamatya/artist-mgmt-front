"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { createMyMusic } from "../actions/music.action";

const genres = [
  "rnb",
  "country",
  "pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Blues",
  "Lo-Fi",
  "rap",
];

export default function AddMyMusic() {
  const router = useRouter();
  const [music, setMusic] = useState({
    title: "",
    album_name: "",
    genre: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMusic((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (value: string) => {
    setMusic((prev) => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMyMusic(music);
      toast.success("Music added successfully!");
      router.push("/my-music");
    } catch (error) {
      console.error("Error adding music:", error);
      toast.error("Failed to add music.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Music</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={music.title}
                onChange={handleChange}
                placeholder="Enter song title"
                required
              />
            </div>
            <div>
              <Label htmlFor="album_name">Album Name</Label>
              <Input
                id="album_name"
                name="album_name"
                value={music.album_name}
                onChange={handleChange}
                placeholder="Enter album name"
                required
              />
            </div>
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select onValueChange={handleGenreChange} value={music.genre}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Add Music
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// /home/sujal/Desktop/all/artist-mgmt/artist-mgmt-front/src/features/music/components/add-my-music.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { musicSchema, MusicFormData } from "../schemas/form.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
] as const;

export default function AddMyMusic() {
  const router = useRouter();

  const form = useForm<MusicFormData>({
    resolver: zodResolver(musicSchema),
    defaultValues: {
      title: "",
      album_name: "",
      genre: "rnb",
    },
  });

  const handleSubmit = async (data: MusicFormData) => {
    try {
      await createMyMusic(data);
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter song title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="album_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Album Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter album name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Add Music
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

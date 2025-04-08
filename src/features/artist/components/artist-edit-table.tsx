"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { fetchArtistById, updateArtist } from "../actions/artist.action";
import { artistSchema, ArtistFormData } from "../schemas/artist-add.schema";

export default function EditArtist() {
  const router = useRouter();
  const { id } = useParams();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
    defaultValues: {
      name: "",
      dob: "",
      gender: "",
      address: "",
      first_release_year: 0,
      no_of_albums: 0,
    },
  });

  useEffect(() => {
    const getArtist = async () => {
      try {
        const data = await fetchArtistById(Number(id));
        form.reset({
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          address: data.address,
          first_release_year: data.first_release_year,
          no_of_albums: data.no_of_albums,
        });
        setPreview(data.image || null);
      } catch (error) {
        console.error("Error fetching artist:", error);
        toast.error("Failed to fetch artist details.");
      }
    };
    getArtist();
  }, [id, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ArtistFormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      if (image) {
        formData.append("image", image);
      }

      await updateArtist(Number(id), formData);
      toast.success("Artist updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating artist:", error);
      toast.error("Failed to update artist.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Artist</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter artist name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter gender" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_release_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Release Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter first release year"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="no_of_albums"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Albums Released</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter number of albums"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : Number(e.target.value)
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Label htmlFor="image">Artist Image (Optional)</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Artist Preview"
                    className="mt-2 w-40 h-40 object-cover rounded-md"
                  />
                )}
              </div>

              <Button type="submit" className="w-full">
                Update Artist
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

// app/artists/add/page.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createArtist } from "@/api/api";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AddArtist() {
  const router = useRouter();
  const [artist, setArtist] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: 0,
    no_of_albums: 0,
  });
  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtist((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      Object.entries(artist).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      if (image) {
        formData.append("image", image); // Attach file correctly
      }

      await createArtist(formData);
      toast.success("Artist added successfully!");
      router.back();
    } catch (error) {
      console.error("Error adding artist:", error);
      toast.error("Failed to add artist.");
    }
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Artist</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={artist.name}
                onChange={handleChange}
                placeholder="Enter artist name"
                required
              />
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                name="dob"
                value={artist.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Input
                id="gender"
                name="gender"
                value={artist.gender}
                onChange={handleChange}
                placeholder="Enter gender"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={artist.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
              />
            </div>
            <div>
              <Label htmlFor="first_release_year">First Release Year</Label>
              <Input
                id="first_release_year"
                type="number"
                name="first_release_year"
                value={artist.first_release_year}
                onChange={handleChange}
                placeholder="Enter first release year"
                required
              />
            </div>
            <div>
              <Label htmlFor="no_of_albums">Albums Released</Label>
              <Input
                id="no_of_albums"
                type="number"
                name="no_of_albums"
                value={artist.no_of_albums}
                onChange={handleChange}
                placeholder="Enter number of albums"
                required
              />
            </div>
            <div>
              <Label htmlFor="image">Artist Image</Label>
              <Input
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

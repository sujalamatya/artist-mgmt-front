"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import { fetchArtistById, updateArtist } from "@/api/api";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function EditArtist() {
  const router = useRouter();
  const { id } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    dob: "",
    gender: "",
    address: "",
    first_release_year: "",
    no_of_albums: "",
    image: null as File | null,
  });
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const getArtist = async () => {
      try {
        const data = await fetchArtistById(Number(id));
        setArtist({
          name: data.name,
          dob: data.dob,
          gender: data.gender,
          address: data.address,
          first_release_year: data.first_release_year.toString(),
          no_of_albums: data.no_of_albums.toString(),
          image: null,
        });
        setPreview(data.image || null);
      } catch (error) {
        console.error("Error fetching artist:", error);
        toast.error("Failed to fetch artist details.");
      }
    };
    getArtist();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtist((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setArtist((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", artist.name);
    formData.append("dob", artist.dob);
    formData.append("gender", artist.gender);
    formData.append("address", artist.address);
    formData.append("first_release_year", artist.first_release_year);
    formData.append("no_of_albums", artist.no_of_albums);
    if (artist.image) {
      formData.append("image", artist.image);
    }

    try {
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
        </CardContent>
      </Card>
    </div>
  );
}

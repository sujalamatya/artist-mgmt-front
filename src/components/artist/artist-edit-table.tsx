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
    first_release_year: 0,
    no_of_albums: 0,
  });

  useEffect(() => {
    const getArtist = async () => {
      try {
        const data = await fetchArtistById(Number(id));
        setArtist(data);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateArtist(Number(id), artist);
      toast.success("Artist updated successfully!");
      router.push("/artists"); // Redirect to the artists table
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
            <Button type="submit" className="w-full">
              Update Artist
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

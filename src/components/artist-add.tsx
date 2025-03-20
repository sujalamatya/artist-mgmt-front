"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArtist } from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddArtistDialog() {
  const [artist, setArtist] = useState({
    name: "",
    dob: "",
    address: "",
    gender: "",
    first_release_year: "",
    no_of_albums: "",
  });
  const router = useRouter();

  const handleChange = (e: any) => {
    setArtist({ ...artist, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: any) => {
    setArtist({ ...artist, gender: value });
  };

  const handleSubmit = async () => {
    try {
      await createArtist({
        ...artist,
        first_release_year: Number(artist.first_release_year),
        no_of_albums: Number(artist.no_of_albums),
      });
      router.refresh();
      toast.success("Artist added successfully!");
    } catch (error) {
      toast.error("Error adding artist: " + error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="max-w-3xs font-bold">Add Artist</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Label>Name</Label>
          <Input name="name" value={artist.name} onChange={handleChange} />

          <Label>Date of Birth</Label>
          <Input
            name="dob"
            type="date"
            value={artist.dob}
            onChange={handleChange}
          />

          <Label>Address</Label>
          <Input
            name="address"
            value={artist.address}
            onChange={handleChange}
          />

          <Label>Gender</Label>
          <Select onValueChange={handleGenderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Label>First Release Year</Label>
          <Input
            name="first_release_year"
            type="number"
            value={artist.first_release_year}
            onChange={handleChange}
          />

          <Label>Number of Albums</Label>
          <Input
            name="no_of_albums"
            type="number"
            value={artist.no_of_albums}
            onChange={handleChange}
          />

          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

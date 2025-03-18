"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/common/app-sidebar";
import Navbar from "@/components/common/nav-bar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createArtist } from "@/api/api"; // Import the createArtist API function

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    role: string;
  } | null>(null);

  const [artistData, setArtistData] = useState({
    name: "",
    dob: "",
    address: "",
    gender: "",
    first_release_year: "",
    no_of_albums: "",
    released: false,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Autofill form with user data but allow editing
      setArtistData({
        name: `${parsedUser.first_name} ${parsedUser.last_name}` || "",
        dob: parsedUser.dob || "",
        address: parsedUser.address || "",
        gender: parsedUser.gender || "",
        first_release_year: "",
        no_of_albums: "",
        released: false,
      });
    } else {
      router.push("/login"); // Redirect to login if user is not logged in
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setArtistData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createArtist({
        ...artistData,
        first_release_year: Number(artistData.first_release_year),
        no_of_albums: Number(artistData.no_of_albums),
      });
      alert("Artist profile created successfully!");
    } catch (error) {
      console.error("Error creating artist:", error);
      alert("Failed to create artist profile.");
    }
  };

  if (!user) return null; // Prevent rendering until user data is loaded

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header with Breadcrumb and Navbar */}
      <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Profile</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Navbar />
      </header>

      {/* Profile Info Section */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {/* Left Profile Card */}
        <Card className="w-full p-6 shadow-md">
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="flex items-center justify-center h-20 w-20 bg-amber-600 text-white text-3xl font-bold">
              {user.first_name[0].toUpperCase()}
            </Avatar>
            <h1 className="text-2xl font-bold mt-4">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-muted-foreground">{user.role}</p>
            <Separator className="my-4" />

            <div className="text-left w-full space-y-2">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-medium">Date of Birth:</span> {user.dob}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-medium">Address:</span> {user.address}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Form Card */}
        <Card className="w-full p-6 shadow-md">
          <CardContent>
            <h2 className="text-xl font-semibold text-center mb-4">
              Create Artist Profile
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={artistData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  value={artistData.dob}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={artistData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Input
                  id="gender"
                  name="gender"
                  value={artistData.gender}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="first_release_year">First Release Year</Label>
                <Input
                  id="first_release_year"
                  name="first_release_year"
                  value={artistData.first_release_year}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter first release year"
                  required
                />
              </div>

              <div>
                <Label htmlFor="no_of_albums">Number of Albums</Label>
                <Input
                  id="no_of_albums"
                  name="no_of_albums"
                  value={artistData.no_of_albums}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter number of albums"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="released"
                  type="checkbox"
                  name="released"
                  checked={artistData.released}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <Label htmlFor="released">Released</Label>
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

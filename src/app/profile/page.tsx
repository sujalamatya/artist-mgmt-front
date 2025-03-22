"use client";

import { createArtist, fetchArtists } from "@/api/api"; // Import fetchArtists
import Navbar from "@/components/common/nav-bar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // shadcn Date Picker
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // For Date Picker
import { format } from "date-fns"; // For formatting dates
import { Calendar as CalendarIcon } from "lucide-react"; // Calendar icon
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // shadcn Select
import { Checkbox } from "@/components/ui/checkbox"; // shadcn Checkbox

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

  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [artistExists, setArtistExists] = useState(false); // New state to track if artist exists

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
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

      // Check if artist with the same name already exists
      checkIfArtistExists(`${parsedUser.first_name} ${parsedUser.last_name}`);
    } else {
      router.push("/login"); // Redirect to login if user is not logged in
    }
  }, [router]);

  const checkIfArtistExists = async (name: string) => {
    try {
      const artists = await fetchArtists();
      const exists = artists.some((artist: any) => artist.name === name);
      setArtistExists(exists);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  useEffect(() => {
    calculateCompletionPercentage();
  }, [artistData]);

  const calculateCompletionPercentage = () => {
    const totalFields = Object.keys(artistData).length;
    const filledFields = Object.values(artistData).filter(
      (value) => value !== "" && value !== false
    ).length;
    const percentage = (filledFields / totalFields) * 100;
    setCompletionPercentage(Math.round(percentage));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setArtistData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setArtistData((prev) => ({
        ...prev,
        dob: format(date, "yyyy-MM-dd"), // Format date to match input type="date"
      }));
    }
  };

  const handleSelectChange = (value: string) => {
    setArtistData((prev) => ({
      ...prev,
      gender: value,
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
      setArtistExists(true); // Set artistExists to true after successful creation
    } catch (error) {
      console.error("Error creating artist:", error);
      alert("Failed to create artist profile.");
    }
  };

  if (!user) return null; // Prevent rendering until user data is loaded

  const shouldShowForm =
    !["super_admin", "artist_manager"].includes(user.role) && !artistExists;

  return (
    <div className="flex flex-col min-h-screen bg-background ">
      {/* Header with Breadcrumb and Navbar */}
      <header className="flex h-16 shrink-0 items-center justify-between px-4 border-b bg-background">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Go Back</BreadcrumbLink>
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
      <main className="flex gap-6 p-6 max-w-7xl mx-auto w-full">
        {/* Left Profile Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                {user.first_name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold mt-4">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-muted-foreground text-lg">{user.role}</p>
            <Separator className="my-4" />

            <div className="text-left w-full space-y-3">
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

        {/* Right Form Card - Conditionally Rendered */}
        {shouldShowForm && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Create Artist Profile
              </CardTitle>
              <p className="text-center text-sm text-muted-foreground">
                Profile Completion: {completionPercentage}%
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={artistData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {artistData.dob
                          ? format(new Date(artistData.dob), "PPP")
                          : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          artistData.dob ? new Date(artistData.dob) : undefined
                        }
                        onSelect={handleDateChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={artistData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={handleSelectChange}
                    value={artistData.gender}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

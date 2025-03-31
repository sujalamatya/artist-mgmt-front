"use client";

import { createArtist, fetchArtists } from "@/api/api";
import Navbar from "@/components/common/nav-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { theme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    role: string;
    profile_image?: string;
  } | null>(null);

  const [artistData, setArtistData] = useState({
    name: "",
    dob: "",
    address: "",
    gender: "",
    first_release_year: "",
    no_of_albums: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [artistExists, setArtistExists] = useState(false);

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
    setMounted(true);
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      setArtistData({
        name: `${parsedUser.first_name} ${parsedUser.last_name}` || "",
        dob: parsedUser.dob || "",
        address: parsedUser.address || "",
        gender: parsedUser.gender || "",
        first_release_year: "",
        no_of_albums: "",
      });

      checkIfArtistExists(`${parsedUser.first_name} ${parsedUser.last_name}`);
    } else {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    calculateCompletionPercentage();
  }, [artistData]);

  const calculateCompletionPercentage = () => {
    const totalFields = Object.keys(artistData).length;
    const filledFields = Object.values(artistData).filter(
      (value) => value !== ""
    ).length;
    const percentage = (filledFields / totalFields) * 100;
    setCompletionPercentage(Math.round(percentage));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setArtistData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setArtistData((prev) => ({
        ...prev,
        dob: format(date, "yyyy-MM-dd"),
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
      const formData = new FormData();

      // Append all artist data to formData
      Object.entries(artistData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image if exists
      if (image) {
        formData.append("image", image);
      }

      await createArtist(formData);
      toast.success("Artist profile created successfully!");
      setArtistExists(true);
    } catch (error) {
      console.error("Error creating artist:", error);
      toast.error("Failed to create artist profile.");
    }
  };

  if (!mounted || !user) return null;

  const shouldShowForm =
    !["super_admin", "artist_manager"].includes(user.role) && !artistExists;

  // Theme-aware classes
  const bgGradient =
    theme === "dark"
      ? "bg-gradient-to-b from-gray-900/50 to-gray-900/20"
      : "bg-gradient-to-b from-gray-100/50 to-gray-100/20";

  const cardBg = theme === "dark" ? "bg-gray-900/50" : "bg-gray-100/50";

  const borderColor = theme === "dark" ? "border-gray-800" : "border-gray-200";

  const textSecondary = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={cn(
        "min-h-screen",
        theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"
      )}
    >
      {/* Header with blurred background */}
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

      <main className="p-6 max-w-7xl mx-auto">
        {/* Profile header */}
        <section className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8">
          <Avatar className="h-48 w-48 rounded-none">
            {user.profile_image ? (
              <AvatarImage src={user.profile_image} />
            ) : (
              <AvatarFallback
                className={cn(
                  "text-8xl font-bold rounded-none",
                  theme === "dark"
                    ? "bg-gradient-to-br from-purple-600 to-blue-500"
                    : "bg-gradient-to-br from-purple-400 to-blue-300"
                )}
              >
                {user.first_name[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="space-y-2 md:space-y-4 text-center md:text-left">
            <p className="text-sm font-medium uppercase tracking-wider">
              Profile
            </p>
            <h1 className="text-4xl md:text-6xl font-bold">
              {user.first_name} {user.last_name}
            </h1>
            <p className={textSecondary}>{user.role}</p>
          </div>
        </section>

        {/* Content section */}
        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile info card */}
            <div className={cn("p-6 rounded-lg border", cardBg, borderColor)}>
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <div className="space-y-4">
                {[
                  { label: "Email", value: user.email },
                  { label: "Phone", value: user.phone },
                  { label: "Date of Birth", value: user.dob },
                  { label: "Gender", value: user.gender },
                  { label: "Address", value: user.address },
                ].map((item) => (
                  <div key={item.label}>
                    <p className={cn("text-sm", textSecondary)}>{item.label}</p>
                    <p>{item.value || "-"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Artist form */}
            {shouldShowForm && (
              <div className={cn("p-6 rounded-lg border", cardBg, borderColor)}>
                <h2 className="text-2xl font-bold mb-4">
                  Create Artist Profile
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className={cn("text-sm", textSecondary)}>
                      Profile Completion
                    </span>
                    <span className="text-sm">{completionPercentage}%</span>
                  </div>
                  <div
                    className={cn(
                      "w-full rounded-full h-2",
                      theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        theme === "dark" ? "bg-green-500" : "bg-green-600"
                      )}
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                  </div>
                </div>

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
                    <Label>Date of Birth</Label>
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
                            artistData.dob
                              ? new Date(artistData.dob)
                              : undefined
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
                      <SelectTrigger>
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
                    <Label htmlFor="first_release_year">
                      First Release Year
                    </Label>
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

                  <Button
                    type="submit"
                    className={cn(
                      "w-full font-bold py-3 rounded-full",
                      theme === "dark"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-500 hover:bg-green-600"
                    )}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

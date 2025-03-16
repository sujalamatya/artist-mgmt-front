"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import juice from "../assets/juice.jpg";
import { signUp } from "@/api/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Import Alert components
import { AlertCircle } from "lucide-react"; // Import an icon for the alert

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    rePassword: "",
    role: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password and re-password
    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match. Please try again.");
      return; // Stop form submission if passwords don't match
    }

    try {
      const response = await signUp(formData);
      console.log("Success:", response);
      setError(null);
    } catch (error) {
      setError(
        "Account already exists. Please log in or use a different email."
      );
    }
  };

  return (
    <div
      className={cn("flex flex-col gap-6 max-w-4xl mx-auto p-4", className)}
      {...props}
    >
      {/* Error Alert Dialog */}
      {error && (
        <Alert variant="destructive" className="mt-10">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card className="overflow-hidden p-0 shadow-lg h-[680px]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Tabs defaultValue="personal" className="p-6 md:p-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="account">Account Details</TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="personal">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Create an Account</h1>
                  <p className="text-muted-foreground text-balance">
                    Join the Artist Management System
                  </p>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="John"
                    required
                    className="w-full"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    required
                    className="w-full"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="9876543210"
                    className="w-full"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    className="w-full"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    className="w-full"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </TabsContent>

            {/* Account Details Tab */}
            <TabsContent value="account">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    className="w-full"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="w-full"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="rePassword">Confirm Password</Label>
                  <Input
                    id="rePassword"
                    type="password"
                    required
                    className="w-full"
                    value={formData.rePassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="">Select Role</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="artist_manager">Artist Manager</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <a
                    href="/"
                    className="underline underline-offset-4 text-blue-800 hover:text-blue-900"
                  >
                    Login
                  </a>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src={juice}
              alt="Image"
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking Sign Up, you agree to our{" "}
        <a href="/tos">Terms of Service</a> and{" "}
        <a href="/policy">Privacy Policy</a>.
      </div>
    </div>
  );
}

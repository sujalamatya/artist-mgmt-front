import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import juice from "../assets/juice.jpg";
import lana from "../assets/lanaLogin.jpeg";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6 max-w-4xl mx-auto p-4", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0 shadow-lg h-[680px]">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Tabs defaultValue="personal" className="p-6 md:p-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="account">Account Details</TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="personal">
              <div className="flex flex-col gap-6">
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
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="9876543210"
                    className="w-full"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" className="w-full" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="border border-gray-300 p-2 rounded-md w-full"
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
                  />
                </div>
              </div>
            </TabsContent>

            {/* Account Details Tab */}
            <TabsContent value="account">
              <div className="flex flex-col gap-6 h-[680px]">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    className="w-full"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="w-full"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <select
                    id="role"
                    className="border border-gray-300 p-2 rounded-md w-full"
                    required
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
                    href="/login"
                    className="underline underline-offset-4 text-blue-800 hover:text-blue-900"
                  >
                    Login
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src={juice}
              alt="Image"
              layout=""
              objectFit="cover"
              className="dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking Sign Up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

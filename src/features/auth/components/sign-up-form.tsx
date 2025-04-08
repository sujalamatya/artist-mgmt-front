"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import juice from "@/assets/juice.jpg";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "../actions/signup.action";
import { signUpSchema, SignUpFormValues } from "../schemas/form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: undefined,
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    setError(null);
    try {
      // Remove rePassword before sending data
      const { rePassword, ...userData } = data;
      const response = await signUp(userData);
      console.log("Success:", response);
      router.push("/"); // Redirect to home page after successful signup
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
      <Card className="overflow-hidden p-0 shadow-lg min-h-[680px]">
        <CardContent className="grid p-0 h-full md:grid-cols-2">
          {/* Error Alert - positioned inside card but above tabs */}
          {error && (
            <div className="absolute top-4 left-0 right-0 px-6 z-10">
              <Alert variant="destructive" className="w-full">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}

          <Tabs defaultValue="personal" className="p-6 md:p-8 w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal Details</TabsTrigger>
              <TabsTrigger value="account">Account Details</TabsTrigger>
            </TabsList>

            {/* Personal Details Tab */}
            <TabsContent value="personal" className="mt-6">
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
                    className="w-full"
                    {...register("first_name")}
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    type="text"
                    placeholder="Doe"
                    className="w-full"
                    {...register("last_name")}
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="9876543210"
                    className="w-full"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    className="w-full"
                    {...register("dob")}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => setValue("gender", value)}
                    defaultValue={watch("gender")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    className="w-full"
                    {...register("address")}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Account Details Tab */}
            <TabsContent value="account" className="mt-6">
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="w-full"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="rePassword">Confirm Password</Label>
                  <Input
                    id="rePassword"
                    type="password"
                    className="w-full"
                    {...register("rePassword")}
                  />
                  {errors.rePassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    onValueChange={(value: "artist" | "artist_manager") =>
                      setValue("role", value, { shouldValidate: true })
                    }
                    defaultValue={watch("role")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="artist">Artist</SelectItem>
                      <SelectItem value="artist_manager">
                        Artist Manager
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Sign Up"}
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
              </div>
            </TabsContent>
          </Tabs>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block h-full">
            <Image src={juice} alt="Image" />
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

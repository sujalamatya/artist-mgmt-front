import { SignUpForm } from "@/components/auth/sign-up-form";
import React from "react";
import bg1 from "@/assets/bg1.jpg";

export default function signup() {
  return (
    <div
      className="flex justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen "
      style={{ backgroundImage: `url(${bg1.src})` }}
    >
      <SignUpForm />
    </div>
  );
}

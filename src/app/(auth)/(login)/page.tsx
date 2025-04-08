import LoginForm from "@/features/auth/components/login-form";

import bg1 from "@/assets/bg1.jpg";

export default function LoginPage() {
  return (
    <div>
      <div
        className="flex justify-center items-center bg-cover bg-center bg-no-repeat w-full h-screen "
        style={{ backgroundImage: `url(${bg1.src})` }}
      >
        <LoginForm />
      </div>
    </div>
  );
}

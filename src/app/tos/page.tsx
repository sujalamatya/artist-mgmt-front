"use client"; // Ensure this is a Client Component
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function TermsOfService() {
  const router = useRouter();
  return (
    <div className={cn("flex flex-col gap-6 max-w-4xl mx-auto p-4")}>
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <h1 className="flex text-2xl font-bold mb-4 justify-center">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-6">
            Welcome to the Artist Management System. By using our platform, you
            agree to the following terms and conditions. Please read them
            carefully.
          </p>

          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground mb-4">
            By accessing or using the Artist Management System, you agree to be
            bound by these Terms of Service. If you do not agree, please do not
            use our platform.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            2. User Responsibilities
          </h2>
          <p className="text-muted-foreground mb-4">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Content Ownership</h2>
          <p className="text-muted-foreground mb-4">
            All content uploaded to the platform remains the property of the
            respective artists. By using our platform, you grant us a
            non-exclusive license to display and distribute your content.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            4. Prohibited Activities
          </h2>
          <p className="text-muted-foreground mb-4">
            You may not use the platform for any illegal or unauthorized
            purpose. This includes, but is not limited to, violating
            intellectual property rights or distributing harmful content.
          </p>

          <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
          <p className="text-muted-foreground mb-4">
            We reserve the right to terminate or suspend your account at any
            time for violations of these terms or for any other reason at our
            discretion.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-muted-foreground mb-4">
            We may update these Terms of Service from time to time. You will be
            notified of any changes, and continued use of the platform
            constitutes acceptance of the updated terms.
          </p>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()} // Navigate back to the previous page
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"; // Ensure this is a Client Component
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <div className={cn("flex flex-col gap-6 max-w-4xl mx-auto p-4")}>
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-6">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your personal information on the Artist
            Management System.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="text-muted-foreground mb-4">
            We collect information you provide when you create an account, such
            as your name, email address, and payment details. We also collect
            data about your usage of the platform.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-muted-foreground mb-4">
            We use your information to provide and improve our services, process
            transactions, and communicate with you. We do not sell your data to
            third parties.
          </p>

          <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
          <p className="text-muted-foreground mb-4">
            We implement industry-standard security measures to protect your
            data. However, no method of transmission over the internet is 100%
            secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mb-2">4. Cookies</h2>
          <p className="text-muted-foreground mb-4">
            We use cookies to enhance your experience on our platform. You can
            disable cookies in your browser settings, but this may affect your
            ability to use certain features.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            5. Third-Party Services
          </h2>
          <p className="text-muted-foreground mb-4">
            We may use third-party services to process payments or analyze usage
            data. These services have their own privacy policies, and we are not
            responsible for their practices.
          </p>

          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <p className="text-muted-foreground mb-4">
            You have the right to access, update, or delete your personal
            information. If you have any questions or requests, please contact
            us.
          </p>

          <h2 className="text-xl font-semibold mb-2">
            7. Changes to This Policy
          </h2>
          <p className="text-muted-foreground mb-4">
            We may update this Privacy Policy from time to time. You will be
            notified of any changes, and continued use of the platform
            constitutes acceptance of the updated policy.
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

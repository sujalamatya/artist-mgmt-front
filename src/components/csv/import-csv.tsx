"use client";

import { importMusicCSV } from "@/api/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const ImportCSVButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file type
      if (!file.name.endsWith(".csv")) {
        toast.error("Please upload a CSV file");
        return;
      }

      setIsLoading(true);
      try {
        await importMusicCSV(file);
        // Optional: refresh the music list after import
        window.location.reload();
      } catch (error) {
        console.error("Import failed:", error);
      } finally {
        setIsLoading(false);
        // Reset the input value to allow re-uploading the same file
        e.target.value = "";
      }
    }
  };

  return (
    <div className="relative">
      <Button variant="outline" disabled={isLoading} className="relative">
        {isLoading ? "Importing..." : "Import CSV"}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isLoading}
        />
      </Button>
    </div>
  );
};

export default ImportCSVButton;

import { Button } from "@/components/ui/button";
import { exportMusicCSV } from "@/api/api";
import { useState } from "react";

const ExportCSVButton = () => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      await exportMusicCSV();
    } catch (error) {
      console.error("CSV export failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleExport} disabled={loading} variant={"outline"}>
      {loading ? "Exporting..." : "Export CSV"}
    </Button>
  );
};

export default ExportCSVButton;

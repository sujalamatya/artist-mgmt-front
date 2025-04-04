import { Button } from "@/components/ui/button";
import { useState } from "react";
import { exportMusicCSV } from "../actions/csv.action";

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

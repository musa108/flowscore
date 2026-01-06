"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { exportToCSV, exportToPDF } from "@/lib/exportUtils"; // helper functions

export function ExportButtons() {
  return (
    <motion.div
      className="flex gap-4 justify-center items-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Button
        onClick={exportToCSV}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        <Download className="w-4 h-4" /> Export CSV
      </Button>

      <Button
        onClick={exportToPDF}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900"
      >
        <FileText className="w-4 h-4" /> Export PDF
      </Button>
    </motion.div>
  );
}

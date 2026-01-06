"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useProfileMode } from "@/hooks/useProfileMode";
import { motion } from "framer-motion";

export function TaxCalculatorCard() {
  const { mode } = useProfileMode();
  const [income, setIncome] = useState<number | "">("");
  const [tax, setTax] = useState<number | null>(null);

  const calculateTax = () => {
    if (!income || income <= 0) return;

    // Example: Simple progressive tax (replace with real law logic)
    let taxAmount = 0;
    if (mode === "personal") {
      taxAmount = income <= 300000 ? income * 0.07 : income * 0.15;
    } else {
      taxAmount = income * 0.20; // business flat rate
    }

    setTax(taxAmount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Tax Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 text-sm">
            Mode: <strong>{mode === "personal" ? "Personal" : "Business"}</strong>
          </p>

          <input
            type="number"
            placeholder="Enter your income (₦)"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button onClick={calculateTax} className="w-full">
            Calculate Tax
          </Button>

          {tax !== null && (
            <p className="text-lg font-semibold text-blue-600">
              Estimated Tax: ₦{tax.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

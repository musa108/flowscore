"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function VATCalculatorCard() {
  const [amount, setAmount] = useState<number | "">("");
  const [vat, setVat] = useState<number | null>(null);

  const calculateVAT = () => {
    if (!amount || amount <= 0) return;
    setVat(amount * 0.075); // 7.5% VAT
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>VAT Calculator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount (₦)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <Button onClick={calculateVAT} className="w-full bg-green-600 hover:bg-green-700">
            Calculate VAT
          </Button>

          {vat !== null && (
            <p className="text-lg font-semibold text-green-600">
              VAT (7.5%): ₦{vat.toLocaleString()}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

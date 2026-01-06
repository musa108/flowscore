"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const transactions = [
  { id: 1, name: "Groceries", amount: -18000 },
  { id: 2, name: "Salary", amount: 480000 },
  { id: 3, name: "Internet", amount: -12000 },
];

export function RecentTransactions() {
  return (
    <Card className="shadow-lg rounded-xl border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700">
          Recent Transactions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {transactions.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.35 }}
            className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 transition"
          >
            <p className="text-gray-700">{t.name}</p>
            <p
              className={`font-semibold ${
                t.amount > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {t.amount > 0 ? `+₦${t.amount.toLocaleString()}` : `-₦${Math.abs(t.amount).toLocaleString()}`}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}

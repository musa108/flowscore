"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// A small animated counter component
function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 800;
    const stepTime = 10;
    const increment = (end - start) / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setDisplay(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <>₦{display.toLocaleString()}</>;
}

export function OverviewCards() {
  const cards = [
    {
      title: "Balance",
      value: 1245000,
      gradient: "from-blue-500/10 to-blue-600/5",
    },
    {
      title: "Monthly Income",
      value: 480000,
      gradient: "from-green-500/10 to-green-600/5",
    },
    {
      title: "Monthly Spend",
      value: 320000,
      gradient: "from-red-500/10 to-red-600/5",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="transition-transform"
        >
          <Card
            className={`bg-linear-to-br ${item.gradient} shadow-sm hover:shadow-md transition rounded-xl`}
          >
            <CardHeader>
              <CardTitle className="text-lg font-medium text-gray-700">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-3xl font-bold tracking-tight">
              <AnimatedNumber value={item.value} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

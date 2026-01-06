"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export function FlowScoreGauge() {
  const targetScore = 82; // you can make this dynamic later
  const [score, setScore] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    // Count-up animation (0 → 82)
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start > targetScore) {
        clearInterval(interval);
      } else {
        setScore(start);
      }
    }, 20);

    // Animate the ring arc
    controls.start({
      strokeDashoffset: 100 - targetScore,
      transition: { duration: 1.4, ease: "easeInOut" },
    });
  }, []);

  return (
    <Card className="shadow-lg border border-gray-200 rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">FlowScore</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center justify-center py-6">
        <div className="relative w-48 h-48 flex items-center justify-center">

          {/* Background ring */}
          <svg className="w-full h-full rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="#e5e7eb"
              strokeWidth="14"
              fill="transparent"
            />
          </svg>

          {/* Animated progress ring */}
          <svg className="absolute w-full h-full rotate-90">
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="url(#gradient)"
              strokeWidth="14"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="100"
              animate={controls}
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
          </svg>

          {/* Score value with subtle pulse */}
          <motion.div
            className="absolute text-4xl font-bold text-blue-700"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {score}
          </motion.div>

          {/* Subtle glowing effect */}
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-blue-200 blur-xl opacity-40"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          ></motion.div>

        </div>
      </CardContent>
    </Card>
  );
}

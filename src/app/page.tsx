"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) router.push("/dashboard");
  }, [userId, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-linear-to-b from-white to-gray-100">
      {/* Logo / Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r"
      >
        FlowScore
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-gray-600 max-w-xl mb-8 leading-relaxed"
      >
        Track your cashflow. Understand your money habits.  
        Get your personalized <span className="font-semibold">FlowScore</span> and grow smart.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="flex gap-4"
      >
        <Button asChild size="lg" className="px-6">
          <a href="/sign-in">Login</a>
        </Button>

        <Button asChild size="lg" variant="outline" className="px-6">
          <a href="/sign-up">Create Account</a>
        </Button>
      </motion.div>

      {/* Floating Glow Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.3, delay: 0.8 }}
        className="absolute bottom-10 w-125 h-30 blur-3xl bg-purple-300/40 rounded-full"
      />
    </main>
  );
}

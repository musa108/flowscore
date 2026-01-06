"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileMode } from "@/hooks/useProfileMode"; // your Zustand store
import { Switch } from "@/components/ui/switch"; // shadcn switch

export function Navbar() {
    const { mode, toggleMode } = useProfileMode(); // Personal / Business

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-16 border-b bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-6 sticky top-0 z-50"
        >
            {/* Left Section */}
            <div className="flex items-center gap-3">
                {/* Mobile Menu Icon */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <Menu className="h-6 w-6" />
                </motion.button>

                {/* Dashboard Title */}
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-xl font-semibold tracking-tight"
                >
                    Dashboard
                </motion.h1>
            </div>

            {/* Right Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-center gap-4"
            >
                {/* Profile Mode Switch */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm font-medium">Personal</span>
                    <Switch
                        checked={mode === "business"}
                        onCheckedChange={toggleMode}
                        className="bg-blue-600"
                    />
                    <span className="text-gray-600 text-sm font-medium">Business</span>
                </div>

                {/* User Button */}
                <UserButton afterSignOutUrl="/" />
            </motion.div>
        </motion.header>
    );
}

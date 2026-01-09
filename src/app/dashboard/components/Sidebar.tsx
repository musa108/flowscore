"use client";

import { Home, BarChart2, CreditCard, PieChart, User, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/profile", label: "My Profile", icon: User },
    { href: "/dashboard/kyc", label: "KYC Verification", icon: ShieldCheck },
    { href: "/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/transactions", label: "Transactions", icon: CreditCard },
    { href: "/score", label: "Score", icon: PieChart },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="hidden md:flex w-64 h-screen bg-white/90 backdrop-blur-md shadow-md p-6 flex-col gap-8 fixed"
    >
      {/* Logo */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-bold tracking-tight text-gray-800"
      >
        FlowScore
      </motion.h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700
                  ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 hover:text-blue-600"} 
                  transition-colors duration-200`}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
}

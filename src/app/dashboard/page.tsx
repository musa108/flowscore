"use client";

import { motion } from "framer-motion";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

import { CashflowChart } from "./components/CashflowChart";
import { RecentTransactions } from "./components/RecentTransactions";
import { FlowScoreGauge } from "./components/FlowScoreGauge";
import { OverviewCards } from "./components/OverviewCards";
import { ExportButtons } from "./components/exportButton";
import { TaxCalculatorCard } from "./components/TaxCalculator";
import { VATCalculatorCard } from "./vatCalculator";

export default function DashboardPage() {
    return (
        <main className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <motion.div
                className="flex-1 ml-0 md:ml-64 flex flex-col min-h-screen"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Navbar */}
                <Navbar />

                {/* Page Content */}
                <div className="p-6 space-y-6">
                    {/* Overview Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <OverviewCards />
                    </motion.div>
                    

                    {/* Charts & FlowScore */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <motion.div
                            className="lg:col-span-2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <CashflowChart />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <FlowScoreGauge />
                        </motion.div>
                    </div>

                    {/* tax calculator & Vat calculator */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <TaxCalculatorCard />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <VATCalculatorCard />
                        </motion.div>
                    </div>

                    {/* Recent Transactions */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <RecentTransactions />
                    </motion.div>
                </div>

            </motion.div>


        </main>
    );
}

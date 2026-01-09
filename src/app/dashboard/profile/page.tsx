"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/profile/get");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Profile fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center text-red-600">
        Failed to load profile data.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold">My Profile</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="border rounded-xl p-4 shadow-sm space-y-2 bg-white">
          <h2 className="font-semibold text-lg">User Information</h2>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
          <p><strong>Account Type:</strong> {profile.accountType}</p>
        </div>

        {/* KYC Card */}
        <div className="border rounded-xl p-4 shadow-sm space-y-2 bg-white">
          <h2 className="font-semibold text-lg">KYC Status</h2>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                profile.kyc?.kycLevel === "verified"
                  ? "text-green-600"
                  : profile.kyc?.kycLevel === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            >
              {profile.kyc?.kycLevel ?? "unverified"}
            </span>
          </p>

          <a
            href="/dashboard/kyc"
            className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Update KYC
          </a>
        </div>
      </div>
    </motion.div>
  );
}

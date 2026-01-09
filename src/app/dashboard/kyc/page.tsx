"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function KYCForm() {
  const [nin, setNin] = useState("");
  const [bvn, setBvn] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");

    if (nin.length !== 11) return setMsg("NIN must be 11 digits");
    if (bvn.length !== 11) return setMsg("BVN must be 11 digits");

    setLoading(true);

    try {
      const res = await fetch("/api/kyc/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nin, bvn, address, dob }),
      });

      const data = await res.json();
      setMsg(data.message);
    } catch (err) {
      setMsg("Error submitting KYC");
    }

    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <h1 className="text-2xl font-bold">KYC Verification</h1>

      {msg && <p className="text-blue-600">{msg}</p>}

      <div className="space-y-4 max-w-md">
        <input
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          placeholder="NIN (11 digits)"
          className="border p-2 rounded w-full"
        />

        <input
          value={bvn}
          onChange={(e) => setBvn(e.target.value)}
          placeholder="BVN (11 digits)"
          className="border p-2 rounded w-full"
        />

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Residential Address"
          className="border p-2 rounded w-full"
        />

        <label className="text-gray-600 text-sm">Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Submit KYC"
          )}
        </button>
      </div>
    </motion.div>
  );
}

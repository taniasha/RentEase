"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Home, Receipt, User, ArrowRight } from "lucide-react";
import PropertyList from "@/components/PropertyList";

export default function TenantLandingView() {
  const [userName, setUserName] = useState("Tenant");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name) setUserName(parsed.name);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  return (
    <div className="w-full mx-auto px-4 py-8 space-y-12">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
            Tenant Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Welcome back, {userName}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Find your next perfect rental property or review your active lease and payment records.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <Search className="w-4 h-4" /> Explore Properties
            </Link>
            <Link
              href="/my-rental"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-all"
            >
              <Receipt className="w-4 h-4" /> My Rentals & Receipts
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Link
          href="/explore"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Explore Homes</h4>
            <p className="text-xs text-slate-500 mt-0.5">Find available listings</p>
          </div>
        </Link>

        <Link
          href="/my-rental"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Receipt className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Payment History</h4>
            <p className="text-xs text-slate-500 mt-0.5">Track your rental payments</p>
          </div>
        </Link>

        <Link
          href="/tenant-profile"
          className="group p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">My Profile</h4>
            <p className="text-xs text-slate-500 mt-0.5">Manage personal details</p>
          </div>
        </Link>
      </div>

      {/* Property List Section */}
      <div>
        <PropertyList />
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Users, Sliders, ArrowRight, Building } from "lucide-react";

export default function LandlordLandingView() {
  const [userName, setUserName] = useState("Landlord");

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
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
      <div className="relative rounded-3xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
            Property Management Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Welcome, {userName}!
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            List your properties, track tenant leases, and oversee your rental portfolio all from a single hub.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/addproperty"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Add New Property
            </Link>
            <Link
              href="/manage-properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-all"
            >
              <Sliders className="w-4 h-4" /> Manage Listings
            </Link>
          </div>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <PlusCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Add New Listing</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Create a new listing with custom photo galleries, pricing, bedrooms, amenities, and terms.
            </p>
          </div>
          <Link
            href="/addproperty"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all"
          >
            Create Listing <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">My Tenants</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Review current tenants assigned to your properties, their emails, phone contacts, and active rent status.
            </p>
          </div>
          <Link
            href="/mytenants"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all"
          >
            View Tenants <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-6">
              <Sliders className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Manage Listings</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Quickly edit pricing, modify details, update photos, or delete active property records.
            </p>
          </div>
          <Link
            href="/manage-properties"
            className="inline-flex items-center justify-center gap-2 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all"
          >
            Manage Properties <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

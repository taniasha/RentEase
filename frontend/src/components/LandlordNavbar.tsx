"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function LandlordNavbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
      <nav className="flex items-center justify-between h-16 px-6 rounded-full bg-white/85 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20">
        <Link href="/landlord-dashboard" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Rent<span className="text-blue-600">Ease</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/landlord-dashboard"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/addproperty"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            Add Property
          </Link>
          <Link
            href="/mytenants"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            My Tenants
          </Link>
          <Link
            href="/manage-properties"
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            Manage
          </Link>
          <Link
            href="/landlord-profile"
            className="ml-1 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all"
          >
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function LandingNavbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between h-14 px-5 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Home className="w-4 h-4" />
          </div>
          <span className="text-lg font-black tracking-tight text-slate-900">
            Rent<span className="text-brand-800">Ease</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-800 hover:bg-slate-100 rounded-full transition-all"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-brand-800 hover:bg-brand-900 rounded-full shadow-sm hover:shadow transition-all"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

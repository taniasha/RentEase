"use client";

import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
      <nav className="flex items-center justify-between h-16 px-6 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Rent<span className="text-blue-600">Ease</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/"
            className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about-us"
            className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            About
          </Link>
          <Link
            href="/signup"
            className="px-3.5 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="ml-1 px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-sm hover:shadow transition-all"
          >
            Sign In
          </Link>
        </div>
      </nav>
    </header>
  );
}

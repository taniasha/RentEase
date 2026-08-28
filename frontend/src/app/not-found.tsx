import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 text-brand-800 flex items-center justify-center mx-auto mb-4 border border-slate-200">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-1">404</h1>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Page Not Found</h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-semibold shadow transition-all"
        >
          <Home className="w-3.5 h-3.5" /> Return Home
        </Link>
      </div>
    </div>
  );
}

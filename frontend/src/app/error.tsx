"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Something went wrong!</h2>
        <p className="text-sm text-slate-500 mb-6">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
          >
            <Home className="w-3.5 h-3.5" /> Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

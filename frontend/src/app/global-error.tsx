"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global root error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-slate-50 font-sans antialiased min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Application Error</h2>
          <p className="text-sm text-slate-500 mb-6">
            {error?.message || "A critical error occurred while loading the application."}
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Try Again
          </button>
        </div>
      </body>
    </html>
  );
}

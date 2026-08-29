"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface CustomBackNavigateProps {
  label?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function CustomBackNavigate({
  label = "Back",
  href,
  className,
  onClick,
}: CustomBackNavigateProps) {
  const router = useRouter();

  return (
    <div className="flex gap-2 mb-1">
      <ArrowLeft />
      <button
        type="button"
        onClick={onClick || (() => router.back())}
        className={`inline-flex items-center gap-2 text-[8px] sm:text-[11px] font-semibold text-slate-500 hover:text-slate-900 transition-colors group cursor-pointer 
        ${className}`}
      >
        {label}
      </button>
    </div>
  );
}
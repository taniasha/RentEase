import React from "react";
import { cn } from "@/lib/utils";

export type StatusType = "rented" | "available" | "vacant" | "paid" | "pending";

export interface StatusBadgeProps {
  status: StatusType | string | boolean;
  className?: string;
}

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  let label = String(status);
  let variantStyles = "bg-slate-100 text-slate-700 border-slate-200";

  if (typeof status === "boolean") {
    label = status ? "Rented" : "Available";
    variantStyles = status
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-slate-100 text-slate-700 border-slate-200";
  } else {
    const lower = String(status).toLowerCase();
    if (lower === "rented" || lower === "paid") {
      variantStyles = "bg-emerald-50 text-emerald-700 border-emerald-200";
      label = lower === "paid" ? "Paid" : "Rented";
    } else if (lower === "available" || lower === "vacant") {
      variantStyles = "bg-blue-50 text-blue-700 border-blue-200";
      label = "Available";
    } else if (lower === "pending") {
      variantStyles = "bg-amber-50 text-amber-700 border-amber-200";
      label = "Pending";
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border shadow-2xs tracking-wide",
        variantStyles,
        className
      )}
    >
      {label}
    </span>
  );
}

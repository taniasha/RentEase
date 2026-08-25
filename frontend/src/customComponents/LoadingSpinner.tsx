import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({
  message = "Loading...",
  size = "md",
  className = "py-16",
}: LoadingSpinnerProps) {
  const iconSize =
    size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
    >
      <Loader2 className={cn("animate-spin text-blue-600", iconSize)} />
      {message && (
        <p className="text-xs font-medium text-slate-500 mt-2.5">{message}</p>
      )}
    </div>
  );
}

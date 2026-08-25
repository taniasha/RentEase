"use client";

import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionItem {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "success" | "secondary";
}

export interface ActionMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
  customActions?: ActionItem[];
  className?: string;
}

export default function ActionMenu({
  onEdit,
  onDelete,
  onView,
  customActions = [],
  className = "",
}: ActionMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-3 right-3 z-10 flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-md border border-slate-200/60 transition-transform",
        className
      )}
    >
      {onView && (
        <button
          type="button"
          className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="View Details"
          onClick={onView}
        >
          <Eye className="w-4 h-4" />
        </button>
      )}

      {onEdit && (
        <button
          type="button"
          className="p-1.5 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          title="Edit Property"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4" />
        </button>
      )}

      {onDelete && (
        <button
          type="button"
          className="p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
          title="Delete Property"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {customActions.map((action, idx) => (
        <button
          key={idx}
          type="button"
          className={cn(
            "p-1.5 rounded-full transition-colors",
            action.variant === "danger"
              ? "text-red-600 hover:bg-red-50"
              : action.variant === "success"
              ? "text-emerald-600 hover:bg-emerald-50"
              : "text-slate-600 hover:bg-slate-100"
          )}
          title={action.title}
          onClick={action.onClick}
        >
          {action.icon}
        </button>
      ))}
    </div>
  );
}

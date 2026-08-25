import React from "react";
import Link from "next/link";
import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionText,
  actionHref,
  onActionClick,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-10 text-center bg-white rounded-2xl border border-slate-200 shadow-sm",
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-4 shadow-inner">
        {icon || <Inbox className="w-7 h-7 text-slate-400" />}
      </div>

      <h4 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h4>
      {description && (
        <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
      )}

      {actionText && (
        <div>
          {actionHref ? (
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all hover:shadow"
            >
              {actionText}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onActionClick}
              className="inline-flex items-center justify-center h-10 px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all hover:shadow"
            >
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

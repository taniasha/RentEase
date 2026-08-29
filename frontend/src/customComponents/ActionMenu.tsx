"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreVertical, Edit3, Trash2, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export interface ActionItem {
  icon?: React.ReactNode;
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
  align?: "left" | "right";
  deleteDialogTitle?: string;
  deleteDialogDescription?: string;
}

export default function ActionMenu({
  onEdit,
  onDelete,
  onView,
  customActions = [],
  className = "",
  align = "right",
  deleteDialogTitle = "Delete Confirmation",
  deleteDialogDescription = "Are you sure you want to delete this item? This action cannot be undone.",
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsOpen(false);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteConfirm(false);
    if (onDelete) {
      onDelete();
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        ref={menuRef}
        className={cn("absolute top-3 right-3 z-20", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150",
            "bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-md cursor-pointer",
            isOpen && "bg-slate-900 text-white border-slate-900 shadow-md"
          )}
          title="More Actions"
          aria-label="More Actions"
          aria-expanded={isOpen}
        >
          <MoreVertical className="w-4 h-4" />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute top-10 w-44 bg-white rounded-xl shadow-xl border border-slate-200/90 py-1.5 z-30 transition-all",
              align === "right" ? "right-0" : "left-0"
            )}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {onView && (
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onView);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-slate-400" />
                <span>View</span>
              </button>
            )}

            {onEdit && (
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(onEdit);
                }}
                className="w-full px-3.5 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-blue-500" />
                <span>Edit</span>
              </button>
            )}

            {customActions.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAction(action.onClick);
                }}
                className={cn(
                  "w-full px-3.5 py-2 text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer",
                  action.variant === "danger"
                    ? "text-red-600 hover:bg-red-50"
                    : action.variant === "success"
                    ? "text-emerald-600 hover:bg-emerald-50"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                {action.icon && (
                  <span className="shrink-0 w-4 h-4 flex items-center justify-center">
                    {action.icon}
                  </span>
                )}
                <span>{action.title}</span>
              </button>
            ))}

            {onDelete && (
              <>
                <div className="my-1 border-t border-slate-100" />
                <button
                  type="button"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick();
                  }}
                  className="w-full px-3.5 py-2 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent
          className="max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-100"
          onClose={handleCancelDelete}
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-red-600">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-base font-bold text-slate-900 mb-1">
                {deleteDialogTitle}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-600 leading-relaxed">
                {deleteDialogDescription}
              </DialogDescription>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCancelDelete}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              No, Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm shadow-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Yes, Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

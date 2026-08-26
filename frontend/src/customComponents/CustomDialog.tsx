"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface CustomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

export default function CustomDialog({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "lg",
}: CustomDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass =
    maxWidth === "sm"
      ? "max-w-sm"
      : maxWidth === "md"
      ? "max-w-md"
      : maxWidth === "xl"
      ? "max-w-4xl"
      : "max-w-2xl";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={cn("rounded-md max-h-[90vh] flex flex-col p-0 overflow-hidden", maxWidthClass)}>
        <DialogHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50 m-0">
          <DialogTitle className="text-lg font-bold text-slate-900">{title}</DialogTitle>
          <button
            type="button"
            className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </DialogHeader>

        <div className="p-6 overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import LoadingSpinner from "./LoadingSpinner";
import Card from "./Card";

export interface HeaderItem {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
}

export interface CustomTableProps {
  headers: HeaderItem[];
  children?: React.ReactNode;
  loading?: boolean;
  empty?: boolean;
  emptyMessage?: string;
  className?: string;
}

export default function CustomTable({
  headers,
  children,
  loading = false,
  empty = false,
  emptyMessage = "No tenant",
  className = "",
}: CustomTableProps) {
  if (loading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-12 shadow-sm">
        <LoadingSpinner message="Loading records..." />
      </div>
    );
  }

  return (
    <Card className="w-full overflow-hidden">
      <Table >
        <TableHeader className="rounded-xl bg-[#F0F4FB] hover:bg-[#F0F4FB] ">
          <TableRow className="rounded-xl ">
            {headers.map((h) => (
              <TableHead
                key={h.id}
                className={cn(
                  h.align === "center" && "text-center",
                  h.align === "right" && "text-right"
                )}
              >
                {h.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {empty ? (
            <TableRow>
              <TableCell colSpan={headers.length} className="py-12 text-center">
                <p className="text-sm font-medium text-slate-500 italic">
                  {emptyMessage}
                </p>
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </Card>
  );
}

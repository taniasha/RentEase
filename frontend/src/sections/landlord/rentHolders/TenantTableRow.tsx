"use client";

import React from "react";
import { Phone, MapPin, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import StatusBadge from "@/customComponents/StatusBadge";

export interface TenantRowData {
  _id: string;
  tenantName: string;
  tenantEmail: string;
  tenantPhone: string;
  propertyTitle: string;
  propertyLocation: string;
  rentPrice: number;
  paidAmount?: number;
  paidAt?: string;
  status: "paid" | "pending";
}

export interface TenantTableRowProps {
  row: TenantRowData;
}

export default function TenantTableRow({ row }: TenantTableRowProps) {
  const initials = row.tenantName
    ? row.tenantName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "T";

  const formattedDate = row.paidAt
    ? new Date(row.paidAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : row.status === "paid"
    ? "Recent"
    : "—";

  const totalRent = row.rentPrice || 0;
  const paid = row.paidAmount !== undefined ? row.paidAmount : 0;
  const balanceDue = Math.max(0, totalRent - paid);

  return (
    <TableRow>
      {/* Column 1: Tenant Details */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-800 font-bold text-white text-xs shadow-sm">
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{row.tenantName}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
              {row.tenantPhone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3 text-slate-400" />
                  {row.tenantPhone}
                </span>
              )}
            </div>
          </div>
        </div>
      </TableCell>

      {/* Column 2: Property */}
      <TableCell>
        <div>
          <p className="font-semibold text-slate-900 line-clamp-1">{row.propertyTitle}</p>
          <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 line-clamp-1">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            {row.propertyLocation}
          </p>
        </div>
      </TableCell>

      {/* Column 3: Monthly Rent */}
      <TableCell className="text-right">
        <span className="font-bold text-slate-900">
          ₹{row.rentPrice.toLocaleString()}
          <span className="text-2xs font-normal text-slate-400">/mo</span>
        </span>
      </TableCell>

      {/* Column 4: Rent Paid */}
      <TableCell className="text-right">
        {row.paidAmount !== undefined ? (
          <span className="font-extrabold text-emerald-600">
            ₹{row.paidAmount.toLocaleString()}
          </span>
        ) : (
          <span className="font-semibold text-slate-400">₹0</span>
        )}
      </TableCell>

      {/* Column 5: Balance Due */}
      <TableCell className="text-right">
        {balanceDue > 0 ? (
          <div className="text-right">
            <span className="font-bold text-amber-600 text-sm">
              ₹{balanceDue.toLocaleString()}
            </span>
            <p className="text-2xs text-amber-700 mt-0.5 font-medium">Pending</p>
          </div>
        ) : (
          <span className="text-xs font-semibold text-emerald-600">
            ₹0 (Cleared)
          </span>
        )}
      </TableCell>

      {/* Column 6: Payment Date */}
      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      </TableCell>

      {/* Column 7: Status */}
      <TableCell className="text-center">
        {balanceDue === 0 && row.paidAmount ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Paid Full
          </span>
        ) : row.paidAmount ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" /> Partial
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <Clock className="w-3 h-3" /> Rent Due
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}

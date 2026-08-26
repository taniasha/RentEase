"use client";

import React from "react";
import { MapPin, Phone, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import StatusBadge from "@/customComponents/StatusBadge";

export interface RentalRowData {
  _id: string;
  propertyTitle: string;
  propertyLocation: string;
  landlordName: string;
  landlordEmail?: string;
  landlordPhone?: string;
  totalRent?: number;
  amountPaid: number;
  paidAt?: string;
  status: "paid";
}

export interface RentalTableRowProps {
  row: RentalRowData;
}

export default function RentalTableRow({ row }: RentalTableRowProps) {
  const initials = row.landlordName
    ? row.landlordName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "L";

  const formattedDate = row.paidAt
    ? new Date(row.paidAt).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Today";

  const totalRent = row.totalRent && row.totalRent > 0 ? row.totalRent : row.amountPaid;
  const balanceDue = Math.max(0, totalRent - row.amountPaid);

  return (
    <TableRow>
      {/* Column 1: Property */}
      <TableCell>
        <div>
          <p className="font-bold text-slate-900 text-sm line-clamp-1">
            {row.propertyTitle}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 line-clamp-1">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            {row.propertyLocation}
          </p>
        </div>
      </TableCell>

      {/* Column 2: Landlord / Paid To */}
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-800 font-bold text-white text-xs shadow-sm">
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-sm">{row.landlordName}</p>
            {row.landlordPhone && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <Phone className="h-3 w-3 text-slate-400" />
                <span>{row.landlordPhone}</span>
              </div>
            )}
          </div>
        </div>
      </TableCell>

      {/* Column 3: Amount Paid */}
      <TableCell className="text-right">
        <span className="font-extrabold text-emerald-600 text-sm">
          ₹{Number(row.amountPaid).toLocaleString()}
        </span>
      </TableCell>

      {/* Column 4: Balance Due (Pending Amount) */}
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

      {/* Column 5: Payment Date */}
      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      </TableCell>

      {/* Column 6: Status */}
      <TableCell className="text-center">
        {balanceDue > 0 ? (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3" /> Partial
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Paid Full
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}

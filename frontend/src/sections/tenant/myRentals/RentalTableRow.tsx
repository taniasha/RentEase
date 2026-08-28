"use client";

import React from "react";
import { MapPin, Phone, Calendar } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Rental } from "@/types/interface";
import { PaymentStatus, PAYMENT_STATUS_CONFIG } from "@/types/paymentStatus";

interface RentalTableRowProps {
  rental: Rental;
}

export default function RentalTableRow({ rental }: RentalTableRowProps) {
  const propertyTitle =
    rental.propertyId?.title || rental.propertyId?.name || "Rented Property";
  const propertyLocation = rental.propertyId?.location || "Location not specified";
  const landlordName =
    rental.landlordId?.name || rental.propertyId?.ownerName || "Property Owner";
  const landlordPhone = rental.landlordId?.phone || rental.propertyId?.ownerPhone;

  const initials = landlordName
    ? landlordName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
    : "L";

  const formattedDate =
    rental.paidAt || rental.createdAt
      ? new Date(rental.paidAt || rental.createdAt!).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      : "Today";

  const totalRent =
    Number(rental.propertyId?.price) || Number(rental.rentAmount) || 0;
  const amountPaid = Number(rental.rentAmount) || 0;
  const balanceDue = Math.max(0, totalRent - amountPaid);

  const status =
    balanceDue === 0 && amountPaid > 0
      ? PaymentStatus.PAID_FULL
      : amountPaid > 0 && balanceDue > 0
        ? PaymentStatus.PARTIAL
        : PaymentStatus.PENDING;

  const currentStatus = PAYMENT_STATUS_CONFIG[status];
  const StatusIcon = currentStatus.icon;

  return (
    <TableRow>
      <TableCell>
        <div>
          <p className="font-bold text-slate-900 text-[12px] line-clamp-1">
            {propertyTitle}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-500 mt-0.5 line-clamp-1">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            {propertyLocation}
          </p>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand-800 font-bold text-white text-xs shadow-[12px]">
            {initials}
          </div>
          <div>
            <p className="font-bold text-slate-900 text-[12px]">{landlordName}</p>
            {landlordPhone && (
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <Phone className="h-3 w-3 text-slate-400" />
                <span>{landlordPhone}</span>
              </div>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="text-right">
        <span className="font-extrabold text-emerald-600 text-[12px]">
          ₹{amountPaid.toLocaleString()}
        </span>
      </TableCell>

      <TableCell className="text-right">
        {balanceDue > 0 ? (
          <div className="text-right">
            <span className="font-bold text-amber-600 text-[12px]">
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

      <TableCell className="text-center">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          {formattedDate}
        </span>
      </TableCell>

      <TableCell className="text-center">
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-semibold border ${currentStatus.className}`}
        >
          <StatusIcon className="w-3 h-3" /> {currentStatus.label}
        </span>
      </TableCell>
    </TableRow>
  );
}

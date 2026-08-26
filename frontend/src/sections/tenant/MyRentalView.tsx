"use client";

import React, { useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import { getMyRentals } from "@/actions/tenant";
import CustomTable, { HeaderItem } from "@/customComponents/CustomTable";
import RentalTableRow, { RentalRowData } from "./RentalTableRow";
import { Rental } from "@/types/interface";

export default function MyRentalView() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const data = await getMyRentals();
        setRentals(data || []);
      } catch (err) {
        console.error("Error fetching rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // Map backend rental records into structured row object array
  const rentalRows: RentalRowData[] = rentals
    .filter((r) => r && (r._id || r.propertyId))
    .map((r, idx) => ({
      _id: r._id || `rental-${idx}`,
      propertyTitle: r.propertyId?.title || r.propertyId?.name || "Rented Property",
      propertyLocation: r.propertyId?.location || "Location not specified",
      landlordName:
        r.landlordId?.name ||
        r.propertyId?.ownerName ||
        "Property Owner",
      landlordEmail: r.landlordId?.email || r.propertyId?.ownerEmail,
      landlordPhone: r.landlordId?.phone || r.propertyId?.ownerPhone,
      amountPaid: r.rentAmount || 0,
      month: r.month,
      paidAt: r.paidAt || r.createdAt,
      status: "paid",
    }));

  const headers: HeaderItem[] = [
    { id: "property", label: "Property" },
    { id: "landlord", label: "Paid To (Landlord)" },
    { id: "amountPaid", label: "Amount Paid", align: "right" },
    { id: "paidAt", label: "Payment Date", align: "center" },
    { id: "month", label: "Billing Month", align: "center" },
    { id: "status", label: "Payment Status", align: "center" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Receipt className="w-7 h-7 text-brand-800" /> My Rental Receipts
        </h1>
      </div>

      <CustomTable
        headers={headers}
        loading={loading}
        empty={rentalRows.length === 0}
        emptyMessage="No rental records found"
      >
        {rentalRows.map((row) => (
          <RentalTableRow key={row._id} row={row} />
        ))}
      </CustomTable>
    </div>
  );
}

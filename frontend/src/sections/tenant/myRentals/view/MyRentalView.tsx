"use client";

import React, { useEffect, useState } from "react";
import { getMyRentals } from "@/actions/tenant";
import CustomTable, { HeaderItem } from "@/customComponents/CustomTable";
import RentalTableRow from "../RentalTableRow";
import { Rental } from "@/types/interface";
import CustomHeading from "@/customComponents/CustomHeading";

const headers: HeaderItem[] = [
  { id: "property", label: "Property" },
  { id: "landlord", label: "Paid To (Landlord)" },
  { id: "amountPaid", label: "Amount Paid", align: "right" },
  { id: "balanceDue", label: "Balance Due", align: "right" },
  { id: "paidAt", label: "Payment Date", align: "center" },
  { id: "status", label: "Status", align: "center" },
];

interface MyRentalViewProps {
  hideHeading?: boolean;
  maxHeight?: string;
}

export default function MyRentalView({
  hideHeading = false,
  maxHeight,
}: MyRentalViewProps) {
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

  return (
    <div className="w-full">
      {!hideHeading && (
        <div className="mb-6">
          <CustomHeading title="My Rentals" icon="famicons:receipt-outline" />
        </div>
      )}

      <CustomTable
        headers={headers}
        loading={loading}
        empty={rentals.length === 0}
        emptyMessage="No rental records found"
        maxHeight={maxHeight}
        stickyHeader={Boolean(maxHeight)}
      >
        {rentals.map((rental, i) => (
          <RentalTableRow key={rental._id || i} rental={rental} />
        ))}
      </CustomTable>
    </div>
  );
}

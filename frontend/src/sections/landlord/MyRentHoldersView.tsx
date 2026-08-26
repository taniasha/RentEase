"use client";

import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import CustomTable, { HeaderItem } from "@/customComponents/CustomTable";
import TenantTableRow, { TenantRowData } from "./TenantTableRow";
import { Property } from "@/types/interface";

export default function MyRentHoldersView() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUserId(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        const data = await getLandlordProperties();
        setProperties(data || []);
      } catch (err) {
        console.error("Error fetching landlord properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolders();
  }, []);

  // Map backend property data into a dedicated page row object array
  const tenantRows: TenantRowData[] = properties
    .filter((p) => {
      if (!p || !p._id || !p.tenant) return false;
      const tenantId = (p.tenant as any)?._id || (p.tenant as any)?.id;
      return !currentUserId || tenantId !== currentUserId;
    })
    .map((p) => ({
      _id: p._id,
      tenantName: p.tenant?.name || "Tenant",
      tenantEmail: p.tenant?.email || "—",
      tenantPhone: p.tenant?.phone || "",
      propertyTitle: p.title || "Property",
      propertyLocation: p.location || "Location",
      rentPrice: Number(p.price) || 0,
      paidAmount: p.rentalDetails?.rentAmount,
      paymentMonth: p.rentalDetails?.month,
      paidAt: p.rentalDetails?.paidAt,
      status: p.rentalDetails ? "paid" : "pending",
    }));

  const headers: HeaderItem[] = [
    { id: "tenant", label: "Tenant Details" },
    { id: "property", label: "Property" },
    { id: "price", label: "Monthly Rent", align: "right" },
    { id: "rentPaid", label: "Rent Paid / Month", align: "right" },
    { id: "paidAt", label: "Payment Date", align: "center" },
    { id: "status", label: "Status", align: "center" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <Users className="w-7 h-7 text-brand-800" /> My Tenants
        </h1>
      </div>

      <CustomTable
        headers={headers}
        loading={loading}
        empty={tenantRows.length === 0}
        emptyMessage="No tenant"
      >
        {tenantRows.map((row) => (
          <TenantTableRow key={row._id} row={row} />
        ))}
      </CustomTable>
    </div>
  );
}

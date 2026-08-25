"use client";

import React, { useEffect, useState } from "react";
import { Receipt, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { getMyRentals } from "@/actions/tenant";
import EmptyState from "@/customComponents/EmptyState";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Receipt className="w-7 h-7 text-blue-600" /> My Rental Receipts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track and verify all your completed rental payments.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading your rental history..." />
      ) : rentals.length === 0 ? (
        <EmptyState
          title="No active rental records found"
          description="Browse available listings in the explore portal to find and lease your next home."
          actionText="Explore Listings"
          actionHref="/explore"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((r, i) => (
            <div
              key={r._id || i}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {r.propertyId?.title || "Rental Property"}
                  </h3>
                  <StatusBadge status="paid" />
                </div>

                <div className="flex items-center text-xs font-medium text-slate-500 mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{r.propertyId?.location || "Location not specified"}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Amount Paid
                  </p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    ₹{Number(r.rentAmount).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {r.month
                      ? new Date(r.month + "-01").toLocaleString("default", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Current Month"}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

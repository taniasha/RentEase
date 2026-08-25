"use client";

import React, { useEffect, useState } from "react";
import { Users, Mail, Phone, MapPin, User, CheckCircle2 } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import EmptyState from "@/customComponents/EmptyState";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import { Property } from "@/types/interface";

export default function MyRentHoldersView() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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

  const safeProperties = properties.filter((p) => p && p._id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Users className="w-7 h-7 text-emerald-600" /> My Tenants & Leases
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review active tenants occupying your properties.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading tenant records..." />
      ) : safeProperties.length === 0 ? (
        <EmptyState
          title="No tenant records found"
          description="Add your properties and list them to assign and manage active tenant leases."
          actionText="Add New Property"
          actionHref="/addproperty"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeProperties.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {p.title}
                  </h3>
                  <StatusBadge status={p.tenant ? "Rented" : "Available"} />
                </div>

                <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{p.location}</span>
                </div>

                <p className="text-xl font-extrabold text-blue-600 mb-4">
                  ₹{Number(p.price).toLocaleString()}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </p>

                {p.tenant ? (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center gap-2 font-bold text-slate-800 pb-2 border-b border-slate-200/60">
                      <User className="w-4 h-4 text-emerald-600" />
                      <span>{p.tenant.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{p.tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{p.tenant.phone || "Not available"}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-400 flex items-center justify-center">
                    No active tenant assigned yet.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

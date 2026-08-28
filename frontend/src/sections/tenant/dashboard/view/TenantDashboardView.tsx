"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { getAllProperties } from "@/actions/property";
import { getMyRentals } from "@/actions/tenant";
import { Property, Rental } from "@/types/interface";
import TenantNavCard from "@/customComponents/TenantLandlordCard";
import TenantRecentTable from "../TenantRecentTable";
import TenantTimelineGraph from "../TenantTimelineGraph";

export default function TenantDashboardView() {
  const [userName, setUserName] = useState("Tenant");
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          if (parsed.name) setUserName(parsed.name);
        } catch (e) {
          console.error(e);
        }
      }
    }

    const fetchData = async () => {
      try {
        const [propData, rentalData] = await Promise.allSettled([
          getAllProperties(),
          getMyRentals(),
        ]);

        if (propData.status === "fulfilled" && Array.isArray(propData.value)) {
          setFeaturedProperties(propData.value.slice(0, 3));
        }

        if (rentalData.status === "fulfilled" && Array.isArray(rentalData.value)) {
          setRentals(rentalData.value);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const rentedCount = rentals.length > 0 ? rentals.length : 1;
  const totalMonths = rentals.length > 0 ? rentals.length : 6;
  const totalPaid =
    rentals.length > 0
      ? rentals.reduce((acc, r) => acc + (Number(r.rentAmount) || 0), 0)
      : 136000;

  return (
    <div className="w-full space-y-10">
      <div className="relative rounded-xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
            Tenant Hub
          </div>
          <h1 className="text-2xl sm:text-xl font-extrabold tracking-tight mb-3">
            Welcome back, {userName}!
          </h1>
          <p className="text-slate-300 text-[10px] sm:text-base leading-relaxed mb-6">
            Find your next perfect rental property or review your active lease and payment records.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all"
            >
              <Icon icon="solar:magnifer-linear" className="w-4 h-4" /> Explore Properties
            </Link>
            <Link
              href="/my-rental"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-all"
            >
              <Icon icon="solar:bill-list-bold-duotone" className="w-4 h-4" /> My Rentals & Receipts
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TenantNavCard
          href="/explore"
          title="Explore Homes"
          description="Find available listings"
          icon="solar:home-2-bold-duotone"
          color="blue"
        />
        <TenantNavCard
          href="/my-rental"
          title="Payment History"
          description="Track your rental payments"
          icon="solar:bill-list-bold-duotone"
          color="emerald"
        />
        <TenantNavCard
          href="/tenant-profile"
          title="My Profile"
          description="Manage personal details"
          icon="solar:user-bold-duotone"
          color="indigo"
        />
        <TenantNavCard
          href="/my-rental"
          title={`${rentedCount} Rented ${rentedCount === 1 ? "Apartment" : "Apartments"}`}
          description="Active lease agreement"
          icon="solar:buildings-3-bold-duotone"
          color="blue"
        />
        <TenantNavCard
          href="/my-rental"
          title={`${totalMonths} Months Tenancy`}
          description="Total duration stayed"
          icon="solar:calendar-date-bold-duotone"
          color="emerald"
        />
        <TenantNavCard
          href="/my-rental"
          title={`₹${totalPaid.toLocaleString("en-IN")} Total Paid`}
          description="Cleared dues & on-time logs"
          icon="solar:wallet-money-bold-duotone"
          color="indigo"
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 items-start">
        <div className="lg:col-span-6 ">
          <TenantRecentTable />
        </div>
        <div className="lg:col-span-4">
          <TenantTimelineGraph />
        </div>
      </div>
    </div>
  );
}

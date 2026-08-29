"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PlusCircle, Sliders } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import { Property } from "@/types/interface";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import TenantLandlordCard from "@/customComponents/TenantLandlordCard";

export default function LandlordDashboardView() {
    const [userName, setUserName] = useState("Landlord");
    const [properties, setProperties] = useState<Property[]>([]);
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

        const fetchDashboardData = async () => {
            try {
                const data = await getLandlordProperties();
                setProperties(data || []);
            } catch (err) {
                console.error("Error fetching landlord properties:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const totalProperties = properties.length;
    const occupiedProperties = properties.filter((p) => p.tenant || p.status === "rented").length;
    const availableProperties = properties.filter((p) => !p.tenant && p.status !== "rented").length;
    const totalTenants = properties.filter((p) => p.tenant).length;
    const totalRevenue = properties.reduce((sum, p) => {
        if (p.rentalDetails && p.rentalDetails.rentAmount) {
            return sum + Number(p.rentalDetails.rentAmount);
        }
        if (p.tenant && p.price) {
            return sum + Number(p.price);
        }
        return sum;
    }, 0);
    const occupancyRate = totalProperties > 0 ? Math.round((occupiedProperties / totalProperties) * 100) : 0;

    return (
        <div className="mx-auto space-y-6">
            {/* Header Hero Card */} 
            <div className="relative rounded-xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 overflow-hidden shadow-xl border border-slate-800">
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider mb-4 border border-indigo-500/20">
                        Property Management Portal
                    </div>
                    <h1 className="text-xl sm:text-xl font-extrabold tracking-tight mb-1">
                        Welcome, {userName}!
                    </h1>
                    <p className="text-slate-300 text-xs sm:text-xs md:text-sm lg:text-md leading-relaxed mb-6">
                        List your properties, track tenant leases, and oversee your rental portfolio all from a single hub.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/addproperty"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-sm transition-all"
                        >
                            <PlusCircle className="w-4 h-4" /> Add New Property
                        </Link>
                        <Link
                            href="/manage-properties"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 transition-all"
                        >
                            <Sliders className="w-4 h-4" /> Manage Listings
                        </Link>
                    </div>
                </div>
            </div>

            {/*  Cards */}
            {loading ? (
                <LoadingSpinner message="Loading your portfolio statistics..." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <TenantLandlordCard
                        href="/manage-properties"
                        title={`${totalProperties} Properties`}
                        description="Total listings in your portfolio"
                        icon="solar:buildings-3-bold-duotone"
                        color="blue"
                    />

                    <TenantLandlordCard
                        href="/mytenants"
                        title={`${totalTenants} Total Tenants`}
                        description="Active verified tenants"
                        icon="solar:users-group-rounded-bold-duotone"
                        color="emerald"
                    />

                    <TenantLandlordCard
                        href="/mytenants"
                        title={`₹${totalRevenue.toLocaleString()} Revenue`}
                        description="Monthly rent generated"
                        icon="solar:wallet-money-bold-duotone"
                        color="amber"
                    />

                    <TenantLandlordCard
                        href="/mytenants"
                        title={`${occupiedProperties} Occupied Units`}
                        description={`${occupancyRate}% overall occupancy rate`}
                        icon="solar:home-smile-bold-duotone"
                        color="indigo"
                    />

                    <TenantLandlordCard
                        href="/manage-properties"
                        title={`${availableProperties} Available Units`}
                        description="Vacant for immediate leasing"
                        icon="solar:key-minimalistic-square-bold-duotone"
                        color="brand"
                    />

                    <TenantLandlordCard
                        href="/addproperty"
                        title="Add New Listing"
                        description="Publish property to marketplace"
                        icon="solar:add-circle-bold-duotone"
                        color="slate"
                    />
                </div>
            )}
        </div>
    );
}

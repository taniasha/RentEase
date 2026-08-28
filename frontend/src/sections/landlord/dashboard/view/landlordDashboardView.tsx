"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import CustomLandlordCard from "@/customComponents/CustomLandlordCard";
import { PlusCircle, Sliders } from "lucide-react";

export default function LandlordDashboardView() {
    const [userName, setUserName] = useState("Landlord");

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
    }, []);

    return (
        <div className="mx-auto px-4 py-8 space-y-12">
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

            {/* Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomLandlordCard
                    title="Add New Listing"
                    description="Create a new listing with custom photo galleries, pricing, bedrooms, amenities, and terms."
                    href="/addproperty"
                    buttonText="Create Listing"
                    icon={PlusCircle}
                    color="blue"
                />

                <CustomLandlordCard
                    title="My Tenants"
                    description="Review current tenants assigned to your properties, their emails, phone contacts, and active rent status."
                    href="/mytenants"
                    buttonText="View Tenants"
                    icon={Users}
                    color="emerald"
                />

                <CustomLandlordCard
                    title="Manage Listings"
                    description="Quickly edit pricing, modify details, update photos, or delete active property records."
                    href="/manage-properties"
                    buttonText="Manage Properties"
                    icon={Sliders}
                    color="slate"
                />
            </div>
        </div>
    );
}

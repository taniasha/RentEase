"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Zap, Home } from "lucide-react";
import Link from "next/link";
import CountUpCard from "@/customComponents/CountUpCard";
import CustomFeatureGrid from "@/customComponents/CustomFeatureGrid";
import PropertyCard from "@/customComponents/PropertyCard";

export default function LandingView() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (token && role) {
        if (role === "tenant") {
          router.replace("/tenant-dashboard");
          return;
        } else if (role === "landlord") {
          router.replace("/landlord-dashboard");
          return;
        }
      }
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      {/* Hero Section with #182E60 theme */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-brand-900 via-brand-800 to-brand-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(96,144,210,0.25),rgba(255,255,255,0))]"></div>

        <div className="mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400" />Rental Platform
          </div>

          <h1 className="text-xl sm:text-xl lg:text-4xl font-black tracking-tight leading-tight mx-auto mb-6">
            Find Your Perfect Home or List Your Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-brand-200 to-emerald-300">RentEase</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Whether you are searching for your next rental apartment or managing properties and tenants seamlessly, RentEase makes renting transparent and simple.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup?role=tenant"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-brand-900 hover:bg-slate-100 font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
            >
              I am a Tenant <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/signup?role=landlord"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-brand-700/80 hover:bg-brand-700 text-white font-bold text-xs border border-brand-500/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
            >
              I am a Landlord
            </Link>
          </div>
        </div>
      </section>

      <div className="relative -mt-10 z-20 px-4">
        <CountUpCard />
      </div>

      {/* Properties Section for Public / Guest Users */}
      <section className="mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-8 w-full">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Explore All Properties
          </h2>
        </div>

        <PropertyCard variant="explore" />
      </section>


      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-8">
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
            Why Choose RentEase?
          </h2>
          <p className="text-base text-slate-500 mt-2 max-w-xl mx-auto">
            Everything you need for transparent, seamless, and secure property renting.
          </p>
        </div>
        <CustomFeatureGrid />
      </section>
    </div>
  );
}

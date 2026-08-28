"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Zap, HeartHandshake, Home } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import CountUpCard from "@/customComponents/CountUpCard";
import PropertyList from "@/components/PropertyList";

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
      {/* Top Header: Logo on left, Login & Sign Up buttons on right */}
      <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 px-5 sm:px-6 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-800 flex items-center justify-center text-white shadow-sm">
              <Home className="w-4 h-4" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Rent<span className="text-brand-800">Ease</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-800 hover:bg-slate-100 rounded-full transition-all"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-1.5 text-xs sm:text-sm font-semibold text-white bg-brand-800 hover:bg-brand-900 rounded-full shadow-sm hover:shadow transition-all"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

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

          <p className="text-lg sm:text-xl text-slate-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Direct connections between verified tenants and property owners. No middlemen, no confusion — just effortless renting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/signup?role=tenant")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-brand-900 hover:bg-brand-50 font-bold text-sm shadow-xl shadow-brand-950/40 transition-all flex items-center justify-center gap-2"
            >
              I Want to Rent <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/signup?role=landlord")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-brand-950/60 hover:bg-brand-900 text-white font-bold text-sm border border-brand-700/60 backdrop-blur-sm transition-all"
            >
              I Want to List Properties
            </button>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <CountUpCard />

      {/* Properties Browsing */}
      <div className="mt-6 px-8">
        <PropertyList />
      </div>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-8">
          <h2 className="text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight">
            Why Choose RentEase?
          </h2>
          <p className="text-base text-slate-500 mt-2 max-w-xl mx-auto">
            Everything you need for transparent, seamless, and secure property renting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-800 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">100% Verified Listings</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every property listing is verified with accurate details, photos, amenities, and owner contact information.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">Instant Digital Payments</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Seamlessly pay rent, generate receipts, and track your complete payment history with one-click direct actions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-700 mb-6">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2.5">Direct Management</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Dedicated portals for landlords and tenants to manage properties, leases, requests, and profiles effortlessly.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

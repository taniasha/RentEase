"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Zap, HeartHandshake, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CountUpCard from "@/customComponents/CountUpCard";
import PropertyList from "@/components/PropertyList";

export default function LandingView() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.3),rgba(255,255,255,0))]"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5" /> Next-Gen Rental Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto mb-6">
            Find Your Perfect Home or List Your Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">RentEase</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Direct connections between verified tenants and property owners. No middlemen, no confusion — just effortless renting.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/signup?role=tenant")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              I Want to Rent <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/signup?role=landlord")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-all"
            >
              I Want to List Properties
            </button>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <CountUpCard />

      {/* Properties Browsing */}
      <div className="mt-16">
        <PropertyList />
      </div>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose RentEase?
          </h2>
          <p className="text-base text-slate-500 mt-2 max-w-xl mx-auto">
            Everything you need for transparent, seamless, and secure property renting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6">
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
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6">
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

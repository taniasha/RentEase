"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Building2, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutUsView() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 pt-32 pb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About <span className="text-blue-600">RentEase</span>
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            RentEase simplifies renting for Property Owners and Tenants — clear, trustworthy, and fast. Built to save time and eliminate rental headaches.
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="rounded-3xl bg-gradient-to-tr from-blue-700 to-indigo-600 p-8 lg:p-12 text-white shadow-xl shadow-blue-700/15 mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-slate-100 text-base lg:text-lg leading-relaxed max-w-3xl mb-6">
            We eliminate confusion in property rentals by providing verified listings, automated payment histories, direct communication, and dedicated landlord/tenant dashboards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15 text-sm font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" /> Verified Properties
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" /> Direct Communication
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" /> Instant History & Receipts
            </div>
          </div>
        </div>

        {/* Role Cards */}
        <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Choose Your Portal
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Building2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Property Owner / Landlord</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              List properties with photos, track tenants, manage vacancies, and update listing pricing in seconds.
            </p>
            <Link
              href="/signup?role=landlord"
              className="mt-auto inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm transition-all"
            >
              Sign Up as Landlord <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <User className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">Tenant</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Explore listings, rent your ideal home, access receipts, and manage your active leases effortlessly.
            </p>
            <Link
              href="/signup?role=tenant"
              className="mt-auto inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-sm transition-all"
            >
              Sign Up as Tenant <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

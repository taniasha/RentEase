"use client";

import React from "react";
import { ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeatureItem {
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  title: string;
  description: string;
}

export interface CustomFeatureGridProps {
  features?: FeatureItem[];
  className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    iconBg: "bg-brand-50",
    iconColor: "text-brand-800",
    title: "100% Verified Listings",
    description:
      "Every property listing is verified with accurate details, photos, amenities, and owner contact information.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Instant Digital Payments",
    description:
      "Seamlessly pay rent, generate receipts, and track your complete payment history with one-click direct actions.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    iconBg: "bg-brand-50",
    iconColor: "text-brand-700",
    title: "Direct Management",
    description:
      "Dedicated portals for landlords and tenants to manage properties, leases, requests, and profiles effortlessly.",
  },
];

export default function CustomFeatureGrid({
  features = DEFAULT_FEATURES,
  className,
}: CustomFeatureGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8", className)}>
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col hover:-translate-y-1 group"
        >
          <div
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300",
              feature.iconBg || "bg-brand-50",
              feature.iconColor || "text-brand-800"
            )}
          >
            {feature.icon}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 tracking-tight">
            {feature.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed flex-1">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

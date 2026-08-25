"use client";

import React, { useEffect, useState } from "react";
import { Users, Home, TrendingUp, Sparkles } from "lucide-react";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

const StatItem = ({ end, label, suffix = "", icon }: StatItemProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-3 border border-blue-500/20">
        {icon}
      </div>
      <div className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-1">
        {count.toLocaleString()}
        <span className="text-blue-400 font-bold">{suffix}</span>
      </div>
      <p className="text-sm font-medium text-slate-400">{label}</p>
    </div>
  );
};

export default function CountUpCards() {
  return (
    <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-slate-950/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          <StatItem
            end={1200}
            suffix="+"
            label="Verified Properties"
            icon={<Home className="w-6 h-6" />}
          />
          <StatItem
            end={4500}
            suffix="+"
            label="Active Tenants"
            icon={<Users className="w-6 h-6" />}
          />
          <StatItem
            end={850}
            suffix="+"
            label="Trusted Landlords"
            icon={<Sparkles className="w-6 h-6" />}
          />
          <StatItem
            end={99}
            suffix="%"
            label="Satisfaction Rate"
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
}

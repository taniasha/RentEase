"use client";

import React, { useEffect, useState, useRef } from "react";
import { Users, Home, TrendingUp, Sparkles } from "lucide-react";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  icon: React.ReactNode;
}

const StatItem = ({ end, label, suffix = "", icon }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const duration = 1400; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic for silky smooth finish
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted, end]);

  return (
    <div ref={domRef} className="flex flex-col items-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-800 mb-3 border border-brand-200/60 shadow-2xs">
        {icon}
      </div>
      <div className="text-xl sm:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight mb-1 tabular-nums">
        {count.toLocaleString()}
        <span className="text-brand-800 font-bold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
};

export default function CountUpCard() {
  return (
    <section className=" mx-auto px-8 w-full my-8 relative z-10">
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 sm:p-4 lg:p-6 shadow-xl shadow-slate-200/40">
        <div className="grid grid-cols-1 text-[10px] sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
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
    </section>
  );
}

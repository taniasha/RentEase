import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  title: string;
  description: string;
  icon: string;
  color?: "blue" | "emerald" | "indigo" | "brand" | "amber";
  className?: string;
};

const colorMap = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600",
    hoverBorder: "hover:border-blue-300",
    hoverText: "group-hover:text-blue-600",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600",
    hoverBorder: "hover:border-emerald-300",
    hoverText: "group-hover:text-emerald-600",
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600",
    hoverBorder: "hover:border-indigo-300",
    hoverText: "group-hover:text-indigo-600",
  },
  brand: {
    iconBg: "bg-brand-50 text-brand-800",
    hoverBorder: "hover:border-brand-300",
    hoverText: "group-hover:text-brand-800",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600",
    hoverBorder: "hover:border-amber-300",
    hoverText: "group-hover:text-amber-600",
  },
};

export default function TenantNavCard({
  href,
  title,
  description,
  icon,
  color = "blue",
  className,
}: Props) {
  const scheme = colorMap[color] || colorMap.blue;

  return (
    <Link
      href={href}
      className={cn(
        "group p-6 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex items-center gap-4",
        scheme.hoverBorder,
        className
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform",
          scheme.iconBg
        )}
      >
        <Icon icon={icon} className="w-5 h-5" />
      </div>
      <div>
        <h4 className={cn("font-bold text-sm text-slate-900 transition-colors", scheme.hoverText)}>
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 mt-0.5">{description}</p>
      </div>
    </Link>
  );
}

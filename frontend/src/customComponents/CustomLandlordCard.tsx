"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type ColorVariant = "blue" | "emerald" | "slate" | "indigo" | "brand" | "amber";

interface CustomLandlordCardProps {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
  icon?: LucideIcon | React.ReactNode | string;
  color?: ColorVariant;
  className?: string;
}

const colorStyles: Record<
  ColorVariant,
  {
    iconBg: string;
    buttonBg: string;
    buttonHover: string;
    hoverBorder: string;
  }
> = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    buttonBg: "bg-blue-600 text-white",
    buttonHover: "hover:bg-blue-700",
    hoverBorder: "hover:border-blue-300",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    buttonBg: "bg-emerald-600 text-white",
    buttonHover: "hover:bg-emerald-700",
    hoverBorder: "hover:border-emerald-300",
  },
  slate: {
    iconBg: "bg-slate-100 text-slate-800 border border-slate-200",
    buttonBg: "bg-slate-900 text-white",
    buttonHover: "hover:bg-slate-800",
    hoverBorder: "hover:border-slate-400",
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    buttonBg: "bg-indigo-600 text-white",
    buttonHover: "hover:bg-indigo-700",
    hoverBorder: "hover:border-indigo-300",
  },
  brand: {
    iconBg: "bg-brand-50 text-brand-800 border border-brand-100",
    buttonBg: "bg-brand-800 text-white",
    buttonHover: "hover:bg-brand-900",
    hoverBorder: "hover:border-brand-300",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
    buttonBg: "bg-amber-600 text-white",
    buttonHover: "hover:bg-amber-700",
    hoverBorder: "hover:border-amber-300",
  },
};

export default function CustomLandlordCard({
  title,
  description,
  href,
  buttonText = "Open",
  icon,
  color = "blue",
  className,
}: CustomLandlordCardProps) {
  const scheme = colorStyles[color] || colorStyles.blue;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return <Icon icon={icon} className="w-6 h-6" />;
    }
    if (typeof icon === "function") {
      const IconComponent = icon as LucideIcon;
      return <IconComponent className="w-6 h-6" />;
    }
    return icon;
  };

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-xl bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-200",
        scheme.hoverBorder,
        className
      )}
    >
      <div>
        {icon && (
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-2xs",
              scheme.iconBg
            )}
          >
            {renderIcon()}
          </div>
        )}
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs",
          scheme.buttonBg,
          scheme.buttonHover
        )}
      >
        {buttonText} <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

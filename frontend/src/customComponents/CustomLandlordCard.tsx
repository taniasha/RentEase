"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

import { ColorVariant, colorStyles } from "@/utils/colorStyles";

interface CustomLandlordCardProps {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
  icon?: LucideIcon | React.ReactNode | string;
  color?: ColorVariant;
  className?: string;
}

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
    if (React.isValidElement(icon)) {
      return icon;
    }
    if (typeof icon === "string") {
      return <Icon icon={icon} className="w-6 h-6" />;
    }
    const IconComponent = icon as React.ComponentType<{ className?: string }>;
    return <IconComponent className="w-6 h-6" />;
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

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

import { ColorVariant, colorStyles } from "@/utils/colorStyles";

type Props = {
  href: string;
  title: string;
  description: string;
  icon: string;
  color?: ColorVariant;
  className?: string;
};

export default function TenantLandlordCard({
  href,
  title,
  description,
  icon,
  color = "blue",
  className,
}: Props) {
  const scheme = colorStyles[color] || colorStyles.blue;

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

export { TenantLandlordCard as TenantNavCard };

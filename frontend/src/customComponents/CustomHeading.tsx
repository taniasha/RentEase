import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subTitle?: string;
  icon?: string;
  className?: string;
};

export default function CustomHeading({ title, subTitle, icon, className }: Props) {
  return (
    <Card className={cn("w-full bg-white flex items-center gap-4 p-3 rounded-xl border border-slate-200/80 shadow-xs", className)}>
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-800 shrink-0 border border-brand-100">
          <Icon icon={icon} className="w-5 h-5 text-blue-800" />
        </div>
      )}
      <div>
        <h2 className="text-md sm:text-sm lg:text-md font-bold text-slate-900 leading-tight">
          {title}
        </h2>
        {subTitle && (
          <p className="text-xs sm:text-xs lg:text-sm font-normal text-slate-500 mt-0.5">
            {subTitle}
          </p>
        )}
      </div>
    </Card>
  );
}
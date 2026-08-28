export type ColorVariant =
  | "blue"
  | "emerald"
  | "slate"
  | "indigo"
  | "brand"
  | "amber";

export interface ColorScheme {
  iconBg: string;
  buttonBg: string;
  buttonHover: string;
  hoverBorder: string;
  hoverText?: string;
}

export const colorStyles: Record<ColorVariant, ColorScheme> = {
  blue: {
    iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
    buttonBg: "bg-blue-600 text-white",
    buttonHover: "hover:bg-blue-700",
    hoverBorder: "hover:border-blue-300",
    hoverText: "group-hover:text-blue-600",
  },
  emerald: {
    iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    buttonBg: "bg-emerald-600 text-white",
    buttonHover: "hover:bg-emerald-700",
    hoverBorder: "hover:border-emerald-300",
    hoverText: "group-hover:text-emerald-600",
  },
  slate: {
    iconBg: "bg-slate-100 text-slate-800 border border-slate-200",
    buttonBg: "bg-slate-900 text-white",
    buttonHover: "hover:bg-slate-800",
    hoverBorder: "hover:border-slate-400",
    hoverText: "group-hover:text-slate-900",
  },
  indigo: {
    iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-100",
    buttonBg: "bg-indigo-600 text-white",
    buttonHover: "hover:bg-indigo-700",
    hoverBorder: "hover:border-indigo-300",
    hoverText: "group-hover:text-indigo-600",
  },
  brand: {
    iconBg: "bg-brand-50 text-brand-800 border border-brand-100",
    buttonBg: "bg-brand-800 text-white",
    buttonHover: "hover:bg-brand-900",
    hoverBorder: "hover:border-brand-300",
    hoverText: "group-hover:text-brand-800",
  },
  amber: {
    iconBg: "bg-amber-50 text-amber-600 border border-amber-100",
    buttonBg: "bg-amber-600 text-white",
    buttonHover: "hover:bg-amber-700",
    hoverBorder: "hover:border-amber-300",
    hoverText: "group-hover:text-amber-600",
  },
};

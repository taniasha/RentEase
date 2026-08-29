"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
}

const CustomSelect = forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder = "Select an option",
      containerClassName = "",
      className = "",
      id,
      name,
      icon,
      ...props
    },
    ref
  ) => {
    const selectId = id || name;

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-slate-700 tracking-wide block"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 z-10">
              {icon}
            </div>
          )}

          <Select
            ref={ref}
            id={selectId}
            name={name}
            className={cn(
              "h-10 rounded-md px-3.5 text-sm shadow-sm",
              icon && "pl-10",
              error && "border-red-500 focus-visible:ring-red-500/20",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>

        {error && (
          <p className="text-xs font-medium text-red-600 flex items-center gap-1 mt-1 animate-in fade-in duration-200">
            <span>●</span> {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-xs text-slate-500 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

export default CustomSelect;

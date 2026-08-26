"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
  icon?: React.ReactNode;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      error,
      helperText,
      containerClassName = "",
      className = "",
      id,
      name,
      type = "text",
      icon,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={cn("space-y-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-700 tracking-wide block"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}

          <Input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            className={cn(
              "h-11 rounded-md px-3.5 text-sm shadow-sm",
              icon && "pl-10",
              error && "border-red-500 focus-visible:ring-red-500/20",
              className
            )}
            {...props}
          />
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

CustomInput.displayName = "CustomInput";

export default CustomInput;

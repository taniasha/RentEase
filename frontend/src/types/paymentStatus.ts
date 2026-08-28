import React from "react";
import { CheckCircle2, AlertCircle, Clock, AlertTriangle } from "lucide-react";

export enum PaymentStatus {
  PAID_FULL = "PAID_FULL",
  PARTIAL = "PARTIAL",
  PENDING = "PENDING",
  OVERDUE = "OVERDUE",
}

export interface PaymentStatusConfig {
  label: string;
  className: string;
  icon: React.ElementType;
}

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, PaymentStatusConfig> = {
  [PaymentStatus.PAID_FULL]: {
    label: "Paid Full",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  [PaymentStatus.PARTIAL]: {
    label: "Partial",
    className: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle,
  },
  [PaymentStatus.PENDING]: {
    label: "Pending",
    className: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Clock,
  },
  [PaymentStatus.OVERDUE]: {
    label: "Overdue",
    className: "bg-rose-50 text-rose-700 border-rose-200",
    icon: AlertTriangle,
  },
};

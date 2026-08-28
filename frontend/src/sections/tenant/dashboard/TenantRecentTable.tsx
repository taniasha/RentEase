"use client";

import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Card from "@/customComponents/Card";
import MyRentalView from "../myRentals/view/MyRentalView";

export default function TenantRecentTable() {
  return (
    <div className="space-y-4">
      <Card className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Icon icon="solar:bill-list-bold-duotone" className="w-5 h-5 text-blue-600" />
            Recent Payment Records
          </h3>
        </div>

        <Link
          href="/my-rental"
          className="text-xs font-semibold text-brand-800 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          Full History <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
        </Link>
      </Card>

      <MyRentalView hideHeading maxHeight="max-h-[280px] h-[280px] overflow-y-auto" />
    </div>
  );
}
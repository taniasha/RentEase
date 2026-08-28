"use client";
import React from "react";
import PropertyCard from "@/customComponents/PropertyCard";
import CustomHeading from "@/customComponents/CustomHeading";

export default function ExplorePropertyView() {
  return (
    <div className="space-y-3">
      <CustomHeading title="Available Properties" icon="boxicons:buildings" />
      <PropertyCard />
    </div>
  );
}

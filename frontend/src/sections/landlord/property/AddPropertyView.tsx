"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Building } from "lucide-react";
import { addProperty } from "@/actions/property";
import PropertyForm from "./PropertyForm";
import { PropertyFormData } from "@/types/propertySchema";
import CustomBackNavigate from "@/customComponents/CustomBackNavigate";
import CustomHeading from "@/customComponents/CustomHeading";

export default function AddPropertyView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: PropertyFormData) => {
    setLoading(true);

    const payload = {
      ...data,
      price: Number(data.price),
      bedrooms: data.bedrooms ? Number(data.bedrooms) : 0,
      bathrooms: data.bathrooms ? Number(data.bathrooms) : 0,
      area: data.area ? Number(data.area) : 0,
      age: data.age ? Number(data.age) : 0,
      amenities: data.amenities
        ? data.amenities.split(",").map((a) => a.trim())
        : [],
      images: data.images
        ? data.images.split(",").map((img) => img.trim())
        : [],
    };

    try {
      await addProperty(payload);
      toast.success("Property added successfully!");
      router.push("/manage-properties");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 ">
      <CustomHeading title="Add New Property" icon="bi:building" />

      <div className="bg-white rounded-xl p-4 sm:p-6 border border-slate-200/80 shadow-xl shadow-slate-200/40">
        <PropertyForm
          onSubmit={handleSubmit}
          loading={loading}
          submitButtonText="Add Property"
          onCancel={() => router.push("/landlord-dashboard")}
          cancelButtonText="Cancel"
        />
      </div>
    </div>

  );
}

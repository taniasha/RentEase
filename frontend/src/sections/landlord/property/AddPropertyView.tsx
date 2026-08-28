"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Building, ArrowLeft } from "lucide-react";
import { addProperty } from "@/actions/property";
import PropertyForm from "./PropertyForm";
import { PropertyFormData } from "@/types/propertySchema";

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/landlord-dashboard")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New Property</h1>
            <p className="text-xs text-slate-500 mt-0.5">Fill in the property details below to list your rental</p>
          </div>
        </div>

        <PropertyForm
          onSubmit={handleSubmit}
          loading={loading}
          submitButtonText="Publish Listing"
          onCancel={() => router.push("/landlord-dashboard")}
          cancelButtonText="Cancel"
        />
      </div>
    </div>
  );
}

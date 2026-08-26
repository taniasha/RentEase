"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Edit3, ArrowLeft } from "lucide-react";
import { getPropertyById, updateProperty } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import PropertyForm from "./PropertyForm";
import { PropertyFormData } from "@/types/propertySchema";

export default function EditPropertyView() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [initialData, setInitialData] = useState<Partial<PropertyFormData> | null>(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadProperty = async () => {
      try {
        const p = await getPropertyById(id);
        if (p) {
          setInitialData({
            title: p.title || "",
            price: String(p.price || ""),
            location: p.location || "",
            type: (p.type as "rent" | "sell") || "rent",
            negotiable: Boolean(p.negotiable),
            bedrooms: p.bedrooms ? String(p.bedrooms) : "",
            bathrooms: p.bathrooms ? String(p.bathrooms) : "",
            area: p.area ? String(p.area) : "",
            availableFrom: p.availableFrom || "",
            furnishing: p.furnishing || "",
            age: p.age ? String(p.age) : "",
            amenities: p.amenities ? p.amenities.join(", ") : "",
            description: p.description || "",
            images: p.images ? p.images.join(", ") : "",
            ownerName: p.ownerName || "Landlord",
            ownerEmail: p.ownerEmail || "landlord@example.com",
            ownerPhone: p.ownerPhone || "9876543210",
          });
        }
      } catch (err: any) {
        console.error(err);
        toast.error("Failed to load property details.");
      } finally {
        setFetching(false);
      }
    };

    loadProperty();
  }, [id]);

  const handleSubmit = async (data: PropertyFormData) => {
    setSaving(true);
    const updatedProperty = {
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
      await updateProperty(id, updatedProperty);
      toast.success("Property updated successfully!");
      router.push("/manage-properties");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  if (fetching) {
    return <LoadingSpinner className="py-32" message="Loading property details..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => router.push("/manage-properties")}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Manage Properties
      </button>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Edit Property Listing</h1>
            <p className="text-xs text-slate-500 mt-0.5">Modify listing information and save changes</p>
          </div>
        </div>

        {initialData && (
          <PropertyForm
            initialValues={initialData}
            onSubmit={handleSubmit}
            loading={saving}
            submitButtonText="Save Changes"
            onCancel={() => router.push("/manage-properties")}
            cancelButtonText="Cancel"
          />
        )}
      </div>
    </div>
  );
}

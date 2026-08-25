"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { PlusCircle, Loader2, Building, ArrowLeft } from "lucide-react";
import { addProperty } from "@/actions/property";
import CustomInput from "@/customComponents/CustomInput";
import CustomSelect from "@/customComponents/CustomSelect";
import { propertySchema, PropertyFormData } from "@/types/propertySchema";

export default function AddPropertyView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      location: "",
      type: "rent",
      price: "",
      negotiable: false,
      bedrooms: "",
      bathrooms: "",
      area: "",
      availableFrom: "",
      furnishing: "",
      age: "",
      amenities: "",
      description: "",
      images: "",
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
    },
  });

  const onSubmit = async (data: PropertyFormData) => {
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
      reset();
      setTimeout(() => {
        router.push("/manage-properties");
      }, 1000);
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
        onClick={() => router.back()}
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
            <p className="text-xs text-slate-500 mt-0.5">Fill in the property details to publish your listing</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Section: Basic Information */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomInput
                label="Property Title"
                placeholder="Modern 2BHK Apartment"
                error={errors.title?.message}
                {...register("title")}
              />

              <CustomInput
                label="Location / City"
                placeholder="Bandra West, Mumbai"
                error={errors.location?.message}
                {...register("location")}
              />

              <CustomSelect
                label="Listing Type"
                options={[
                  { value: "rent", label: "For Rent" },
                  { value: "sell", label: "For Sale" },
                ]}
                error={errors.type?.message}
                {...register("type")}
              />

              <CustomInput
                label="Price (₹)"
                type="number"
                placeholder="25000"
                error={errors.price?.message}
                {...register("price")}
              />
            </div>
          </div>

          {/* Section: Specs */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Property Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <CustomInput
                label="Bedrooms"
                type="number"
                placeholder="2"
                error={errors.bedrooms?.message}
                {...register("bedrooms")}
              />
              <CustomInput
                label="Bathrooms"
                type="number"
                placeholder="2"
                error={errors.bathrooms?.message}
                {...register("bathrooms")}
              />
              <CustomInput
                label="Area (sq.ft)"
                type="number"
                placeholder="1150"
                error={errors.area?.message}
                {...register("area")}
              />
              <CustomInput
                label="Age of Property (yrs)"
                type="number"
                placeholder="3"
                error={errors.age?.message}
                {...register("age")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <CustomInput
                label="Available From"
                type="date"
                error={errors.availableFrom?.message}
                {...register("availableFrom")}
              />
              <CustomSelect
                label="Furnishing Status"
                options={[
                  { value: "furnished", label: "Fully Furnished" },
                  { value: "semi-furnished", label: "Semi-Furnished" },
                  { value: "unfurnished", label: "Unfurnished" },
                ]}
                placeholder="Select furnishing status"
                error={errors.furnishing?.message}
                {...register("furnishing")}
              />
            </div>
          </div>

          {/* Section: Amenities & Media */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Features & Media
            </h3>
            <div className="space-y-4">
              <CustomInput
                label="Amenities (Comma separated)"
                placeholder="Covered Parking, 24/7 Security, Gym, Swimming Pool, Lift"
                error={errors.amenities?.message}
                {...register("amenities")}
              />
              <CustomInput
                label="Image URLs (Comma separated)"
                placeholder="https://images.unsplash.com/photo-1, https://images.unsplash.com/photo-2"
                error={errors.images?.message}
                {...register("images")}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide block">
                  Property Description
                </label>
                <textarea
                  className="flex min-h-[90px] w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                  rows={3}
                  placeholder="Spacious and well-ventilated apartment in a prime location with all modern amenities..."
                  {...register("description")}
                />
              </div>
            </div>
          </div>

          {/* Section: Owner Contact Info */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Owner Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <CustomInput
                label="Owner Name"
                placeholder="Landlord Name"
                error={errors.ownerName?.message}
                {...register("ownerName")}
              />
              <CustomInput
                label="Owner Email"
                type="email"
                placeholder="landlord@example.com"
                error={errors.ownerEmail?.message}
                {...register("ownerEmail")}
              />
              <CustomInput
                label="Owner Phone"
                type="tel"
                placeholder="+91 9876543210"
                error={errors.ownerPhone?.message}
                {...register("ownerPhone")}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Adding Property...
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" /> Publish Listing
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

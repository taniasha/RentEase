"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import CustomInput from "@/customComponents/CustomInput";
import CustomSelect from "@/customComponents/CustomSelect";
import { propertySchema, PropertyFormData } from "@/types/propertySchema";

export interface PropertyFormProps {
  initialValues?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => Promise<void> | void;
  loading?: boolean;
  submitButtonText?: string;
  onCancel?: () => void;
  cancelButtonText?: string;
}

export default function PropertyForm({
  initialValues,
  onSubmit,
  loading = false,
  submitButtonText = "Submit",
  onCancel,
  cancelButtonText = "Cancel",
}: PropertyFormProps) {
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
      ...initialValues,
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title || "",
        location: initialValues.location || "",
        type: initialValues.type || "rent",
        price: initialValues.price ? String(initialValues.price) : "",
        negotiable: Boolean(initialValues.negotiable),
        bedrooms: initialValues.bedrooms ? String(initialValues.bedrooms) : "",
        bathrooms: initialValues.bathrooms ? String(initialValues.bathrooms) : "",
        area: initialValues.area ? String(initialValues.area) : "",
        availableFrom: initialValues.availableFrom || "",
        furnishing: initialValues.furnishing || "",
        age: initialValues.age ? String(initialValues.age) : "",
        amenities: initialValues.amenities || "",
        description: initialValues.description || "",
        images: initialValues.images || "",
        ownerName: initialValues.ownerName || "",
        ownerEmail: initialValues.ownerEmail || "",
        ownerPhone: initialValues.ownerPhone || "",
      });
    }
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div>
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-black mb-4">
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
        <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
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

      {/* Section: Features & Media */}
      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
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
            <label className="text-xs font-semibold text-black tracking-wide block">
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
        <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
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

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="h-10 px-6 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
          >
            {cancelButtonText}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="h-10 px-6 rounded-xl bg-blue-900 hover:bg-blue-700 disabled:opacity-60 text-white font-bold text-xs shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </div>
    </form>
  );
}

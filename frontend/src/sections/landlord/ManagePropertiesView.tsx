"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Sliders, MapPin } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import { updateProperty, deleteProperty } from "@/actions/property";
import CustomInput from "@/customComponents/CustomInput";
import CustomSelect from "@/customComponents/CustomSelect";
import ActionMenu from "@/customComponents/ActionMenu";
import EmptyState from "@/customComponents/EmptyState";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import CustomDialog from "@/customComponents/CustomDialog";
import { Property } from "@/types/interface";

export default function ManagePropertiesView() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editProperty, setEditProperty] = useState<Property | null>(null);
  const [form, setForm] = useState<any>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await getLandlordProperties();
      setProperties(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: Property) => {
    setEditProperty(property);
    setFormErrors({});
    setForm({
      title: property.title || "",
      price: property.price || "",
      location: property.location || "",
      type: property.type || "rent",
      bedrooms: property.bedrooms || "",
      bathrooms: property.bathrooms || "",
      area: property.area || "",
      availableFrom: property.availableFrom || "",
      furnishing: property.furnishing || "",
      age: property.age || "",
      amenities: property.amenities ? property.amenities.join(", ") : "",
      description: property.description || "",
      images: property.images ? property.images.join(", ") : "",
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!form.title || form.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    }
    if (!form.location || form.location.trim().length < 2) {
      errors.location = "Location is required";
    }
    if (!form.price || Number(form.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveEdit = async () => {
    if (!editProperty) return;
    if (!validateForm()) {
      toast.error("Please resolve form errors before saving.");
      return;
    }

    setSaving(true);
    const updatedProperty = {
      ...form,
      price: Number(form.price),
      bedrooms: Number(form.bedrooms) || 0,
      bathrooms: Number(form.bathrooms) || 0,
      area: Number(form.area) || 0,
      age: Number(form.age) || 0,
      amenities: form.amenities ? form.amenities.split(",").map((a: string) => a.trim()) : [],
      images: form.images ? form.images.split(",").map((img: string) => img.trim()) : [],
    };

    try {
      await updateProperty(editProperty._id, updatedProperty);
      toast.success("Property updated successfully!");
      setEditProperty(null);
      fetchProperties();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update property.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property listing?")) return;
    try {
      await deleteProperty(id);
      toast.success("Property deleted successfully!");
      fetchProperties();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete property.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sliders className="w-7 h-7 text-blue-600" /> Manage Properties
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update listing details, pricing, availability, or remove listings.
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading your properties..." />
      ) : properties.length === 0 ? (
        <EmptyState
          title="No properties listed yet"
          description="You haven't added any listings yet. Add your first property to start managing."
          actionText="Add New Property"
          actionHref="/addproperty"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="group relative bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images && p.images[0] ? p.images[0] : "/default.jpg"}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Action Menu */}
                <ActionMenu
                  onEdit={() => handleEdit(p)}
                  onDelete={() => handleDeleteProperty(p._id)}
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1 mb-1">
                    {p.title}
                  </h3>
                  <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                    <span className="line-clamp-1">{p.location}</span>
                  </div>
                  <p className="text-lg font-extrabold text-blue-600 mb-3">
                    ₹{Number(p.price).toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <StatusBadge status={p.tenant ? "Rented" : "Available"} />
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Edit Listing →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Property CustomDialog */}
      <CustomDialog
        isOpen={Boolean(editProperty)}
        onClose={() => setEditProperty(null)}
        title={editProperty ? `Edit: ${editProperty.title}` : "Edit Property"}
        maxWidth="xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              label="Property Title"
              placeholder="Title"
              value={form.title || ""}
              error={formErrors.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <CustomInput
              label="Price (₹)"
              type="number"
              placeholder="Price"
              value={form.price || ""}
              error={formErrors.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <CustomInput
              label="Location / City"
              placeholder="Location"
              value={form.location || ""}
              error={formErrors.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <CustomSelect
              label="Listing Type"
              options={[
                { value: "rent", label: "For Rent" },
                { value: "sell", label: "For Sale" },
              ]}
              value={form.type || "rent"}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <CustomInput
              label="Bedrooms"
              type="number"
              placeholder="2"
              value={form.bedrooms || ""}
              onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            />
            <CustomInput
              label="Bathrooms"
              type="number"
              placeholder="2"
              value={form.bathrooms || ""}
              onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
            />
            <CustomInput
              label="Area (sq.ft)"
              type="number"
              placeholder="1200"
              value={form.area || ""}
              onChange={(e) => setForm({ ...form, area: e.target.value })}
            />
            <CustomInput
              label="Age (yrs)"
              type="number"
              placeholder="3"
              value={form.age || ""}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <CustomInput
              label="Available From"
              type="date"
              value={form.availableFrom || ""}
              onChange={(e) => setForm({ ...form, availableFrom: e.target.value })}
            />
            <CustomSelect
              label="Furnishing Status"
              options={[
                { value: "furnished", label: "Furnished" },
                { value: "semi-furnished", label: "Semi-Furnished" },
                { value: "unfurnished", label: "Unfurnished" },
              ]}
              value={form.furnishing || ""}
              onChange={(e) => setForm({ ...form, furnishing: e.target.value })}
            />
          </div>

          <CustomInput
            label="Amenities (Comma separated)"
            placeholder="Parking, Gym, Security"
            value={form.amenities || ""}
            onChange={(e) => setForm({ ...form, amenities: e.target.value })}
          />

          <CustomInput
            label="Image URLs (Comma separated)"
            placeholder="https://example.com/photo1.jpg, https://example.com/photo2.jpg"
            value={form.images || ""}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 tracking-wide block">
              Description
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 shadow-sm transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              rows={3}
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
            <button
              type="button"
              className="h-10 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-semibold transition-colors"
              onClick={() => setEditProperty(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={saveEdit}
              className="h-10 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-semibold shadow-sm transition-all"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </CustomDialog>
    </div>
  );
}

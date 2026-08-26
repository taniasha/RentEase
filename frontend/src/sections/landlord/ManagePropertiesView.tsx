"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Sliders, MapPin } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import { deleteProperty } from "@/actions/property";
import ActionMenu from "@/customComponents/ActionMenu";
import EmptyState from "@/customComponents/EmptyState";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import { Property } from "@/types/interface";

export default function ManagePropertiesView() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
    router.push(`/edit-property/${property._id}`);
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

                  {p.location ? (
                    <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                      <span className="line-clamp-1">{p.location}</span>
                    </div>
                  ) : null}

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
    </div>
  );
}

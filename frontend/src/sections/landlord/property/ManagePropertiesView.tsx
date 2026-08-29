"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { MapPin, ImageOff } from "lucide-react";
import { getLandlordProperties } from "@/actions/landlord";
import { deleteProperty } from "@/actions/property";
import ActionMenu from "@/customComponents/ActionMenu";
import EmptyState from "@/customComponents/EmptyState";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import { Property } from "@/types/interface";
import CustomHeading from "@/customComponents/CustomHeading";

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
    <div className="space-y-2 mx-auto">
      <CustomHeading title="Manage Properties" icon="bi:building" />

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((p) => (
            <div
              key={p._id}
              className="group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                {p.images ? (
                  <img
                    src={p.images[0]}
                    alt={p.title || "Property preview"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-100/90 text-slate-400">
                    <ImageOff className="w-8 h-8 mb-1.5 opacity-60" />
                    <span className="text-xs font-semibold text-slate-500">No image has been added</span>
                  </div>
                )}

                <ActionMenu
                  onView={() => router.push(`/property/${p._id}`)}
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

                  <p className="text-md font-extrabold text-blue-800 mb-3">
                    ₹{Number(p.price).toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

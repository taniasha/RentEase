"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { getAllProperties } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import EmptyState from "@/customComponents/EmptyState";
import { Property } from "@/types/interface";
import CustomHeading from "@/customComponents/CustomHeading";
import Card from "@/customComponents/Card";

export default function PropertySection() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getAllProperties();
        setProperties(data || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="w-full space-y-6">
      <CustomHeading title="Available Properties" icon="boxicons:buildings" />

      {loading ? (
        <LoadingSpinner message="Loading properties..." />
      ) : properties.length === 0 ? (
        <EmptyState
          title="No properties available"
          description="There are currently no listings published. Check back soon!"
        />
      ) : (
        <Card className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={p.images && p.images[0] ? p.images[0] : "/default.jpg"}
                  alt={p.title || "Property image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wider">
                  {p.type === "sell" ? "For Sale" : "For Rent"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {p.title || p.name}
                  </h3>
                </div>

                <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
                  <span className="line-clamp-1">{p.location}</span>
                </div>

                <p className="text-xl font-extrabold text-blue-600 mb-3">
                  ₹{Number(p.price).toLocaleString()}
                  {p.type !== "sell" && (
                    <span className="text-xs font-normal text-slate-400">/mo</span>
                  )}
                </p>

                {p.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                )}

                <button
                  className="w-full mt-auto h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  onClick={() => router.push(`/property/${p._id}`)}
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

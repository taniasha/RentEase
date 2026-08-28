"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ImageOff } from "lucide-react";
import { getAllProperties } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import EmptyState from "@/customComponents/EmptyState";
import { Property } from "@/types/interface";
import Card from "@/customComponents/Card";

export default function PropertyCard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

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
              className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                {p.images && p.images.length > 0 ? (
                  <img
                    src={p.images[0]}
                    alt={p.title || "Property image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-100/90 text-slate-400">
                    <ImageOff className="w-8 h-8 mb-1.5 opacity-60" />
                    <span className="text-xs font-semibold text-slate-500">No image added by user</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm uppercase tracking-wider">
                  {p.type === "sell" ? "For Sale" : "For Rent"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
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

                <Link
                  href={`/property/${p._id}`}
                  prefetch={true}
                  className="w-full mt-auto h-10 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

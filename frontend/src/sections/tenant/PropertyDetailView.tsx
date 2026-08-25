"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  User,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { getPropertyById } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import { Property } from "@/types/interface";

export default function PropertyDetailView() {
  const params = useParams();
  const id = params?.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return <LoadingSpinner className="py-32" message="Loading property details..." />;
  }

  if (!property) {
    return (
      <div className="max-w-xl mx-auto py-24 px-4 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Property Not Found</h3>
        <p className="text-sm text-slate-500 mb-6">The requested listing could not be found or has been removed.</p>
        <button
          onClick={() => router.push("/explore")}
          className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const handleProceedToRent = () => {
    if (typeof window !== "undefined") {
      const selectedData = {
        _id: property._id,
        rentAmount: property.price,
        title: property.title,
      };
      localStorage.setItem("selectedProperty", JSON.stringify(selectedData));
    }
    router.push("/payment");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Properties
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Image */}
          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={property.images && property.images[0] ? property.images[0] : "/default.jpg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <StatusBadge status={property.tenant ? "Rented" : "Available"} />
            </div>
          </div>

          {/* Heading and Location */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-sm font-medium text-slate-500 mb-6">
              <MapPin className="w-4 h-4 mr-1.5 text-slate-400" />
              <span>{property.location}</span>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-2xs">
                  <Bed className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Bedrooms</p>
                  <p className="text-sm font-bold text-slate-800">{property.bedrooms || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-2xs">
                  <Bath className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Bathrooms</p>
                  <p className="text-sm font-bold text-slate-800">{property.bathrooms || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-2xs">
                  <Maximize2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Area</p>
                  <p className="text-sm font-bold text-slate-800">{property.area ? `${property.area} sq.ft` : "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-2xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold">Available</p>
                  <p className="text-sm font-bold text-slate-800">{property.availableFrom || "Immediate"}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-base font-bold text-slate-900 mb-2">Description</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {property.description || "No description provided."}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities && property.amenities.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Amenities
                </h3>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/60"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pricing & Owner Card */}
        <div className="space-y-6">
          {/* Price Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Rental Price
            </p>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-extrabold text-blue-600">
                ₹{Number(property.price).toLocaleString()}
              </span>
              <span className="text-sm text-slate-500">/ month</span>
            </div>

            {property.negotiable && (
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 mb-6">
                ✓ Price Negotiable
              </span>
            )}

            <button
              onClick={handleProceedToRent}
              disabled={Boolean(property.tenant)}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
            >
              {property.tenant ? "Property Already Rented" : "Proceed to Rent"}
            </button>
          </div>

          {/* Owner Info Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
              Property Owner Info
            </h3>

            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-base">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{property.ownerName || "Landlord"}</p>
                <p className="text-xs text-slate-400">Verified Owner</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{property.ownerPhone || "Not available"}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{property.ownerEmail || "Not available"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

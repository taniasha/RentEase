"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { getPropertyById } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import { Property } from "@/types/interface";

export default function PropertyDetailView() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserRole(localStorage.getItem("role"));
      setCurrentUserId(localStorage.getItem("userId"));
    }
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) {
          const data = await getPropertyById(id);
          setProperty(data);
        }
      } catch (err) {
        console.error("Error fetching property detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <LoadingSpinner message="Loading property details..." />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Property Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested listing could not be found or has been removed.</p>
        <button
          onClick={() => router.push("/explore")}
          className="h-10 px-5 rounded-xl bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold transition-all"
        >
          Back to Listings
        </button>
      </div>
    );
  }

  const isOwner =
    userRole === "landlord" &&
    ((property.landlordId && property.landlordId === currentUserId) ||
      (property.owner && property.owner === currentUserId));

  const isLandlord = userRole === "landlord";

  const handleProceedToRent = () => {
    if (userRole === "landlord") {
      return;
    }

    if (!userRole) {
      router.push("/login");
      return;
    }

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
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge status={property.tenant ? "Rented" : "Available"} />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-3 py-0.5 rounded-md">
              {property.type === "sell" ? "For Sale" : "For Rent"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            {property.title || property.name}
          </h1>
          <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            {property.location}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {property.type === "sell" ? "Price" : "Rent"}
          </p>
          <p className="text-3xl sm:text-4xl font-black text-brand-800">
            ₹{Number(property.price).toLocaleString()}
            {property.type !== "sell" && (
              <span className="text-sm font-normal text-slate-400">/mo</span>
            )}
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="space-y-4 mb-10">
        <div className="relative h-72 sm:h-96 lg:h-[460px] w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              property.images && property.images.length > 0
                ? property.images[activeImage]
                : "/default.jpg"
            }
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {property.images && property.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                  activeImage === idx ? "border-brand-800 shadow-md scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Specs Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 mb-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-2xs">
            <Bed className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Bedrooms</p>
            <p className="text-sm font-bold text-slate-800">{property.bedrooms || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-2xs">
            <Bath className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Bathrooms</p>
            <p className="text-sm font-bold text-slate-800">{property.bathrooms || "N/A"}</p>
          </div>
        </div>

        {property.area && Number(property.area) > 0 ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-2xs">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold">Area</p>
              <p className="text-sm font-bold text-slate-800">{property.area} sq.ft</p>
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-2xs">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold">Available</p>
            <p className="text-sm font-bold text-slate-800">
              {property.availableFrom
                ? new Date(property.availableFrom).toLocaleDateString()
                : "Immediate"}
            </p>
          </div>
        </div>
      </div>

      {/* Description and Amenities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">About this space</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {property.description || "No description provided."}
            </p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action / Landlord Card */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              {isOwner ? "Manage Your Property" : "Ready to Move In?"}
            </h3>

            {isOwner ? (
              <button
                onClick={() => router.push(`/edit-property/${property._id}`)}
                className="w-full h-12 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md shadow-brand-950/20 transition-all flex items-center justify-center gap-2"
              >
                Edit Your Listing
              </button>
            ) : isLandlord ? (
              <button
                disabled
                className="w-full h-12 rounded-xl bg-slate-200 text-slate-500 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-not-allowed"
              >
                Landlord View (Rentals for Tenants Only)
              </button>
            ) : (
              <button
                onClick={handleProceedToRent}
                className="w-full h-12 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md shadow-brand-950/20 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Rent
              </button>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Verified & protected by RentEase
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

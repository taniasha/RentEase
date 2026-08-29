"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { MapPin, Bed, Bath, Maximize2, Calendar, ArrowLeft, CheckCircle2, ShieldCheck,Phone, ImageOff, UserIcon, Mail} from "lucide-react";
import { getPropertyById } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import StatusBadge from "@/customComponents/StatusBadge";
import { Property } from "@/types/interface";
import Card from "@/customComponents/Card";
import CustomBackNavigate from "@/customComponents/CustomBackNavigate";

export default function PropertyDetailView() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [imgError, setImgError] = useState(false);
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
    <div className="w-full mx-auto px-4 sm:px-6">
    <CustomBackNavigate/>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <Card className="p-6 sm:p-8 space-y-6 shadow-sm border-slate-200/90 rounded-xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <StatusBadge status={property.tenant ? "Rented" : "Available"} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                    {property.type === "sell" ? "For Sale" : "For Rent"}
                  </span>
                  {property.furnishing && (
                    <span className="text-[10px] font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-md capitalize">
                      {property.furnishing}
                    </span>
                  )}
                </div>

                <h1 className="text-lg sm:text-md font-black text-slate-900 tracking-tight">
                  {property.title || property.name}
                </h1>

                <p className="flex items-center gap-1.3 text-[10px] text-slate-500">
                  <MapPin className="w-3 h-3  shrink-0 text-blue-600" />
                  {property.location}
                </p>
              </div>

              <div className="sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  {property.type === "sell" ? "Price" : "Rent Amount"}
                </p>
                <p className="text-lg sm:text-md font-black text-brand-800">
                  ₹{Number(property.price).toLocaleString()}
                  {property.type !== "sell" && (
                    <span className="text-sm font-normal text-slate-400">/mo</span>
                  )}
                </p>
              </div>
            </div>

            {/* Specs Overview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              {property.bedrooms ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Bedrooms</p>
                    <p className="text-sm font-bold text-slate-800">{property.bedrooms}</p>
                  </div>
                </div>
              ) : null}

              {property.bathrooms ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100">
                    <Bath className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Bathrooms</p>
                    <p className="text-sm font-bold text-slate-800">{property.bathrooms}</p>
                  </div>
                </div>
              ) : null}

              {property.area && Number(property.area) > 0 ? (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Area</p>
                    <p className="text-xs font-bold text-slate-800">{property.area} sq.ft</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Type</p>
                    <p className="text-xs font-bold text-slate-800 capitalize">{property.type || "Residential"}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">Available</p>
                  <p className="text-xs font-bold text-slate-800">
                    {property.availableFrom
                      ? new Date(property.availableFrom).toLocaleDateString()
                      : "Immediate"}
                  </p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-1 pt-2">
              <h2 className="text-sm font-bold text-slate-900">About this space</h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description || "No description provided for this property listing."}
              </p>
            </div>

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-bold text-slate-900">Amenities & Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-slate-100/80 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord / Owner Details */}
            {(property.ownerName || property.ownerEmail || property.ownerPhone) && (
              <div className="space-y-3 pt-2">
                <h2 className="text-sm font-bold text-slate-900">Landlord / Owner Details</h2>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  {property.ownerName && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-brand-800 shadow-xs border border-slate-100 shrink-0">
                        <UserIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-semibold uppercase">Owner Name</p>
                        <p className="text-xs font-bold text-slate-800">{property.ownerName}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {property.ownerEmail && (
                      <a
                        href={`mailto:${property.ownerEmail}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/60 hover:border-brand-800/40 hover:bg-slate-50 transition-all text-slate-700 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-brand-800 shrink-0 border border-slate-100">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Email</p>
                          <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-800">
                            {property.ownerEmail}
                          </p>
                        </div>
                      </a>
                    )}

                    {property.ownerPhone && (
                      <a
                        href={`tel:${property.ownerPhone}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/60 hover:border-brand-800/40 hover:bg-slate-50 transition-all text-slate-700 group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-brand-800 shrink-0 border border-slate-100">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] text-slate-400 font-semibold uppercase">Phone</p>
                          <p className="text-xs font-semibold text-slate-800 truncate group-hover:text-brand-800">
                            {property.ownerPhone}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action CTA Block */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              {isOwner ? (
                <button
                  onClick={() => router.push(`/edit-property/${property._id}`)}
                  className="w-full h-12 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md shadow-brand-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                  className="w-full h-12 rounded-xl bg-brand-800 hover:bg-brand-900 text-white font-bold text-sm shadow-md shadow-brand-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Proceed to Rent
                </button>
              )}

              <div className="pt-2 text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified & protected by RentEase
              </div>
            </div>
          </Card>
        </div>

        {/* IMAGE GALLERY */}
        {property.images && property.images.length > 0 && !imgError ? (
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-6 space-y-4">
            <div className="relative h-80 sm:h-96 lg:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={property.images[activeImage] || "/default.jpg"}
                alt={property.title || "Property"}
                className="w-full h-full object-cover transition-all duration-300"
                onError={() => setImgError(true)}
              />
              {property.images.length > 1 && (
                <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                  {activeImage + 1} / {property.images.length}
                </span>
              )}
            </div>

            {/* Thumbnails Row */}
            {property.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImage === idx
                        ? "border-brand-800 shadow-md scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Card className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-6 p-8 flex flex-col items-center justify-center text-center rounded-2xl border-slate-200/90 bg-slate-50/60 min-h-[300px] sm:min-h-[420px] shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-400 mb-4 border border-slate-200/80 shadow-xs">
              <ImageOff className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1.5">No Images Available</h3>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              No images have been uploaded by the owner for this property listing.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

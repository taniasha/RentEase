"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight, ImageOff } from "lucide-react";
import { getAllProperties } from "@/actions/property";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import EmptyState from "@/customComponents/EmptyState";
import ActionMenu from "@/customComponents/ActionMenu";
import { Property } from "@/types/interface";

export interface PropertyCardItemProps {
  property: Property;
  variant?: "explore" | "manage";
  onView?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (id: string) => void;
}

export function SinglePropertyCard({
  property: p,
  variant = "explore",
  onView,
  onEdit,
  onDelete,
}: PropertyCardItemProps) {
  const router = useRouter();
  const [imgError, setImgError] = useState(false);

  return (
    <div
      key={p._id}
      className="group relative bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      {/* Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 flex items-center justify-center">
        {p.images && p.images.length > 0 && p.images[0] && !imgError ? (
          <img
            src={p.images[0]}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-slate-100/90 text-slate-400">
            <ImageOff className="w-8 h-8 mb-1.5 opacity-60" />
            <span className="text-xs font-semibold text-slate-500">No image has been added</span>
          </div>
        )}

        {variant === "explore" ? (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-slate-800 shadow-sm uppercase tracking-wider">
            {p.type === "sell" ? "For Sale" : "For Rent"}
          </div>
        ) : (
          <ActionMenu
            onView={onView ? () => onView(p) : () => router.push(`/property/${p._id}`)}
            onEdit={onEdit ? () => onEdit(p) : () => router.push(`/edit-property/${p._id}`)}
            onDelete={onDelete ? () => onDelete(p._id) : undefined}
          />
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="text-md font-bold text-slate-900 line-clamp-1">
              {p.title || p.name}
            </h3>
          </div>

          {p.location && (
            <div className="flex items-center text-xs font-medium text-slate-500 mb-3">
              <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 shrink-0" />
              <span className="line-clamp-1">{p.location}</span>
            </div>
          )}

          <p className="text-md font-extrabold text-blue-800 mb-3">
            ₹{Number(p.price).toLocaleString()}
            {p.type !== "sell" && (
              <span className="text-xs font-normal text-slate-400">/mo</span>
            )}
          </p>

          {p.description && (
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
              {p.description}
            </p>
          )}
        </div>

        {variant === "explore" && (
          <Link
            href={`/property/${p._id}`}
            prefetch={true}
            className="w-full mt-auto h-10 rounded-xl bg-[#0F172A] hover:bg-blue-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            View Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}

export interface PropertyCardProps {
  properties?: Property[];
  loading?: boolean;
  variant?: "explore" | "manage";
  onView?: (property: Property) => void;
  onEdit?: (property: Property) => void;
  onDelete?: (id: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionText?: string;
  emptyActionHref?: string;
}

export default function PropertyCard({
  properties: initialProperties,
  loading: externalLoading,
  variant = "explore",
  onView,
  onEdit,
  onDelete,
  emptyTitle,
  emptyDescription,
  emptyActionText,
  emptyActionHref,
}: PropertyCardProps) {
  const [internalProperties, setInternalProperties] = useState<Property[]>([]);
  const [internalLoading, setInternalLoading] = useState(initialProperties === undefined);

  useEffect(() => {
    if (initialProperties === undefined) {
      const fetchProperties = async () => {
        try {
          const data = await getAllProperties();
          setInternalProperties(data || []);
        } catch (err) {
          console.error("Error fetching properties:", err);
        } finally {
          setInternalLoading(false);
        }
      };

      fetchProperties();
    }
  }, [initialProperties]);

  const properties = initialProperties !== undefined ? initialProperties : internalProperties;
  const loading = externalLoading !== undefined ? externalLoading : internalLoading;

  return (
    <div className="w-full space-y-6">
      {loading ? (
        <LoadingSpinner message="Loading properties..." />
      ) : properties.length === 0 ? (
        <EmptyState
          title={emptyTitle || (variant === "manage" ? "No properties listed yet" : "No properties available")}
          description={
            emptyDescription ||
            (variant === "manage"
              ? "You haven't added any listings yet. Add your first property to start managing."
              : "There are currently no listings published. Check back soon!")
          }
          actionText={emptyActionText || (variant === "manage" ? "Add New Property" : undefined)}
          actionHref={emptyActionHref || (variant === "manage" ? "/addproperty" : undefined)}
        />
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((p) => (
            <SinglePropertyCard
              key={p._id}
              property={p}
              variant={variant}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}


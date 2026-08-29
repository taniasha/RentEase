"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getLandlordProperties } from "@/actions/landlord";
import { deleteProperty } from "@/actions/property";
import PropertyCard from "@/customComponents/PropertyCard";
import CustomHeading from "@/customComponents/CustomHeading";
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
    <div className="space-y-3 mx-auto">
      <CustomHeading title="Manage Properties" icon="bi:building" />

      <PropertyCard
        properties={properties}
        loading={loading}
        variant="manage"
        onView={(p) => router.push(`/property/${p._id}`)}
        onEdit={handleEdit}
        onDelete={handleDeleteProperty}
        emptyTitle="No properties listed yet"
        emptyDescription="You haven't added any listings yet. Add your first property to start managing."
        emptyActionText="Add New Property"
        emptyActionHref="/addproperty"
      />
    </div>
  );
}


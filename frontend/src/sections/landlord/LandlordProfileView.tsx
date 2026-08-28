"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { getLandlordProfile } from "@/actions/landlord";
import ProfileCard from "@/customComponents/ProfileCard";
import LoadingSpinner from "@/customComponents/LoadingSpinner";
import { User } from "@/types/interface";

export default function LandlordProfileView() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getLandlordProfile(userId);
        setUser(data);
      } catch (err) {
        console.error("Landlord profile fetch error:", err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  if (loading) {
    return <LoadingSpinner className="py-5 mt-5 pt-5" message="Loading landlord profile..." />;
  }

  if (!user) {
    return (
      <div className="container text-center py-5" style={{ marginTop: "8rem" }}>
        <p className="text-muted">Landlord profile not found.</p>
      </div>
    );
  }

  return (
    <ProfileCard
      user={user}
      onLogout={handleLogout}
      onEditProfile={() => toast.info("Profile editing coming soon!")}
      roleBadgeVariant="success"
    />
  );
}

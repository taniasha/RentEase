"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole: "tenant" | "landlord";
}

export default function AuthGuard({ children, allowedRole }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    // 1. If not logged in at all, redirect immediately to login
    if (!token || !userStr) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      const userRole = role || user.role;

      // 2. If logged in with mismatched role, redirect to appropriate portal
      if (userRole !== allowedRole) {
        if (userRole === "landlord") {
          router.replace("/landlord-dashboard");
        } else if (userRole === "tenant") {
          router.replace("/tenant-dashboard");
        } else {
          router.replace("/login");
        }
        return;
      }

      setAuthorized(true);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      router.replace("/login");
    }
  }, [allowedRole, pathname, router]);

  // While verifying authorization, show clean spinner to prevent unauthorized flash
  if (!authorized) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner message="Verifying authentication..." size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}

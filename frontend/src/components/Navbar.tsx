"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, LogOut, User as UserIcon } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const role = localStorage.getItem("role");
    const userStr = localStorage.getItem("user");
    setUserRole(role);

    if (userStr) {
      try {
        const parsed = JSON.parse(userStr);
        setUserName(parsed.name || null);
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUserRole(null);
    setUserName(null);
    router.push("/login");
  };

  // If user is not logged in, do not render any navbar
  if (!mounted || !userRole) {
    return null;
  }

  return (
    <header className="fixed top-4 inset-x-0 z-40 max-w-6xl mx-auto px-4">
      <nav className="flex items-center justify-between h-16 px-6 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/20">
        <Link
          href={
            userRole === "landlord"
              ? "/landlord-dashboard"
              : userRole === "tenant"
              ? "/tenant-dashboard"
              : "/"
          }
          className="flex items-center gap-2.5 group"
        >
          <div className="w-9 h-9 rounded-xl bg-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-800/30 group-hover:scale-105 transition-transform">
            <Home className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-slate-900">
            Rent<span className="text-brand-800">Ease</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Landlord Registered Navigation */}
          {userRole === "landlord" && (
            <>
              <Link
                href="/landlord-dashboard"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/addproperty"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Add Property
              </Link>
              <Link
                href="/mytenants"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                My Tenants
              </Link>
              <Link
                href="/manage-properties"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Manage
              </Link>
              <Link
                href="/landlord-profile"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-1 p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Tenant Registered Navigation */}
          {mounted && userRole === "tenant" && (
            <>
              <Link
                href="/tenant-dashboard"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/explore"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                Explore
              </Link>
              <Link
                href="/my-rental"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                My Rentals
              </Link>
              <Link
                href="/tenant-profile"
                className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <UserIcon className="w-3.5 h-3.5" /> Profile
              </Link>
              <button
                onClick={handleLogout}
                className="ml-1 p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

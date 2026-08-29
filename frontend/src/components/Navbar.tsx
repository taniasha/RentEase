"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Users,
  Building2,
  Compass,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import LandingNavbar from "./LandingNavbar";

export default function Navbar() {
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  if (!mounted) {
    return null;
  }

  // If user is not logged in (guest visitor), show LandingNavbar
  if (!userRole) {
    return <LandingNavbar />;
  }

  const landlordLinks = [
    { href: "/landlord-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/addproperty", label: "Add Property", icon: PlusCircle },
    { href: "/my-tenants", label: "My Tenants", icon: Users },
    { href: "/manage-properties", label: "Manage", icon: Building2 },
    { href: "/landlord-profile", label: "Profile", icon: UserIcon },
  ];

  const tenantLinks = [
    { href: "/tenant-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/explore", label: "Explore", icon: Compass },
    { href: "/my-rental", label: "My Rentals", icon: FileText },
    { href: "/tenant-profile", label: "Profile", icon: UserIcon },
  ];

  const navLinks = userRole === "landlord" ? landlordLinks : tenantLinks;
  const homeHref =
    userRole === "landlord"
      ? "/landlord-dashboard"
      : userRole === "tenant"
        ? "/tenant-dashboard"
        : "/";

  return (
    <header className="fixed top-3 inset-x-0 z-40 max-w-6xl mx-auto px-4">
      <nav className="relative flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 rounded-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/30">
        {/* Brand Logo */}
        <Link href={homeHref} className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-brand-800 flex items-center justify-center text-white shadow-md shadow-brand-800/30 group-hover:scale-105 transition-transform shrink-0">
            <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
            Rent<span className="text-brand-800">Ease</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const IconComponent = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-xs lg:text-sm font-semibold rounded-full transition-all flex items-center gap-1.5",
                  isActive
                    ? "bg-brand-800 text-white shadow-sm shadow-brand-800/25"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="h-4 w-px bg-slate-200 mx-1" />

          <button
            onClick={handleLogout}
            className="p-2 text-slate-500 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-2 p-3 bg-white/95 backdrop-blur-2xl rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-150"
          onClick={(e) => e.stopPropagation()}
        >
          {/* User Info Header */}
          {userName && (
            <div className="flex items-center justify-between px-3 py-2 mb-2 pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-800 font-bold text-xs flex items-center justify-center border border-brand-100">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 line-clamp-1">{userName}</span>
                  <span className="text-[10px] font-semibold text-slate-400 capitalize">{userRole}</span>
                </div>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all",
                    isActive
                      ? "bg-brand-800 text-white shadow-md shadow-brand-800/20"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  )}
                >
                  <IconComponent className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400")} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Logout Section */}
          <div className="mt-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


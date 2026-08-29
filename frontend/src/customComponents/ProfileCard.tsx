"use client";

import React from "react";
import { LogOut, User as UserIcon, Mail, Phone, MapPin, Shield } from "lucide-react";
import { User } from "@/types/interface";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  user: User;
  onLogout: () => void;
  onEditProfile?: () => void;
  roleBadgeVariant?: "primary" | "success" | "info";
}

export default function ProfileCard({
  user,
  onLogout,
  onEditProfile,
}: ProfileCardProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="max-w-xl mx-auto px-4 ">
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xl shadow-slate-200/40 relative">
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-full bg-blue-900 from-blue-600 to-indigo-500 text-white text-md font-extrabold flex items-center justify-center shadow-lg shadow-blue-500/25 mb-1">
            {initials}
          </div>
          <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
          <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
            <Shield className="w-3 h-3" /> {user.role}
          </span>
        </div>

        {/* Details list */}
        <div className="py-4 space-y-2">
          <div className="flex items-center gap-3.5 p-2 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-2xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email</p>
              <p className="text-xs font-medium text-slate-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-2xs">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone</p>
              <p className="text-xs font-medium text-slate-800">{user.phone || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-500 shadow-2xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Address</p>
              <p className="text-xs font-medium text-slate-800">{user.address || "Not provided"}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow transition-all hover:shadow-md"
          onClick={onEditProfile || (() => {})}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

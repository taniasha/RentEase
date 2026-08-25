import React from "react";
import Link from "next/link";
import { Home } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Rent<span className="text-blue-400">Ease</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mb-4">
              Smart, effortless property rentals and management for modern landlords and tenants.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/explore" className="text-slate-400 hover:text-white transition-colors">
                  Explore Listings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/signup?role=tenant" className="text-slate-400 hover:text-white transition-colors">
                  Tenant Portal
                </Link>
              </li>
              <li>
                <Link href="/signup?role=landlord" className="text-slate-400 hover:text-white transition-colors">
                  Landlord Portal
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RentEase Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

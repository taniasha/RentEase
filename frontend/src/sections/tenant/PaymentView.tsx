"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowLeft, Building2 } from "lucide-react";
import { capturePayment } from "@/actions/tenant";

interface SelectedProperty {
  _id: string;
  rentAmount: number | string;
  title: string;
}

export default function PaymentView() {
  const [data, setData] = useState<SelectedProperty | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedProperty");
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing saved property", e);
        }
      }
    }
  }, []);

  const handleConfirmPayment = async () => {
    if (!data) return;
    setLoading(true);

    try {
      await capturePayment({
        propertyId: data._id,
        rentAmount: Number(data.rentAmount),
        month: new Date().toISOString().slice(0, 7), // YYYY-MM
        razorpayPaymentId: `PAY_DIRECT_${Date.now()}`,
      });

      toast.success("Rent payment processed successfully!");
      if (typeof window !== "undefined") {
        localStorage.removeItem("selectedProperty");
      }

      setTimeout(() => {
        router.push("/my-rental");
      }, 1200);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Payment recording failed.");
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No Property Selected</h3>
        <p className="text-sm text-slate-500 mb-6">Please select a property from the explore page first.</p>
        <button
          onClick={() => router.push("/explore")}
          className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-all"
        >
          Explore Listings
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Cancel & Return
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Rental Payment</h2>
            <p className="text-xs text-slate-400">Direct Secure Confirmation</p>
          </div>
        </div>

        {/* Selected Property Details */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="truncate">{data.title}</span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Rent</span>
            <span className="text-2xl font-extrabold text-blue-600">
              ₹{Number(data.rentAmount).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium flex items-center gap-2.5 mb-6">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Payment confirmation will automatically generate an official digital receipt.</span>
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" /> Confirm & Pay ₹{Number(data.rentAmount).toLocaleString()}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

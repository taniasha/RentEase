"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreditCard, ShieldCheck, CheckCircle2, Loader2, ArrowLeft, Building2, IndianRupee, Edit3 } from "lucide-react";
import { capturePayment } from "@/actions/tenant";
import CustomInput from "@/customComponents/CustomInput";

interface SelectedProperty {
  _id: string;
  rentAmount: number | string;
  title: string;
}

export default function PaymentView() {
  const [data, setData] = useState<SelectedProperty | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("role");
      if (role === "landlord") {
        toast.warn("Landlords cannot make tenant rental payments.");
        router.push("/landlord-dashboard");
        return;
      }

      const saved = localStorage.getItem("selectedProperty");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setData(parsed);
          setPaymentAmount(String(parsed.rentAmount || ""));
        } catch (e) {
          console.error("Error parsing saved property", e);
        }
      }
    }
  }, [router]);

  const numAmount = Number(paymentAmount) || 0;

  const handleConfirmPayment = async () => {
    if (!data) return;

    if (numAmount <= 0) {
      toast.error("Please enter a valid payment amount greater than ₹0.");
      return;
    }

    setLoading(true);

    try {
      await capturePayment({
        propertyId: data._id,
        rentAmount: numAmount,
        month: new Date().toISOString().slice(0, 7), // YYYY-MM
        razorpayPaymentId: `PAY_DIRECT_${Date.now()}`,
      });

      toast.success(`Payment of ₹${numAmount.toLocaleString()} processed successfully!`);
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
          className="h-10 px-5 rounded-md bg-brand-800 hover:bg-brand-900 text-white text-sm font-semibold transition-all"
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

      <div className="bg-white rounded-md p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-100 mb-6">
          <div className="w-12 h-12 rounded-md bg-brand-50 flex items-center justify-center text-brand-800">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Rental Payment</h2>
            <p className="text-xs text-slate-400">Customizable Payment & Secure Confirmation</p>
          </div>
        </div>

        {/* Selected Property Details */}
        <div className="p-4 rounded-md bg-slate-50 border border-slate-100 mb-6 space-y-3">
          <div className="flex items-center gap-2 text-slate-700 text-sm font-bold">
            <Building2 className="w-4 h-4 text-brand-800" />
            <span className="truncate">{data.title}</span>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-slate-200/60">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Listed Monthly Rent
            </span>
            <span className="text-lg font-bold text-slate-700">
              ₹{Number(data.rentAmount).toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
            </span>
          </div>
        </div>

        {/* Editable Payment Amount Input */}
        <div className="mb-6 space-y-2">
          <label className="text-xs font-bold text-slate-700 tracking-wide flex items-center justify-between">
            <span>Payment Amount (₹)</span>
            <span className="text-2xs font-normal text-slate-400">Edit amount as needed</span>
          </label>

          <CustomInput
            type="number"
            min="1"
            placeholder="Enter custom amount (e.g. 10000)"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            icon={<IndianRupee className="w-4 h-4 text-slate-400" />}
          />

          {/* Quick presets */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={() => setPaymentAmount(String(data.rentAmount))}
              className="px-2.5 py-1 text-2xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Full Rent (₹{Number(data.rentAmount).toLocaleString()})
            </button>
            <button
              type="button"
              onClick={() => setPaymentAmount("10000")}
              className="px-2.5 py-1 text-2xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              ₹10,000 (Advance / Partial)
            </button>
            <button
              type="button"
              onClick={() => setPaymentAmount("5000")}
              className="px-2.5 py-1 text-2xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              ₹5,000 (Token)
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium flex items-center gap-2.5 mb-6">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Payment confirmation will automatically generate an official digital receipt for this amount.</span>
        </div>

        <button
          onClick={handleConfirmPayment}
          disabled={loading || numAmount <= 0}
          className="w-full h-12 rounded-md bg-brand-800 hover:bg-brand-900 disabled:opacity-60 text-white font-bold text-sm shadow-md shadow-brand-950/20 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing Payment...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" /> Confirm & Pay ₹{numAmount > 0 ? numAmount.toLocaleString() : "0"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { User, Mail, Lock, Phone, MapPin, AlertCircle, ArrowRight, Loader2, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import { signupUser } from "@/actions/auth";
import CustomInput from "@/customComponents/CustomInput";
import CustomSelect from "@/customComponents/CustomSelect";
import { signupSchema, SignupFormData } from "@/types/authSchema";
import Link from "next/link";

export default function SignupView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as "landlord" | "tenant") || undefined;

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: initialRole,
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (initialRole === "landlord" || initialRole === "tenant") {
      setValue("role", initialRole);
    }
  }, [initialRole, setValue]);

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await signupUser(data);
      toast.success(res.message || "Account created successfully! Please sign in.");

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Registration failed. Please try again.";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-24">
      <Navbar />

      <div className="max-w-lg w-full mx-auto px-4 mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create Your Account
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Join RentEase to discover homes or list properties
            </p>
          </div>

          {serverError && (
            <div className="flex items-center gap-2 p-3.5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <CustomInput
              label="Full Name"
              placeholder="John Doe"
              error={errors.name?.message}
              icon={<User className="w-4 h-4" />}
              {...register("name")}
            />

            <CustomInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              error={errors.email?.message}
              icon={<Mail className="w-4 h-4" />}
              {...register("email")}
            />

            <CustomInput
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              icon={<Lock className="w-4 h-4" />}
              {...register("password")}
            />

            <CustomSelect
              label="Account Role"
              options={[
                { value: "tenant", label: "Tenant (Looking to rent)" },
                { value: "landlord", label: "Landlord (Looking to list spaces)" },
              ]}
              placeholder="Select account role"
              error={errors.role?.message}
              icon={<UserCheck className="w-4 h-4" />}
              {...register("role")}
            />

            <CustomInput
              label="Phone Number"
              type="tel"
              placeholder="+91 9876543210"
              error={errors.phone?.message}
              icon={<Phone className="w-4 h-4" />}
              {...register("phone")}
            />

            <CustomInput
              label="Address / City"
              placeholder="New Delhi, India"
              error={errors.address?.message}
              icon={<MapPin className="w-4 h-4" />}
              {...register("address")}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 mt-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

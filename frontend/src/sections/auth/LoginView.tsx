"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Mail, Lock, AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { loginUser } from "@/actions/auth";
import CustomInput from "@/customComponents/CustomInput";
import { loginSchema, LoginFormData } from "@/types/authSchema";
import Link from "next/link";

export default function LoginView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError("");

    try {
      const res = await loginUser(data);
      toast.success(res.message || "Login successful!");

      localStorage.setItem("token", res.token);
      localStorage.setItem("userId", res.user.id || (res.user._id as string));
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("role", res.user.role);

      if (res.user.role === "tenant") {
        router.push("/tenant-dashboard");
      } else if (res.user.role === "landlord") {
        router.push("/landlord-dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Invalid email or password";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-20">
      <Navbar />

      <div className="max-w-md w-full mx-auto px-4 mt-12">
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/50">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Sign in to manage your rentals and properties
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

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 mt-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-bold text-blue-600 hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

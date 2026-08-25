import { z } from "zod";

// ==========================================
// Authentication Schemas & Types
// ==========================================

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(50, { message: "Full name cannot exceed 50 characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["landlord", "tenant"], {
    message: "Please select a valid role (Landlord or Tenant)",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9+ -]+$/, { message: "Please enter a valid phone number" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters" }),
});

export type SignupFormData = z.infer<typeof signupSchema>;


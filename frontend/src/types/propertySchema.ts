import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .min(3, { message: "Property title must be at least 3 characters" }),
  location: z
    .string()
    .min(2, { message: "Location is required" }),
  type: z.enum(["rent", "sell"], {
    message: "Please select property type",
  }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid positive number",
    }),
  negotiable: z.boolean(),
  bedrooms: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Bedrooms must be a valid number",
    }),
  bathrooms: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Bathrooms must be a valid number",
    }),
  area: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Area must be a valid number",
    }),
  availableFrom: z.string().optional(),
  furnishing: z.string().optional(),
  age: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) >= 0), {
      message: "Age must be a valid number",
    }),
  amenities: z.string().optional(),
  description: z.string().optional(),
  images: z.string().optional(),
  ownerName: z
    .string()
    .min(2, { message: "Owner name is required" }),
  ownerEmail: z
    .string()
    .min(1, { message: "Owner email is required" })
    .email({ message: "Please enter a valid owner email" }),
  ownerPhone: z
    .string()
    .min(10, { message: "Owner phone number must be at least 10 digits" }),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

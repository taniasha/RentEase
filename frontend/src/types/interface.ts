export type UserRole = "tenant" | "landlord" | "admin";

export * from "./paymentStatus";

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RentalDetails {
  rentAmount: number;
  month?: string;
  paidAt?: string;
  paymentId?: string;
}

export interface Property {
  _id: string;
  id?: number | string;
  title: string;
  name?: string;
  location: string;
  type: "rent" | "sell" | string;
  price: number | string;
  negotiable?: boolean;
  bedrooms?: number | string;
  bathrooms?: number | string;
  area?: number | string;
  availableFrom?: string;
  furnishing?: string;
  age?: number | string;
  amenities?: string[];
  description?: string;
  images?: string[];
  ownerName?: string;
  ownerEmail?: string;
  ownerPhone?: string;
  landlordId?: string;
  owner?: string;
  tenant?: {
    name?: string;
    email?: string;
    phone?: string;
  } | null;
  rentalDetails?: RentalDetails | null;
  showFull?: boolean;
}

export interface Rental {
  _id?: string;
  propertyId?: Property;
  landlordId?: User;
  rentAmount: number;
  month: string;
  paidAt?: string;
  createdAt?: string;
  paymentId?: string;
}

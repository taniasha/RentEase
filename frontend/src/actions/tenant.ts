import axiosInstance from "@/actions/axios-instance";
import { ENDPOINTS } from "@/actions/endpoints";
import { User, Rental } from "@/types/interface";

export const getTenantProfile = async (userId: string): Promise<User> => {
  try {
    const res = await axiosInstance.get<User>(ENDPOINTS.TENANT.PROFILE(userId));
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getMyRentals = async (): Promise<Rental[]> => {
  try {
    const res = await axiosInstance.get<Rental[]>(ENDPOINTS.TENANT.MY_RENTALS);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export interface CapturePaymentPayload {
  propertyId: string;
  rentAmount: number;
  month: string;
  razorpayPaymentId?: string;
}

export const capturePayment = async (payload: CapturePaymentPayload): Promise<any> => {
  try {
    const res = await axiosInstance.post(ENDPOINTS.TENANT.CAPTURE_PAYMENT, payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

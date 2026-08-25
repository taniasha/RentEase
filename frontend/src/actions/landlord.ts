import axiosInstance from "@/actions/axios-instance";
import { ENDPOINTS } from "@/actions/endpoints";
import { User, Property } from "@/types/interface";

export const getLandlordProfile = async (userId: string): Promise<User> => {
  try {
    const res = await axiosInstance.get<User>(ENDPOINTS.LANDLORD.PROFILE(userId));
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getLandlordProperties = async (): Promise<Property[]> => {
  try {
    const res = await axiosInstance.get<Property[]>(ENDPOINTS.LANDLORD.PROPERTIES);
    return res.data;
  } catch (error) {
    throw error;
  }
};

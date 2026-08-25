import axiosInstance from "@/actions/axios-instance";
import { ENDPOINTS } from "@/actions/endpoints";
import { LoginFormData, SignupFormData } from "@/types/authSchema";
import { AuthResponse } from "@/types/interface";

export const loginUser = async (data: LoginFormData): Promise<AuthResponse> => {
  try {
    const res = await axiosInstance.post<AuthResponse>(ENDPOINTS.AUTH.LOGIN, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (data: SignupFormData): Promise<{ message: string }> => {
  try {
    const res = await axiosInstance.post<{ message: string }>(ENDPOINTS.AUTH.SIGNUP, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

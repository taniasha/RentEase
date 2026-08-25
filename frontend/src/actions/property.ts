import axiosInstance from "@/actions/axios-instance";
import { ENDPOINTS } from "@/actions/endpoints";
import { Property } from "@/types/interface";

export const getAllProperties = async (): Promise<Property[]> => {
  try {
    const res = await axiosInstance.get<Property[]>(ENDPOINTS.PROPERTY.GET_ALL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPropertyById = async (id: string): Promise<Property> => {
  try {
    const res = await axiosInstance.get<Property>(ENDPOINTS.PROPERTY.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addProperty = async (data: any): Promise<any> => {
  try {
    const res = await axiosInstance.post(ENDPOINTS.PROPERTY.ADD, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateProperty = async (id: string, data: any): Promise<any> => {
  try {
    const res = await axiosInstance.put(ENDPOINTS.PROPERTY.UPDATE(id), data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProperty = async (id: string): Promise<any> => {
  try {
    const res = await axiosInstance.delete(ENDPOINTS.PROPERTY.DELETE(id));
    return res.data;
  } catch (error) {
    throw error;
  }
};

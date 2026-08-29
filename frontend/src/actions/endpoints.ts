export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/login",
    SIGNUP: "/signup",
  },
  PROPERTY: {
    ADD: "/add-property",
    GET_ALL: "/getall",
    GET_BY_ID: (id: string) => `/${id}`,
    UPDATE: (id: string) => `/update-property/${id}`,
    DELETE: (id: string) => `/delete-property/${id}`,
  },
  TENANT: {
    MY_RENTALS: "/my-rentals",
    CAPTURE_PAYMENT: "/capture-payment",
    PROFILE: (id: string) => `/tenant-user/${id}`,
  },
  LANDLORD: {
    PROPERTIES: "/landlord-properties",
    PROFILE: (id: string) => `/landlord-user/${id}`,
  },
};

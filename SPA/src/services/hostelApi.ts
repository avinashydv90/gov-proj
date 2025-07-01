import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface ShaskiyaHostel {
  id: number;
  hostelName: string;
  address: string;
  city: string;
  district: string;
  wardenName: string;
  contact: string;
  hostelEmail: string;
}
export const hostelApi = createApi({
  reducerPath: "hostelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.poitdp.shahapur-mh.in/api/",
  }),
  endpoints: (builder) => ({
    getHostels: builder.query<ShaskiyaHostel[], void>({
      query: () => "Hostel/hostel",
      keepUnusedDataFor: 3000,
    }),
  }),
});

export const { useGetHostelsQuery } = hostelApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ShaskiyaHostel } from "../components/types/hostel";

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

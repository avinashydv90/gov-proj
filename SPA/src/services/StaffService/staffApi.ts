import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IStaff, IStaffRequest } from "../../components/types/IStaff";


export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7031/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token)
        headers.set("Authorization", `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ["Staff"],
  endpoints: (builder) => ({
    getAllStaff: builder.query<IStaff[], void>({
      query: () => "/Staff",
      providesTags: ["Staff"]
    }),
    getStaffById: builder.query<IStaff, string>({
      query: (id) => `/Staff/${id}`,
      providesTags: ['Staff']
    }),
    getStaffBySchoolId: builder.query<IStaff[], string>({
      query: (id) => `/Staff/school/${id}`,
      providesTags: ['Staff']
    }),
    createStaff: builder.mutation<void, IStaffRequest>({
      query: (newStaff) => ({
        url: '/Staff',
        method: 'POST',
        body: newStaff
      }),
      invalidatesTags: ['Staff']
    }),
    updateStaff: builder.mutation<void, IStaff>({
      query: (staff) => ({
        url: `/Staff/${staff.id}`,
        method: 'PUT',
        body: staff
      }),
      invalidatesTags: ['Staff']
    }),
    deleteStaff: builder.mutation<void, string>({
      query: (id) => ({
        url: `/Staff/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Staff']
    })
  }),
});
export const {
  useGetAllStaffQuery,
  useGetStaffByIdQuery,
  useGetStaffBySchoolIdQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation
} = staffApi;


import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./customBaseQuery";
import { IStaffType } from "../../components/types/IStaffType";

const baseUrl = "https://api.poitdp.shahapur-mh.in/api";

export const staffTypeApi = createApi({
  reducerPath: "staffTypeApi",
  baseQuery: dynamicBaseQuery(baseUrl),
  tagTypes: ["StaffType"],
  endpoints: (builder) => ({
    getAllStaffTypes: builder.query<IStaffType[], void>({
      query: () => "/StaffType",
      providesTags: ["StaffType"],
    }),
    getStaffTypeById: builder.query<IStaffType, string>({
      query: (id) => `/StaffType/${id}`,
      providesTags: ["StaffType"],
    }),
    createStaffType: builder.mutation<void, IStaffType>({
      query: (newStaffType) => {
        return {
          url: "/StaffType",
          method: "POST",
          body: newStaffType,
        };
      },
      invalidatesTags: ["StaffType"],
    }),
    updateStaffType: builder.mutation<void, IStaffType>({
      query: (staffType) => ({
        url: `/StaffType/${staffType.id}`,
        method: "PUT",
        body: staffType,
      }),
      invalidatesTags: ["StaffType"],
    }),
    deleteStaffType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/StaffType/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StaffType"],
    }),
  }),
});

export const {
  useGetAllStaffTypesQuery,
  useGetStaffTypeByIdQuery,
  useCreateStaffTypeMutation,
  useUpdateStaffTypeMutation,
  useDeleteStaffTypeMutation,
} = staffTypeApi;

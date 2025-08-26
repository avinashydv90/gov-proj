import { createApi } from "@reduxjs/toolkit/query/react";
import {
  ICreateStandardDto,
  IStandard,
  IUpdateStandardDto,
} from "../components/types/standard";
import dynamicBaseQuery from "./StaffService/customBaseQuery";
import { baseUrl } from "./api";

export const standardApi = createApi({
  reducerPath: "standardApi",
  baseQuery: dynamicBaseQuery(baseUrl),

  tagTypes: ["Standard"],

  endpoints: (builder) => ({
    createStandard: builder.mutation<void, ICreateStandardDto>({
      query: (data) => ({
        url: "Standard",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Standard"],
    }),

    getStandardsBySchoolId: builder.query<IStandard[], string>({
      query: (schoolId) => `Standard/school/${schoolId}`,
      providesTags: ["Standard"],
    }),

    getStandardById: builder.query<IStandard, string>({
      query: (id) => `Standard/${id}`,
      providesTags: ["Standard"],
    }),

    updateStandard: builder.mutation<void, IUpdateStandardDto>({
      query: (formData) => ({
        url: `Standard/${formData.id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Standard"],
    }),

    deleteStandard: builder.mutation<void, string>({
      query: (id) => ({
        url: `Standard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Standard"],
    }),
    getAllStandards: builder.query<IStandard[], void>({
      query: () => "Standard",
      providesTags: ["Standard"],
    }),
  }),
});

export const {
  useCreateStandardMutation,
  useGetStandardsBySchoolIdQuery,
  useGetStandardByIdQuery,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
  useGetAllStandardsQuery,
} = standardApi;

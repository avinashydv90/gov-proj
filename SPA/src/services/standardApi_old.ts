import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Standard } from "../components/types/standard";

const baseUrl = "https://localhost:7031/api/";

export const standardApi = createApi({
  reducerPath: "standardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Standard"],
  endpoints: (builder) => ({
    // GET all standards
    getAllStandards: builder.query<Standard[], void>({
      query: () => "Standard",
      providesTags: ["Standard"],
    }),

    // GET by ID
    getStandardById: builder.query<Standard, number>({
      query: (id) => `Standard/${id}`,
      providesTags: ["Standard"],
    }),

    // GET by School ID
    getStandardsBySchoolId: builder.query<Standard[], string>({
      query: (schoolId) => `Standard?schoolId=${schoolId}`,
      providesTags: ["Standard"],
    }),

    // POST
    addStandard: builder.mutation<Standard, Omit<Standard, "id">>({
      query: (standard) => ({
        url: "Standard",
        method: "POST",
        body: standard,
      }),
      invalidatesTags: ["Standard"],
    }),

    // PUT
    updateStandard: builder.mutation<Standard, Standard>({
      query: (standard) => ({
        url: `Standard/${standard.id}`,
        method: "PUT",
        body: standard,
      }),
      invalidatesTags: ["Standard"],
    }),

    // DELETE
    deleteStandard: builder.mutation<void, number>({
      query: (id) => ({
        url: `Standard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Standard"],
    }),
  }),
});
export const {
  useGetAllStandardsQuery,
  useGetStandardByIdQuery,
  useGetStandardsBySchoolIdQuery,
  useAddStandardMutation,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
} = standardApi;

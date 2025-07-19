import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Division } from "../components/types/division";

const baseUrl = "https://localhost:7031/api/";

export const divisionApi = createApi({
  reducerPath: "divisionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Division"],
  endpoints: (builder) => ({
    // GET all divisions
    getAllDivisions: builder.query<Division[], void>({
      query: () => "Division",
      providesTags: ["Division"],
    }),

    // GET division by ID
    getDivisionById: builder.query<Division, number>({
      query: (id) => `Division/${id}`,
      providesTags: ["Division"],
    }),

    // GET by standardId
    getDivisionsByStandardId: builder.query<Division[], number>({
      query: (standardId) => `Division/standard/${standardId}`,
      providesTags: ["Division"],
    }),

    // POST - Add new division
    addDivision: builder.mutation<Division, Omit<Division, "id">>({
      query: (division) => ({
        url: "Division",
        method: "POST",
        body: division,
      }),
      invalidatesTags: ["Division"],
    }),

    // PUT - Update division
    updateDivision: builder.mutation<Division, Division>({
      query: (division) => ({
        url: `Division/${division.id}`,
        method: "PUT",
        body: division,
      }),
      invalidatesTags: ["Division"],
    }),

    // DELETE - Remove division
    deleteDivision: builder.mutation<void, number>({
      query: (id) => ({
        url: `Division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});
export const {
  useGetAllDivisionsQuery,
  useGetDivisionByIdQuery,
  useGetDivisionsByStandardIdQuery,
  useAddDivisionMutation,
  useUpdateDivisionMutation,
  useDeleteDivisionMutation,
} = divisionApi;

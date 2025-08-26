import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CreateDivisionDto,
  Division,
  UpdateDivisionDto,
} from "../components/types/division";
import dynamicBaseQuery from "./StaffService/customBaseQuery";
import { baseUrl } from "./api";

export const divisionApi = createApi({
  reducerPath: "divisionApi",
  baseQuery: dynamicBaseQuery(baseUrl),
  tagTypes: ["Division"],
  endpoints: (builder) => ({
    // GET all divisions
    getAllDivisions: builder.query<Division[], void>({
      query: () => "Division",
      providesTags: ["Division"],
    }),

    // GET division by ID
    getDivisionById: builder.query<Division, string>({
      query: (id) => `Division/${id}`,
      providesTags: ["Division"],
    }),

    // GET by standardId
    getDivisionsByStandardId: builder.query<Division[], string>({
      query: (standardId) => `Division/standard/${standardId}`,
      providesTags: ["Division"],
    }),

    // POST - Add new division
    addDivision: builder.mutation<void, CreateDivisionDto>({
      query: (division) => ({
        url: "Division",
        method: "POST",
        body: division,
      }),
      invalidatesTags: ["Division"],
    }),

    // PUT - Update division
    updateDivision: builder.mutation<void, UpdateDivisionDto>({
      query: (payload) => ({
        url: `Division/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Division"],
    }),

    // DELETE - Remove division
    deleteDivision: builder.mutation<void, string>({
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

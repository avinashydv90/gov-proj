import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {

  School,
  SchoolRegistrationRequest

} from "../components/types/School";

const baseUrl = "https://localhost:7031/api/";

export const schoolApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["School"],
  endpoints: (builder) => ({
    // CREATE
    registerSchool: builder.mutation<School,
      SchoolRegistrationRequest
    >({
      query: (schoolData) => ({
        url: "School",
        method: "POST",
        body: schoolData,
      }),
      invalidatesTags: ["School"],
    }),

    // READ ALL
    getAllSchools: builder.query<School[], void>({
      query: () => "School",
      providesTags: ["School"],
    }),

    // READ ONE
    getSchoolById: builder.query<School, string>({
      query: (id) => `School/${id}`,
      providesTags: (_, __, id) => [{ type: "School", id }],
    }),

    // UPDATE
    updateSchool: builder.mutation<
      School,
      { id: string; data: SchoolRegistrationRequest }
    >({
      query: ({ id, data }) => ({
        url: `School/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["School"],
    }),

    // DELETE
    deleteSchool: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `School/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["School"],
    }),
  }),
});

export const {
  useRegisterSchoolMutation,
  useGetAllSchoolsQuery,
  useGetSchoolByIdQuery,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolApi;


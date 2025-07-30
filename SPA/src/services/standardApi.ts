// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { Standard } from '../components/types/standard';

// const baseUrl = "https://localhost:7031/api/";

// export const standardApi = createApi({
//     reducerPath: 'standardApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     tagTypes: ['Standard'],
//     endpoints: (builder) => ({
//         // GET all standards
//         getAllStandards: builder.query<Standard[], void>({
//             query: () => 'Standard',
//             providesTags: ['Standard'],
//         }),

//         // GET by ID
//         getStandardById: builder.query<Standard, number>({
//             query: (id) => `Standard/${id}`,
//             providesTags: ['Standard'],
//         }),

//         // GET by School ID
//         getStandardsBySchoolId: builder.query<Standard[], string>({
//             query: (schoolId) => `Standard?schoolId=${schoolId}`,
//             providesTags: ['Standard'],
//         }),

//         // POST
//         addStandard: builder.mutation<Standard, Omit<Standard, 'id'>>({
//             query: (standard) => ({
//                 url: 'Standard',
//                 method: 'POST',
//                 body: standard,
//             }),
//             invalidatesTags: ['Standard'],
//         }),

//         // PUT
//         updateStandard: builder.mutation<Standard, Standard>({
//             query: (standard) => ({
//                 url: `Standard/${standard.id}`,
//                 method: 'PUT',
//                 body: standard,
//             }),
//             invalidatesTags: ['Standard'],
//         }),

//         // DELETE
//         deleteStandard: builder.mutation<void, number>({
//             query: (id) => ({
//                 url: `Standard/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Standard'],
//         }),
//     }),
// });
// export const {
//     useGetAllStandardsQuery,
//     useGetStandardByIdQuery,
//     useGetStandardsBySchoolIdQuery,
//     useAddStandardMutation,
//     useUpdateStandardMutation,
//     useDeleteStandardMutation,
// } = standardApi;


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
    createStandard: builder.mutation<Standard, Standard>({
      query: (data) => ({
        url: "Standard",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Standard"],
    }),

    getStandardsBySchoolId: builder.query<Standard[], string>({
      query: (schoolId) => `Standard/school/${schoolId}`,
      providesTags: ["Standard"],
    }),

    getStandardById: builder.query<Standard, number>({
      query: (id) => `Standard/${id}`,
      providesTags: (_, __, id) => [{ type: "Standard", id }],
    }),

    updateStandard: builder.mutation<Standard, { id: number; data: Standard }>({
      query: ({ id, data }) => ({
        url: `Standard/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Standard", id }],
    }),

    deleteStandard: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `Standard/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Standard", id }],
    }),
    getAllStandards: builder.query<Standard[], void>({
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

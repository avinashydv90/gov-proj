import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  School,
  SchoolRegistrationRequest,
  SchoolRegistrationResponse,
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
    registerSchool: builder.mutation<
      SchoolRegistrationResponse,
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
      invalidatesTags: [{ type: "School", id: "LIST" }],
    }),

    // DELETE
    deleteSchool: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `School/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "School", id }],
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

// export const schoolApi = createApi({
//     reducerPath: "schoolApi",
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     endpoints: (builder) => ({
//         //create a new school registration
//         registerSchool: builder.mutation<SchoolRegistrationResponse, SchoolRegistrationRequest>({
//             query: (schoolData) => ({
//                 url: "schools/register",
//                 method: "POST",
//                 body: schoolData,
//             }),
//         }),
//     }),
// });

//export const { useRegisterSchoolMutation } = schoolApi;

// export const schoolApi = createApi({
//     reducerPath: 'schoolApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     tagTypes: ['School'],
//     endpoints: (builder) => ({
//         // GET all schools
//         getAllSchools: builder.query<School[], void>({
//             query: () => 'School',
//             providesTags: ['School'],
//         }),

//         // GET school by ID
//         getSchoolById: builder.query<School, string>({
//             query: (id) => `School/${id}`,
//             providesTags: ['School'],
//         }),

//         // POST - Add new school
//         addSchool: builder.mutation<School, Omit<School, 'id'>>({
//             query: (school) => ({
//                 url: 'School',
//                 method: 'POST',
//                 body: school,
//             }),
//             invalidatesTags: ['School'],
//         }),

//         // PUT - Update school
//         updateSchool: builder.mutation<School, School>({
//             query: (school) => ({
//                 url: `School/${school.id}`,
//                 method: 'PUT',
//                 body: school,
//             }),
//             invalidatesTags: ['School'],
//         }),

//         // DELETE - Remove school
//         deleteSchool: builder.mutation<void, string>({
//             query: (id) => ({
//                 url: `School/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['School'],
//         }),
//     }),
// });
// export const {
//     useGetAllSchoolsQuery,
//     useGetSchoolByIdQuery,
//     useAddSchoolMutation,
//     useUpdateSchoolMutation,
//     useDeleteSchoolMutation,
// } = schoolApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { SchoolType, SchoolTypeRequest } from "../components/types/schoolType";

// export const schoolTypeApi = createApi({
//     reducerPath: "schoolTypeApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: "https://api.poitdp.shahapur-mh.in/api/",

//         prepareHeaders: (headers) => {
//             const token = localStorage.getItem("token");
//             if (token) headers.set("Authorization", `Bearer ${token}`);
//             return headers;
//         },
//     }),
//     tagTypes: ["SchoolType"],
//     endpoints: (builder) => ({
//         getAllSchoolTypes: builder.query<SchoolType[], void>({
//             query: () => "SchoolType",
//             providesTags: ["SchoolType"],
//         }),
//         getSchoolTypeById: builder.query<SchoolType, string>({
//             query: (id) => `SchoolType/${id}`,
//             providesTags: ['SchoolType']
//         }),
//         createSchoolType: builder.mutation<SchoolType, SchoolTypeRequest>({
//             query: (payload) => ({
//                 url: 'SchoolType',
//                 method: 'POST',
//                 body: payload,
//             }),
//             invalidatesTags: ['SchoolType'],
//         }),
//         updateSchoolType: builder.mutation<SchoolType, { id: string; data: SchoolTypeRequest }>({
//             query: ({ id, data }) => ({
//                 url: `SchoolType/${id}`,
//                 method: 'PUT',
//                 body: data
//             }),
//             invalidatesTags: ['SchoolType']
//         }),
//         deleteSchoolType: builder.mutation<{ message: string }, string>({
//             query: (id) => ({
//                 url: `SchoolType/${id}`,
//                 method: 'DELETE'
//             }),
//             invalidatesTags: ['SchoolType']
//         })
//     }),
// });
// export const {
//     useGetAllSchoolTypesQuery,
//     useGetSchoolTypeByIdQuery,
//     useCreateSchoolTypeMutation,
//     useUpdateSchoolTypeMutation,
//     useDeleteSchoolTypeMutation
// } = schoolTypeApi;

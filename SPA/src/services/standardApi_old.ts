// // services/standardApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = 'https://localhost:7031/api';

// export const standardApi = createApi({
//     reducerPath: 'standardApi',
//     baseQuery: fetchBaseQuery({ baseUrl }),
//     tagTypes: ['Standard'],
//     endpoints: (builder) => ({
//         getAllStandardsBySchoolId: builder.query({
//             query: (schoolId: string) => `/Standard/school/${schoolId}`,
//             providesTags: ['Standard'],
//         }),

//         getStandardById: builder.query({
//             query: (standardId: number) => `/Standard/${standardId}`,
//             providesTags: ['Standard'],
//         }),

//         createStandard: builder.mutation({
//             query: (standard) => ({
//                 url: '/Standard',
//                 method: 'POST',
//                 body: standard,
//             }),
//             invalidatesTags: ['Standard'],
//         }),

//         updateStandard: builder.mutation({
//             query: ({ id, data }) => ({
//                 url: `/Standard/${id}`,
//                 method: 'PUT',
//                 body: data,
//             }),
//             invalidatesTags: ['Standard'],
//         }),

//         deleteStandard: builder.mutation({
//             query: (id: number) => ({
//                 url: `/Standard/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Standard'],
//         }),

//         getAllStandards: builder.query({
//             query: () => '/Standard',
//             providesTags: ['Standard'],
//         }),
//     }),
// });

// export const {
//     useGetAllStandardsBySchoolIdQuery,
//     useGetStandardByIdQuery,
//     useCreateStandardMutation,
//     useUpdateStandardMutation,
//     useDeleteStandardMutation,
//     useGetAllStandardsQuery,
// } = standardApi;

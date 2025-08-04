// src/services/schoolTypeApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import dynamicBaseQuery from './StaffService/customBaseQuery';
import { SchoolType, SchoolTypeRequest, SchoolTypeResponse } from '../components/types/schoolType';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:7031/api";

export const newSchoolTypeApi = createApi({
    reducerPath: "SchoolTypeApi",
    baseQuery: dynamicBaseQuery(BASE_URL),
    tagTypes: ["SchoolType"],

    endpoints: (builder) => ({
        getAllSchoolTypes: builder.query<SchoolType[], void>({
            query: () => `${BASE_URL}/SchoolType`,
            providesTags: (result) =>
                result
                    ? [...result.map((type) => ({ type: 'SchoolType' as const, id: type.id })), { type: 'SchoolType', id: 'LIST' }]
                    : [{ type: 'SchoolType', id: 'LIST' }],
        }),
        getSchoolTypeById: builder.query<SchoolType, string>({
            query: (id) => `${BASE_URL}/SchoolType/${id}`,
            providesTags: ['SchoolType']
        }),
        createSchoolType: builder.mutation<SchoolTypeResponse, SchoolTypeRequest>({
            query: (payload) => ({
                url: `${BASE_URL}/SchoolType`,
                method: 'POST',
                //credentials: 'include',
                body: payload,
            }),
            invalidatesTags: [{ type: 'SchoolType', id: 'LIST' }],

        }),
        updateSchoolType: builder.mutation<SchoolTypeResponse, { id: string; data: SchoolTypeRequest }>({
            query: ({ id, data }) => ({
                url: `${BASE_URL}/SchoolType/${id}`,
                method: 'PUT',
                //credentials: 'include',
                body: data
            }),
            invalidatesTags: (result, _, { id }) =>
                result
                    ? [
                        { type: 'SchoolType', id },
                        { type: 'SchoolType', id: 'LIST' },
                    ]
                    : [{ type: 'SchoolType', id: 'LIST' }],
            transformResponse: (response: { data: { post: SchoolTypeResponse } }) =>
                response.data.post,
        }),
        deleteSchoolType: builder.mutation<SchoolTypeResponse, string>({
            query: (id) => ({
                url: `${BASE_URL}/SchoolType/${id}`,
                method: 'DELETE',
                //credentials: 'include',
            }),
            invalidatesTags: [{ type: 'SchoolType', id: 'LIST' }],
        })
    }),
});

export const {
    useGetAllSchoolTypesQuery,

    useGetSchoolTypeByIdQuery,
    useCreateSchoolTypeMutation,
    useUpdateSchoolTypeMutation,
    useDeleteSchoolTypeMutation
} = newSchoolTypeApi;

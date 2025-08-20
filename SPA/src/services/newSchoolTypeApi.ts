// src/services/schoolTypeApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import dynamicBaseQuery from './StaffService/customBaseQuery';
import { CreateSchoolTypeRequest, SchoolType, UpdateSchoolTypeRequest } from '../components/types/schoolType';

const BASE_URL = "https://localhost:7031/api";

export const newSchoolTypeApi = createApi({
    reducerPath: "SchoolTypeApi",
    baseQuery: dynamicBaseQuery(BASE_URL),
    tagTypes: ["SchoolType"],

    endpoints: (builder) => ({
        getAllSchoolTypes: builder.query<SchoolType[], void>({
            query: () => `/SchoolType`,
            providesTags: ["SchoolType"]
        }),
        getSchoolTypeById: builder.query<SchoolType, string>({
            query: (id) => `/SchoolType/${id}`,
            providesTags: ['SchoolType']
        }),
        createSchoolType: builder.mutation<void, CreateSchoolTypeRequest>({
            query: (payload) => ({
                url: `/SchoolType`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ["SchoolType"],

        }),
        updateSchoolType: builder.mutation<void, UpdateSchoolTypeRequest>({
            query: (payload) => ({
                url: `/SchoolType/${payload.id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ["SchoolType"]
        }),
        deleteSchoolType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/SchoolType/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["SchoolType"]
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

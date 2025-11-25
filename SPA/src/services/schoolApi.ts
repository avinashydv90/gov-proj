
import { createApi } from '@reduxjs/toolkit/query/react';
import { ISchool, ISchoolRegistrationRequest, ISchoolUpdationRequest } from '../components/types/School';
import dynamicBaseQuery from './StaffService/customBaseQuery';
import { baseUrl } from './api';


export const schoolApi = createApi({
    reducerPath: 'schoolApi',
    baseQuery: dynamicBaseQuery(baseUrl),
    tagTypes: ['School'],
    endpoints: (builder) => ({
        // GET all schools
        getAllSchools: builder.query<ISchool[], void>({
            query: () => 'School',
            providesTags: ['School'],
        }),

        // GET school by ID
        getSchoolById: builder.query<ISchool, string>({
            query: (id) => `School/${id}`,
            providesTags: ['School'],
        }),

        // POST - Add new school
        addSchool: builder.mutation<void, ISchoolRegistrationRequest>({
            query: (school) => ({
                url: 'School',
                method: 'POST',
                body: school,
            }),
            invalidatesTags: ['School'],
        }),

        // PUT - Update school
        updateSchool: builder.mutation<void, ISchoolUpdationRequest>({
            query: (school) => ({
                url: `School/${school.id}`,
                method: 'PUT',
                body: school,
            }),
            invalidatesTags: ['School'],
        }),

        // DELETE - Remove school
        deleteSchool: builder.mutation<void, string>({
            query: (id) => ({
                url: `School/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['School'],
        }),
    }),
});
export const {
    useGetAllSchoolsQuery,
    useGetSchoolByIdQuery,
    useAddSchoolMutation,
    useUpdateSchoolMutation,
    useDeleteSchoolMutation,
} = schoolApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Staff } from '../components/types/staff';

const baseUrl = 'https://localhost:7031/api/';

export const staffApi = createApi({
    reducerPath: 'staffApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Staff'],
    endpoints: (builder) => ({
        // GET all staff
        getAllStaff: builder.query<Staff[], void>({
            query: () => 'Staff',
            providesTags: ['Staff'],
        }),

        // GET staff by ID
        getStaffById: builder.query<Staff, number>({
            query: (id) => `Staff/${id}`,
            providesTags: ['Staff'],
        }),

        // GET staff by schoolId
        getStaffBySchoolId: builder.query<Staff[], string>({
            query: (schoolId) => `Staff?schoolId=${schoolId}`,
            providesTags: ['Staff'],
        }),

        // POST - Add new staff
        addStaff: builder.mutation<Staff, Omit<Staff, 'id'>>({
            query: (staff) => ({
                url: 'Staff',
                method: 'POST',
                body: staff,
            }),
            invalidatesTags: ['Staff'],
        }),

        // PUT - Update staff
        updateStaff: builder.mutation<Staff, Staff>({
            query: (staff) => ({
                url: `Staff/${staff.id}`,
                method: 'PUT',
                body: staff,
            }),
            invalidatesTags: ['Staff'],
        }),

        // DELETE - Remove staff
        deleteStaff: builder.mutation<void, number>({
            query: (id) => ({
                url: `Staff/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff'],
        }),
    }),
});
export const {
    useGetAllStaffQuery,
    useGetStaffByIdQuery,
    useGetStaffBySchoolIdQuery,
    useAddStaffMutation,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
} = staffApi;


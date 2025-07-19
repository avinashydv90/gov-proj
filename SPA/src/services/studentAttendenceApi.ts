//https://localhost:7031/api/StudentAttendence
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AttendancePostResponse, CreateStudentAttendance, StudentAttendance } from '../components/types/studentAttendence';


const baseUrl = 'https://localhost:7031/api/';

export const studentAttendanceApi = createApi({
    reducerPath: 'studentAttendanceApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Attendance'],
    endpoints: (builder) => ({
        // Fetch attendance (GET)
        getAttendanceByStudentId: builder.query<StudentAttendance[], number>({
            query: (studentId) => `StudentAttendence/student/${studentId}`,
            providesTags: ['Attendance'],
        }),
        getAttendanceByDivisionAndDate: builder.query<StudentAttendance[], { divisionId: number; date: string }>({
            query: ({ divisionId, date }) =>
                `StudentAttendence?divisionId=${divisionId}&date=${date}`,
            providesTags: ['Attendance'],
        }),
        getStudentAttendenceById: builder.query<StudentAttendance[], number>({
            query: (id) => `StudentAttendence/${id}`,
            providesTags: ['Attendance'],
        }),

        // Add attendance (POST)
        addAttendance: builder.mutation<AttendancePostResponse, CreateStudentAttendance[]>({
            query: (body) => ({
                url: 'StudentAttendence',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Attendance'],
        }),
        // ✅ PUT: Update an attendance record
        updateStudentAttendance: builder.mutation<void, StudentAttendance>({
            query: (attendance) => ({
                url: `StudentAttendence/${attendance.id}`,
                method: 'PUT',
                body: attendance,
            }),
            invalidatesTags: ['Attendance'],
        }),
        // ✅ DELETE: Delete an attendance record by ID
        deleteStudentAttendance: builder.mutation<void, number>({
            query: (id) => ({
                url: `StudentAttendence/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Attendance'],
        }),
    }),
});

export const {
    useGetAttendanceByStudentIdQuery,
    useGetAttendanceByDivisionAndDateQuery,
    useGetStudentAttendenceByIdQuery,
    useAddAttendanceMutation,
    useDeleteStudentAttendanceMutation,
    useUpdateStudentAttendanceMutation,
} = studentAttendanceApi;
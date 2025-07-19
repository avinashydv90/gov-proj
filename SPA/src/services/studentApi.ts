//https://localhost:7031/api/StudentAttendence
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Student } from '../components/types/student';

const baseUrl = "https://localhost:7031/api/";

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Student"],
    endpoints: (builder) => ({
        getStudentsByFilters: builder.query<Student[], { schoolId: string; standardId: string; divisionId: string }>({
            query: ({ schoolId, standardId, divisionId }) =>
                `students/by-filters?schoolId=${schoolId}&standardId=${standardId}&divisionId=${divisionId}`,
            providesTags: ['Student'],
        }),
        // GET /Student/{id}
        getStudentById: builder.query<Student, number>({
            query: (id) => `Student/${id}`,
            providesTags: ['Student'],
        }),
        // GET /Student?divisionId={divisionId}
        getStudentByDivisionId: builder.query<Student[], number>({
            query: (divisionId) => `Student/division/${divisionId}`,
            providesTags: ['Student'],
        }),

        getAllStudents: builder.query<Student[], void>({
            query: () => `Student`,
            providesTags: ['Student'],
        }),

        // POST /Student
        addStudent: builder.mutation<Student, Omit<Student, 'id'>>({
            query: (student) => ({
                url: 'Student',
                method: 'POST',
                body: student,
            }),
            invalidatesTags: ['Student'],
        }),

        // PUT /Student/{id}
        updateStudent: builder.mutation<Student, Student>({
            query: (student) => ({
                url: `Student/${student.id}`,
                method: 'PUT',
                body: student,
            }),
            invalidatesTags: ['Student'],
        }),

        // DELETE /Student/{id}
        deleteStudent: builder.mutation<void, number>({
            query: (id) => ({
                url: `Student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),

    }),

});
export const {
    useGetStudentByIdQuery,
    useGetAllStudentsQuery,
    useGetStudentsByFiltersQuery,
    useGetStudentByDivisionIdQuery,
    useAddStudentMutation,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
} = studentApi;

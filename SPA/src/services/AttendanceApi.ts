import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AttendancePostResponse,
  CreateStudentAttendance,
  StudentAttendance,
} from "../components/types/studentAttendence";

const baseUrl = "https://localhost:7031/api/";

export const studentAttendanceApi = createApi({
  reducerPath: "studentAttendanceApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    // ✅ POST: Create new attendance
    addAttendance: builder.mutation<
      AttendancePostResponse,
      CreateStudentAttendance
    >({
      query: (body) => ({
        url: "StudentAttendance",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"],
    }),

    // ✅ GET: Get attendance by student
    getAttendanceByStudent: builder.query<StudentAttendance[], number>({
      query: (studentId) => `StudentAttendance/student/${studentId}`,
      providesTags: ["Attendance"],
    }),

    // ✅ DELETE: Delete attendance by id
    deleteAttendance: builder.mutation<void, number>({
      query: (id) => ({
        url: `StudentAttendance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),

    // ✅ PUT: Update attendance by id
    updateAttendance: builder.mutation<
      void,
      { id: number; data: CreateStudentAttendance }
    >({
      query: ({ id, data }) => ({
        url: `StudentAttendance/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useAddAttendanceMutation,
  useGetAttendanceByStudentQuery,
  useDeleteAttendanceMutation,
  useUpdateAttendanceMutation,
} = studentAttendanceApi;

// https://api.poitdp.shahapur-mh.in/api/StudentAttendance
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AttendancePostResponse,
  CreateStudentAttendance,
  StudentAttendance,
} from "../components/types/studentAttendence";

const baseUrl = " https://api.poitdp.shahapur-mh.in/api/";

export const studentAttendanceApi = createApi({
  reducerPath: "studentAttendanceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    // Fetch attendance (GET)
    getAttendanceByStudentId: builder.query<StudentAttendance[], number>({
      query: (studentId) => `StudentAttendance/student/${studentId}`,
      providesTags: ["Attendance"],
    }),
    getAttendanceByDivisionAndDate: builder.query<
      StudentAttendance[],
      { divisionId: number; date: string }
    >({
      query: ({ divisionId, date }) =>
        `StudentAttendance?divisionId=${divisionId}&date=${date}`,
      providesTags: ["Attendance"],
    }),
    getStudentAttendanceById: builder.query<StudentAttendance[], number>({
      query: (id) => `StudentAttendance/${id}`,
      providesTags: ["Attendance"],
    }),

    // Add attendance (POST)
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
    // ✅ PUT: Update an attendance record
    updateStudentAttendance: builder.mutation<void, StudentAttendance>({
      query: (attendance) => ({
        url: `StudentAttendance/${attendance.id}`,
        method: "PUT",
        body: attendance,
      }),
      invalidatesTags: ["Attendance"],
    }),
    // ✅ DELETE: Delete an attendance record by ID
    deleteStudentAttendance: builder.mutation<void, number>({
      query: (id) => ({
        url: `StudentAttendance/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendanceByStudentIdQuery,
  useGetAttendanceByDivisionAndDateQuery,
  useGetStudentAttendanceByIdQuery,
  useAddAttendanceMutation,
  useDeleteStudentAttendanceMutation,
  useUpdateStudentAttendanceMutation,
} = studentAttendanceApi;

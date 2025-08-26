import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./StaffService/customBaseQuery";
import {
  StudentAttendance,
  StudentAttendanceReportDto,
} from "../components/types/studentAttendence";
import { baseUrl } from "./api";

export const studentAttendanceApi = createApi({
  reducerPath: "studentAttendanceApi",
  baseQuery: dynamicBaseQuery(baseUrl),
  tagTypes: ["StudentAttendance"],

  endpoints: (builder) => ({
    // GET /api/StudentAttendance/{divisionId}/{date}
    getAttendance: builder.query<
      StudentAttendance[],
      { divisionId: string; date: string }
    >({
      query: ({ divisionId, date }) =>
        `StudentAttendance/${divisionId}/${date}`,
      providesTags: ["StudentAttendance"],
    }),
    // ✅ GET /api/StudentAttendance/attendance/standard/{standardId}/division/{divisionId}?date=...
    getAttendanceByStandardDivisionAndDate: builder.query<
      StudentAttendance[],
      { standardId: string; divisionId: string; date: string }
    >({
      query: ({ standardId, divisionId, date }) =>
        `StudentAttendance/standard/${standardId}/division/${divisionId}/date/${date}`,
      providesTags: ["StudentAttendance"],
    }),
    // POST /api/StudentAttendance
    saveAttendance: builder.mutation<void, StudentAttendance[]>({
      query: (attendanceList) => ({
        url: "StudentAttendance",
        method: "POST",
        body: attendanceList,
      }),
      invalidatesTags: ["StudentAttendance"], // refresh the cache
    }),
    downloadAttendancePdf: builder.mutation<Blob, StudentAttendanceReportDto[]>(
      {
        query: (student) => ({
          url: "StudentAttendance/download-pdf",
          method: "POST",
          body: student, // 👈 Must match expected DTO shape
          responseHandler: async (response) => {
            if (!response.ok) {
              const text = await response.text();
              throw new Error(`Failed: ${response.status} - ${text}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "attendance-report.pdf";
            a.click();
            window.URL.revokeObjectURL(url);
          },
        }),
      }
    ),
  }),
});
export const {
  useGetAttendanceQuery,
  useGetAttendanceByStandardDivisionAndDateQuery,
  useDownloadAttendancePdfMutation,
  useSaveAttendanceMutation,
} = studentAttendanceApi;

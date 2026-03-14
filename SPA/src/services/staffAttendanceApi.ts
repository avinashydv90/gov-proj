import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./StaffService/customBaseQuery";
import { baseUrl } from "./api";
import { StaffAttendance, StaffAttendanceReportDto } from "../components/types/IStaffAttendance";

export const staffAttendanceApi = createApi({
    reducerPath: "staffAttendanceApi",
    baseQuery: dynamicBaseQuery(baseUrl),
    tagTypes: ["StaffAttendance"],

    endpoints: (builder) => ({
        getStaffAttendanceBySchoolIdAndDate: builder.query<StaffAttendance[], { schoolId: string, date: string }>({
            query: ({ schoolId, date }) =>
                `StaffAttendance/staff-attendance?schoolId=${schoolId}&date=${date}`,
            providesTags: ["StaffAttendance"],
        }),
        saveStaffAttendance: builder.mutation<void, StaffAttendance[]>({
            query: (attendance) => ({
                url: "StaffAttendance/SaveOrUpdateStaffAttendance",
                method: "POST",
                body: attendance,
            }),
            invalidatesTags: ["StaffAttendance"],
        }),

        downloadStaffAttendancePdf: builder.mutation<Blob, { schoolName: string; staffs: StaffAttendanceReportDto[] }>({
            query: ({ schoolName, staffs }) => ({
                url: `StaffAttendance/download-pdf?schoolName=${encodeURIComponent(schoolName)}`,
                method: "POST",
                body: staffs,
                responseHandler: async (response) => {
                    if (!response.ok) {
                        const text = await response.text();
                        throw new Error(`Failed: ${response.status} - ${text}`);
                    }

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "staff-attendance-report.pdf";
                    a.click();
                    window.URL.revokeObjectURL(url);
                },
            }),
        }),

    }),
});

export const {
    useGetStaffAttendanceBySchoolIdAndDateQuery,
    useSaveStaffAttendanceMutation,
    useDownloadStaffAttendancePdfMutation
} = staffAttendanceApi;

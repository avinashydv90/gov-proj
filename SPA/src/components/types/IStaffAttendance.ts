export interface StaffAttendance {
    staffId: string;
    fullName: string;
    schoolId: string;
    date: string; // or Date if you'll convert it
    isPresent: boolean;
}
export interface StaffAttendanceReportDto {
    srNo: number;
    fullName: string;
    date: string;
    schoolId: string;
    isPresent: boolean;
}
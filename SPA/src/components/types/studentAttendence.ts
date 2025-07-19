export interface StudentAttendance {
    id: number;
    studentId: number;
    divisionId: number;
    date: string; // ISO string
    isPresent: boolean;
}
export interface AttendancePostResponse {
    success: boolean;
    message: string;
}
export interface CreateStudentAttendance {
    studentId: number;
    divisionId: number;
    date: string;
    isPresent: boolean;
}
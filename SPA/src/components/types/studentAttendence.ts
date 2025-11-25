export interface StudentAttendance {
    id: string; // Attendance record ID
    studentId: string;    // Id of the student
    standardId: string;  // Standard Id
    fullName: string;     // Student's name
    divisionId: string;   // Division Id
    date: string;         // ISO string of the attendance date
    schoolId: string;   // Name of the school
    isPresent: boolean;   // Whether student is present
}

export interface StudentAttendanceReportDto {
    srNo: number;
    fullName: string;
    standard: string;
    division: string;
    schoolId: string;
    date: string;
    isPresent: boolean;
}
export interface IStudent {
    id: string;
    fullName: string;
    grNumber: number;
    dateOfBirth: string; // ISO string (e.g., "2025-08-12T10:00:00Z")
    gender: string;
    address: string;
    guardianName: string;
    motherName: string;
    contact: string;
    caste: string;
    casteTypeId: string;
    religion: string;
    religionTypeId: string;
    divisionId: string;
    schoolId: string;
    standardId: string;
}

export interface IStudentRegistrationRequest {
    id?: string;
    fullName: string;
    grNumber: number;
    dateOfBirth: string; // ISO string (e.g., "2025-08-12T10:00:00Z")
    gender: string;
    address: string;
    guardianName: string;
    motherName: string;
    contact: string;
    caste: string;
    casteTypeId: string;
    religion: string;
    religionTypeId: string;
    divisionId: string;
    schoolId: string;
    standardId: string;
}
export interface IStudentUpdationRequest {
    id: string;
    fullName: string;
    grNumber: number;
    dateOfBirth: string; // ISO string (e.g., "2025-08-12T10:00:00Z")
    gender: string;
    address: string;
    guardianName: string;
    motherName: string;
    contact: string;
    caste: string;
    casteTypeId: string;
    religion: string;
    religionTypeId: string;
    divisionId: string;
    schoolId: string;
    standardId: string;
}
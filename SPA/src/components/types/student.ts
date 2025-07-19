export interface Student {
    id: number;
    name: string;
    dateOfBirth: string; // ISO string
    address: string;
    divisionId: number;  // Changed from divisionId
    standard: number;  // Changed from standardId
}

export interface StudentRegistrationRequest {
    id?: number;
    name: string;
    dateOfBirth: string; // ISO string
    address: string;
    division: string;  // Changed from divisionId
    standard: number;  // Changed from standardId
}
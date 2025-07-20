export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  divisionId: string;
  schoolId: string; //guid
  parentName: string;
  parentContact?: string | null;
  rollNumber: number;
  standardId: string; // Added to associate student with a standard
}

export interface StudentRegistrationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  divisionId: string;
  schoolId: string; // GUID
  parentName: string;
  parentContact?: string | null;
  rollNumber: number;
}
export interface UpdateStudentRegistrationRequest {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  divisionId: string;
  schoolId: string; // GUID
  parentName: string;
  parentContact?: string | null;
  rollNumber: number;
}

export interface IStaff {
    id: string;
    name: string;
    qualification: string;
    subject: string;
    joiningDate: string;
    gender: string;
    address: string; // Optional field for address
    contact: string; // Optional field for contact
    email: string; // Optional field for email
    minimumStandard: string;
    maximumStandard: string;
    dateOfBirth: string;
    caste: string;
    religion: string;
    employeeTypeId: string;
    staffTypeId: string;
    userId?: string;
    schoolId: string;
    religionTypeId: string;
    casteTypeId: string;
}

export interface IStaffRequest {
    id?: string;
    name: string;
    qualification: string;
    subject: string;
    joiningDate: string;
    gender: string;
    address: string; // Optional field for address
    contact: string; // Optional field for contact
    email: string; // Optional field for email
    minimumStandard: string;
    maximumStandard: string;
    dateOfBirth: string;
    caste: string;
    religion: string;
    employeeTypeId: string;
    staffTypeId: string;
    userId?: string;
    schoolId: string;
    religionTypeId: string;
    casteTypeId: string;
}
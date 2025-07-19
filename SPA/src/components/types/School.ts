export interface School {
    id: string;
    schoolName: string;
    establishDate: string;
    schoolType: "Aided" | "Non-Aided"; // exact match from backend
    address: string;
}

export interface SchoolRegistrationRequest {
    id?: string; // Optional for new registrations, required for updates
    schoolName: string;
    establishDate: string;
    schoolType: "Aided" | "Non-Aided";
    address: string;
}

export interface SchoolRegistrationResponse {
    id: string;
    schoolName: string;
    message: string;
}

export interface School {
  id: string;
  name: string;
  establishDate: string;
  type: "अनुदानित" | "बिनअनुदानित"; // exact match from backend
  address: string;
}

export interface SchoolRegistrationRequest {
  id?: string; // Optional for new registrations, required for updates
  name: string;
  establishDate: string;
  type: "अनुदानित" | "बिनअनुदानित";
  address: string;
}

export interface SchoolRegistrationResponse {
  id: string;
  name: string;
  type: string;
  address: string;
  establishDate: string;
}

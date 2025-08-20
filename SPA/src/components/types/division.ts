export interface Division {
  id: string;
  name: string;
  standardId: string;
  schoolId: string; // Added to associate division with a school
}
export interface CreateDivisionDto {
  name: string;
  standardId: string;
  schoolId: string; // Added to associate division with a school
}
export interface UpdateDivisionDto {
  id: string;
  name: string;
  standardId: string;
  schoolId: string; // Added to associate division with a school
}
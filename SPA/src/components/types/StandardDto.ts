export interface StandardDto {
  id?: number; // optional for POST
  name: string;
  description?: string;
  schoolId?: string; // used for filtering by school
}

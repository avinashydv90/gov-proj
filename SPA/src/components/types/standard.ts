export interface Standard {
  id?: number;
  std: string;
  schoolId: string; // GUID
}
export interface CreateStandardDto {
  name: string;
  schoolId: string; // Guid
}
export interface UpdateStandardDto {
  name: string;
  schoolId: string; // Guid
}

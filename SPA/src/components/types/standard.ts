export interface IStandard {
  id: string;
  name: string;
  schoolId: string; // GUID
}
export interface ICreateStandardDto {
  name: string;
  schoolId: string; // Guid
}
export interface IUpdateStandardDto {
  id: string;
  name: string;
  schoolId: string; // Guid
}

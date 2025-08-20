export interface SchoolType {
    id: string;
    type: string;
}
export interface CreateSchoolTypeRequest {
    id?: string;
    type: string;
}
export interface UpdateSchoolTypeRequest {
    id: string;
    type: string;

}
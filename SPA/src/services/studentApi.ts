// src/services/studentApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IStudent,
  IStudentRegistrationRequest,
  IStudentUpdationRequest,
} from "../components/types/student";
import dynamicBaseQuery from "./StaffService/customBaseQuery";

const baseUrl = "https://localhost:7031/api/";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: dynamicBaseQuery(baseUrl),
  tagTypes: ["Student"],
  endpoints: (builder) => ({
    // GET /Student/school/{schoolId}
    getStudentBySchoolId: builder.query<IStudent[], string>({
      query: (schoolId) => `Student/school/${schoolId}`,
      providesTags: ["Student"],
    }),

    // GET /Student/{studentId}
    getStudentById: builder.query<IStudent, string>({
      query: (id) => `Student/${id}`,
      providesTags: ["Student"],
    }),
    // GET /Student?divisionId={divisionId}
    getStudentByDivisionId: builder.query<IStudent[], string>({
      query: (divisionId) => `Student?divisionId=${divisionId}`,
      providesTags: ["Student"],
    }),

    // GET /Student
    getAllStudents: builder.query<IStudent[], void>({
      query: () => `Student`,
      providesTags: ["Student"],
    }),

    // POST /Student
    addStudent: builder.mutation<void, IStudentRegistrationRequest>({
      query: (student) => ({
        url: "Student",
        method: "POST",
        body: {
          fullName: student.fullName,
          grNumber: student.grNumber,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          address: student.address,
          guardianName: student.guardianName,
          motherName: student.motherName,
          contact: student.contact,
          caste: student.caste,
          casteTypeId: student.casteTypeId,
          religion: student.religion,
          religionTypeId: student.religionTypeId,
          divisionId: student.divisionId,
          schoolId: student.schoolId,
          standardId: student.standardId, // valid GUID required
        },
      }),
      invalidatesTags: ["Student"],
    }),


    // PUT /Student/{id}
    updateStudent: builder.mutation<void, IStudentUpdationRequest>({
      query: (student) => ({
        url: `Student/${student.id}`,
        method: "PUT",
        body: {
          fullName: student.fullName,
          grNumber: student.grNumber,
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          address: student.address,
          guardianName: student.guardianName,
          motherName: student.motherName,
          contact: student.contact,
          caste: student.caste,
          casteTypeId: student.casteTypeId,
          religion: student.religion,
          religionTypeId: student.religionTypeId,
          divisionId: student.divisionId,
          schoolId: student.schoolId,
          standardId: student.standardId, // must be valid GUID
        },
      }),
      invalidatesTags: ["Student"],
    }),

    // DELETE /Student/{id}
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `Student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentBySchoolIdQuery,
  useGetStudentByIdQuery,
  useGetAllStudentsQuery,
  useGetStudentByDivisionIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;

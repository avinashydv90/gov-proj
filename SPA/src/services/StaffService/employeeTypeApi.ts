import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./customBaseQuery";
import { IEmployeeType, IEmployeeTypeRequest } from "../../components/types/IEmployeeType";


const baseUrl = "https://localhost:7031/api";

export const employeeTypeApi = createApi({
    reducerPath: "employeeTypeApi",
    baseQuery: dynamicBaseQuery(baseUrl),
    tagTypes: ["EmployeeType"],
    endpoints: (builder) => ({
        getAllEmployeeType: builder.query<IEmployeeType[], void>({
            query: () => "/EmployeeType",
            providesTags: ["EmployeeType"]
        }),
        getEmployeeTypeById: builder.query<IEmployeeType, string>({
            query: (id) => `/EmployeeType/${id}`,
            providesTags: ["EmployeeType"]
        }),
        createEmployeeType: builder.mutation<void, IEmployeeTypeRequest>({
            query: (newEmployeeType) => ({
                url: "/EmployeeType",
                method: "POST",
                body: newEmployeeType
            }),
            invalidatesTags: ["EmployeeType"]
        }),
        updateEmployeeType: builder.mutation<void, IEmployeeType>({
            query: (employeeType) => ({
                url: `/EmployeeType/${employeeType.id}`,
                method: "PUT",
                body: employeeType
            }),
            invalidatesTags: ["EmployeeType"]
        }),
        deleteEmployeeType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/EmployeeType/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["EmployeeType"]
        })
    })
});

export const {
    useGetAllEmployeeTypeQuery,
    useGetEmployeeTypeByIdQuery,
    useCreateEmployeeTypeMutation,
    useUpdateEmployeeTypeMutation,
    useDeleteEmployeeTypeMutation
} = employeeTypeApi
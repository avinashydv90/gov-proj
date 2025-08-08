import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./customBaseQuery";
import { IReligionType, IReligionTypeRequest } from "../../components/types/IReligionType";

const baseUrl = "https://localhost:7031/api";

export const religionTypeApi = createApi({
    reducerPath: "religionTypeApi",
    baseQuery: dynamicBaseQuery(baseUrl),
    tagTypes: ["ReligionType"],
    endpoints: (builder) => ({

        getAllReligionTypes: builder.query<IReligionType[], void>({
            query: () => "/ReligionType",
            providesTags: ["ReligionType"],
        }),
        getReligionTypeById: builder.query<IReligionType, string>({
            query: (id) => `/ReligionType/${id}`,
            providesTags: ["ReligionType"],
        }),
        addReligionType: builder.mutation<void, IReligionTypeRequest>({
            query: (newReligionType) => ({
                url: "/ReligionType",
                method: "POST",
                body: newReligionType,
            }),
            invalidatesTags: ["ReligionType"],
        }),
        updateReligionType: builder.mutation<void, IReligionType>({
            query: (updatedData) => ({
                url: `/ReligionType/${updatedData.id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: ["ReligionType"],
        }),
        deleteReligionType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/ReligionType/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["ReligionType"],
        }),
    }),
})

export const {
    useGetAllReligionTypesQuery,
    useGetReligionTypeByIdQuery,
    useAddReligionTypeMutation,
    useUpdateReligionTypeMutation,
    useDeleteReligionTypeMutation
} = religionTypeApi;
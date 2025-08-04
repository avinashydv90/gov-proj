import { createApi } from "@reduxjs/toolkit/query/react";
import dynamicBaseQuery from "./customBaseQuery";
import { ICasteType } from "../../components/types/ICasteType";

const baseUrl = "https://localhost:7031/api";

export const casteTypeApi = createApi({
    reducerPath: "casteTypeApi",
    baseQuery: dynamicBaseQuery(baseUrl),
    tagTypes: ["CasteType"],
    endpoints: (builder) => ({
        getAllCasteTypes: builder.query<ICasteType[], void>({
            query: () => "/CasteType",
            providesTags: ["CasteType"]
        }),
        getCasteTypeById: builder.query<ICasteType, string>({
            query: (id) => `/CasteType/${id}`,
            providesTags: ["CasteType"]
        }),
        createCasteType: builder.mutation<void, ICasteType>({
            query: (newCasteType) => ({
                url: "/CasteType",
                method: "POST",
                body: newCasteType
            }),
            invalidatesTags: ["CasteType"]
        }),
        updateCasteType: builder.mutation<void, ICasteType>({
            query: (casteType) => ({
                url: `/CasteType/${casteType.id}`,
                method: "PUT",
                body: casteType
            }),
            invalidatesTags: ["CasteType"]
        }),
        deleteCasteType: builder.mutation<void, string>({
            query: (id) => ({
                url: `/CasteType/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["CasteType"]
        })
    })
});

export const {
    useGetAllCasteTypesQuery,
    useGetCasteTypeByIdQuery,
    useCreateCasteTypeMutation,
    useUpdateCasteTypeMutation,
    useDeleteCasteTypeMutation
} = casteTypeApi;
// src/api/customBaseQuery.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const dynamicBaseQuery = (baseUrl: string) => {
    return fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    });
};

export default dynamicBaseQuery;

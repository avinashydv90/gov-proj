// services/authApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../components/types/auth";
import dynamicBaseQuery from "./StaffService/customBaseQuery";
import { baseUrl } from "./api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: dynamicBaseQuery(baseUrl + "Auth"),


  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<void, RegisterRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

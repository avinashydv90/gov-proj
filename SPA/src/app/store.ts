import { configureStore } from "@reduxjs/toolkit";
import { studentAttendanceApi } from "../services/studentAttendenceApi";
import { standardApi } from "../services/standardApi";
import { divisionApi } from "../services/divisionApi";
import { studentApi } from "../services/studentApi";
import { authApi } from "../services/authApi";
import { hostelApi } from "../services/hostelApi";
import { schoolApi } from "../services/schoolApi";
import { staffApi } from "../services/staffApi";
import { newSchoolTypeApi } from "../services/newSchoolTypeApi";


const isDev = process.env.NODE_ENV === "development";

export const store = configureStore({
  reducer: {
    [studentAttendanceApi.reducerPath]: studentAttendanceApi.reducer,
    [standardApi.reducerPath]: standardApi.reducer,
    [divisionApi.reducerPath]: divisionApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [hostelApi.reducerPath]: hostelApi.reducer,
    [schoolApi.reducerPath]: schoolApi.reducer,
    [staffApi.reducerPath]: staffApi.reducer,
    [newSchoolTypeApi.reducerPath]: newSchoolTypeApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      studentAttendanceApi.middleware,
      standardApi.middleware,
      divisionApi.middleware,
      studentApi.middleware,
      authApi.middleware,
      hostelApi.middleware,
      schoolApi.middleware,
      newSchoolTypeApi.middleware,
      staffApi.middleware
    ),

  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

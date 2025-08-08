import { configureStore } from "@reduxjs/toolkit";
import { studentAttendanceApi } from "../services/studentAttendenceApi";
import { standardApi } from "../services/standardApi";
import { divisionApi } from "../services/divisionApi";
import { studentApi } from "../services/studentApi";
import { authApi } from "../services/authApi";
import { hostelApi } from "../services/hostelApi";
import { schoolApi } from "../services/schoolApi";
import { staffApi } from "../services/StaffService/staffApi";
import { newSchoolTypeApi } from "../services/newSchoolTypeApi";
import { casteTypeApi } from "../services/StaffService/casteTypeApi";
import { staffTypeApi } from "../services/StaffService/staffTypeApi";
import { employeeTypeApi } from "../services/StaffService/employeeTypeApi";
import { religionTypeApi } from "../services/StaffService/religionTypeApi";


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
    [casteTypeApi.reducerPath]: casteTypeApi.reducer,
    [staffTypeApi.reducerPath]: staffTypeApi.reducer,
    [employeeTypeApi.reducerPath]: employeeTypeApi.reducer,
    [religionTypeApi.reducerPath]: religionTypeApi.reducer,


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
      staffApi.middleware,
      casteTypeApi.middleware,
      staffTypeApi.middleware,
      employeeTypeApi.middleware,
      religionTypeApi.middleware
    ),

  devTools: isDev,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

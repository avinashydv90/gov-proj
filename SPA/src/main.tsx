import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./constants/RouteNames.ts";
import Home from "./pages/Home.tsx";
import Introduction from "./components/Introduction.tsx";
import AshramSchools from "./components/AshramSchools.tsx";
import GovHostels from "./components/GovHostels.tsx";
import VikasYojana from "./components/VikasYojana.tsx";
import Gallery from "./components/Gallery.tsx";
import DownloadForm from "./components/DownloadForm.tsx";
import LabharthiList from "./components/LabharthiList.tsx";
import LoksevaHakka from "./components/LoksevaHakka.tsx";
import ContactUs from "./components/ContactUs.tsx";
import RightToInformation from "./components/RightToInformation.tsx";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import SchoolList from "./Student/SchoolList.tsx";
import AdminApp from "./AdminApp.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import SchoolRegistrationForm from "./components/SchoolRegistration.tsx";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute.tsx";
import Logout from "./components/Auth/Logout.tsx";
import StandardList from "./components/Standard/StandardList.tsx";
import StandardForm from "./components/Standard/StandardForm.tsx";
import StudentForm from "./components/StudentForm.tsx";
import StudentList from "./Student/StudentList.tsx";
import StudentAttendanceForm from "./components/StudentAttendanceForm/StudentAttendanceForm.tsx";
import SchoolTypeForm from "./components/SchoolTypeForm.tsx";
import { SchoolTypeList } from "./components/SchoolTypeList.tsx";
import { EmployeeTypeList } from "./components/Staff/EmployeeTypeList.tsx";
import EmployeeTypeForm from "./components/Staff/EmployeeTypeForm.tsx";
import StaffList from "./components/Staff/StaffList.tsx";

import StaffTypeForm from "./components/Staff/StaffTypeForm.tsx";

import CasteTypeForm from "./components/Staff/CasteTypeForm.tsx";
import StaffForm from "./components/Staff/StaffForm.tsx";
import { CasteTypeList } from "./components/Staff/CasteTypeList.tsx";
import { StaffTypeList } from "./components/Staff/StaffTypeList.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    handle: { label: RouteNames.Home },
    children: [
      {
        path: "/",
        element: <Home />,
        handle: { label: RouteNames.DashBoard },
      },
      {
        path: "/introduction",
        element: <Introduction />,
        handle: { label: RouteNames.About },
      },
      {
        path: "/ashramschool",
        element: <AshramSchools />,
        handle: { label: RouteNames.GovernmentAshramSchools },
      },
      {
        path: "/gov-hostel",
        element: <GovHostels />,
        handle: { label: RouteNames.GovHostels },
      },
      {
        path: "/vikasyojana",
        element: <VikasYojana />,
        handle: { label: RouteNames.VikasYoujna },
      },
      {
        path: "/gallery",
        element: <Gallery />,
        handle: { label: RouteNames.Gallery },
      },
      {
        path: "/download-form",
        element: <DownloadForm />,
        handle: { label: RouteNames.DownloadForm },
      },
      {
        path: "/labharthi-list",
        element: <LabharthiList />,
        handle: { label: RouteNames.LabharthiList },
      },
      {
        path: "/loksevahakka",
        element: <LoksevaHakka />,
        handle: { label: RouteNames.LokSevaHakka },
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
        handle: { label: RouteNames.ContactUs },
      },
      {
        path: "/rti",
        element: <RightToInformation />,
        handle: { label: RouteNames.RightToInformation },
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminApp />,
    handle: { label: RouteNames.Admin },
    children: [
      {
        path: "school-list",
        element: (
          <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <SchoolList />
          </ProtectedRoute>
        ),
        handle: { label: RouteNames.SchoolList },
      },
      {
        path: "school-registration",
        element: (
          <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <SchoolRegistrationForm />
          </ProtectedRoute>
        ),
        handle: { label: RouteNames.SchoolList },
      },
      {
        path: "school-edit/:id",
        element: (
          <ProtectedRoute allowedRoles={["SuperAdmin"]}>
            <SchoolRegistrationForm />
          </ProtectedRoute>
        ),
        handle: { label: RouteNames.EditSchool },
      },
      {
        path: "standard-list",
        element: <StandardList />,
        handle: { label: RouteNames.StandardList },
      },
      {
        path: "add-standard",
        element: <StandardForm />,
        handle: { label: RouteNames.AddStandard },
      },
      {
        path: "edit-standard/:standardId",
        element: <StandardForm />,
        handle: { label: RouteNames.EditStandard },
      },
      {
        path: "add-student",
        element: <StudentForm />,
        handle: { label: RouteNames.StudentRegistration },
      },
      {
        path: "student-list",
        element: <StudentList />,
        handle: { label: RouteNames.StudentRegistration },
      },
      {
        path: "edit-school/:id",
        element: <StudentForm />,
        handle: { label: RouteNames.EditStudent },
      },
      {
        path: "add-attandance",
        element: <StudentAttendanceForm />,
        handle: { label: RouteNames.AddStandard },
      },
      {
        path: "add-schooltype",
        element: <SchoolTypeForm />,
        handle: { label: RouteNames.AddSchoolType },
      },
       {
        path: "edit-schooltype/:id",
        element: <SchoolTypeForm />,
        handle: { label: RouteNames.EditSchoolType },
      },
       {
        path: "schooltype-list",
        element: <SchoolTypeList />,
        handle: { label: RouteNames.SchoolTypeList },
      },
       {
        path: "employeetype-list",
        element: <EmployeeTypeList />,
        handle: { label: RouteNames.EmployeeTypeList },
      }, {
        path: "add-employeetype",
        element: <EmployeeTypeForm />,
        handle: { label: RouteNames.AddEmployeeType },
      },{
        path: "edit-employeetype/:id",
        element: <EmployeeTypeForm />,
        handle: { label: RouteNames.EditEmployeeType },
      },
       {
        path: "stafftype-list",
        element: <StaffTypeList />,
        handle: { label: RouteNames.StaffTypeList },
      },
      {
        path: "add-stafftype",
        element: <StaffTypeForm />,
        handle: { label: RouteNames.AddStaffType },
      },
       {
        path: "edit-stafftype/:id",
        element: <StaffTypeForm />,
        handle: { label: RouteNames.EditStaffType },
      }, {
        path: "staff-list",
        element: <StaffList />,
        handle: { label: RouteNames.StaffList },
      },
      {
        path: "add-staff",
        element: <StaffForm />,
        handle: { label: RouteNames.AddStaff },
      },
       {
        path: "edit-staff/:id",
        element: <StaffTypeForm />,
        handle: { label: RouteNames.EditStaff },
      }, {
        path: "castetype-list",
        element: <CasteTypeList />,
        handle: { label: RouteNames.CasteTypeList },
      },{
        path: "add-castetype",
        element: <CasteTypeForm />,
        handle: { label: RouteNames.AddCasteType },
      },
       {
        path: "edit-castetype/:id",
        element: <CasteTypeForm />,
        handle: { label: RouteNames.EditCasteType },
      }
    ],
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </HelmetProvider>
);

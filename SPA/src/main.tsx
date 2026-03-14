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
import SchoolList from "./components/School/SchoolList.tsx";
import AdminApp from "./AdminApp.tsx";
import LoginForm from "./components/Auth/LoginForm.tsx";
import SchoolRegistrationForm from "./components/School/SchoolRegistration.tsx";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute.tsx";
import Logout from "./components/Auth/Logout.tsx";
import StandardList from "./components/Standard/StandardList.tsx";
import StandardForm from "./components/Standard/StandardForm.tsx";
import StudentForm from "./components/Student/StudentForm.tsx";
import StudentList from "./components/Student/StudentList.tsx";
import StudentAttendanceForm from "./components/StudentAttendance/StudentAttendanceForm.tsx";
import SchoolTypeForm from "./components/School/SchoolTypeForm.tsx";
import { SchoolTypeList } from "./components/School/SchoolTypeList.tsx";
import { EmployeeTypeList } from "./components/Staff/EmployeeTypeList.tsx";
import EmployeeTypeForm from "./components/Staff/EmployeeTypeForm.tsx";
import StaffList from "./components/Staff/StaffList.tsx";
import StaffTypeForm from "./components/Staff/StaffTypeForm.tsx";
import CasteTypeForm from "./components/AllTypes/CasteTypeForm.tsx";
import StaffForm from "./components/Staff/StaffForm.tsx";
import { CasteTypeList } from "./components/AllTypes/CasteTypeList.tsx";
import { StaffTypeList } from "./components/Staff/StaffTypeList.tsx";
import ReligionTypeForm from "./components/AllTypes/ReligionTypeForm.tsx";
import { ReligionTypeList } from "./components/AllTypes/ReligionTypeList.tsx";
import AttendanceList from "./components/StudentAttendance/AttendanceList.tsx";
import StaffAttendanceList from "./components/Staff/Attendance/StaffAttendanceList.tsx";
import StaffAttendanceForm from "./components/Staff/Attendance/StaffAttendanceForm.tsx";

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
          <ProtectedRoute allowedRoles={["SuperAdmin","Principal"]}>
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
        element:(<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StandardList /></ProtectedRoute> ),
        handle: { label: RouteNames.StandardList },
      },
      {
        path: "add-standard",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StandardForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddStandard },
      },
      {
        path: "edit-standard/:standardId",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StandardForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditStandard },
      },
      {
        path: "add-student",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StudentForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddStudent },
      },
      {
        path: "student-list",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StudentList /></ProtectedRoute>),
        handle: { label: RouteNames.StudentList },
      },
      {
        path: "edit-student/:id",
       element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StudentForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditStudent },
      },
      {
        path: "add-attendance",    
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StudentAttendanceForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddStudentAttendance },
      },
      {
        path: "attendance-list",    
       element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><AttendanceList /></ProtectedRoute>),
        handle: { label: RouteNames.StudentAttendanceList },
      },{
        path: "add-staff-attendance",    
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffAttendanceForm /></ProtectedRoute>),
        handle: { label: RouteNames.StaffAttendance },
      },
      {
        path: "staff-attendance-list",    
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffAttendanceList /></ProtectedRoute>),
        handle: { label: RouteNames.StaffAttendanceList },
      },
     
      {
        path: "add-schooltype",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin"]}>< SchoolTypeForm/></ProtectedRoute>),
        handle: { label: RouteNames.AddSchoolType },
      },
       {
        path: "edit-schooltype/:id",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin"]}>< SchoolTypeForm/></ProtectedRoute>),
        handle: { label: RouteNames.EditSchoolType },
      },
       {
        path: "schooltype-list",
        
         element: (<ProtectedRoute allowedRoles={["SuperAdmin"]}><SchoolTypeList /></ProtectedRoute>),
        handle: { label: RouteNames.SchoolTypeList },
      },
       {
        path: "employeetype-list",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><EmployeeTypeList /></ProtectedRoute>),
        handle: { label: RouteNames.EmployeeTypeList },
      }, {
        path: "add-employeetype",
       element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><EmployeeTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddEmployeeType },
      },{
        path: "edit-employeetype/:id",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><EmployeeTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditEmployeeType },
      },
       {
        path: "stafftype-list",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffTypeList /></ProtectedRoute>),
        handle: { label: RouteNames.StaffTypeList },
      },
      {
        path: "add-stafftype",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddStaffType },
      },
       {
        path: "edit-stafftype/:id",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditStaffType },
      }, {
        path: "staff-list",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffList /></ProtectedRoute>),
        handle: { label: RouteNames.StaffList },
      },
      {
        path: "add-staff",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddStaff },
      },
       {
        path: "edit-staff/:id",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><StaffForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditStaff },
      }, {
        path: "castetype-list",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><CasteTypeList /></ProtectedRoute>),
        handle: { label: RouteNames.CasteTypeList },
      },{
        path: "add-castetype",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><CasteTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddCasteType },
      },
       {
        path: "edit-castetype/:id",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><CasteTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditCasteType },
      },
      {
        path: "religiontype-list",
         element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><ReligionTypeList /></ProtectedRoute>),
        handle: { label: RouteNames.ReligionTypeList },
      },{
        path: "add-religiontype",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><ReligionTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.AddReligionType },
      },
       {
        path: "edit-religiontype/:id",
        element: (<ProtectedRoute allowedRoles={["SuperAdmin","Principal","Teacher"]}><ReligionTypeForm /></ProtectedRoute>),
        handle: { label: RouteNames.EditReligionType },
      },
     
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

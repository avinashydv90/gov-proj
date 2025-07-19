
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
import StudentAttendance from "./Student/StudentAttendence.tsx";
import { HelmetProvider } from "react-helmet-async";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import SchoolRegistrationForm from "./components/SchoolRegistration.tsx";
import SchoolList from "./Student/SchoolList.tsx";
import StudentForm from "./components/StudentForm.tsx";

export const router = createBrowserRouter(
  [
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
        {
           path: "/student-attendance",
           element: <StudentAttendance />,
           handle: { label: RouteNames.StudentAttendance },
        },
        {
           path: "/school-registration",
           element: <SchoolRegistrationForm />,
           handle: { label: RouteNames.SchoolRegistration },
        },
        {
          path: "/school-list",
          element: <SchoolList />,
          handle: { label: RouteNames.SchoolList },
        },
        {
          path: "/edit-school/:id",
          element: <SchoolRegistrationForm />,
          handle: { label: RouteNames.EditSchool },
        },
         {
          path: "/add-student",
          element: <StudentForm />,
          handle: { label: RouteNames.StudentRegistration },
        },
         {
          path: "/edit-school/:id",
          element: <StudentForm />,
          handle: { label: RouteNames.EditStudent },
        },

      ],
    },
  ],
  
);

createRoot(document.getElementById("root")!).render( 
<HelmetProvider>
   <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
  </HelmetProvider>
 );

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./constants/RouteNames.ts";
import Home from "./pages/Home.tsx";
import Introduction from "./components/Introduction.tsx";
import AshramSchools from "./components/AshramSchools.tsx";
import GovHostels from "./components/GovHostels.tsx";
import ProjectOfficerContact from "./components/ProjectOfficerContact.tsx";
import VikasYojana from "./components/VikasYojana.tsx";
import Gallery from "./components/Gallery.tsx";
import DownloadForm from "./components/DownloadForm.tsx";
import LabharthiList from "./components/LabharthiList.tsx";
import LoksevaHakka from "./components/LoksevaHakka.tsx";
import ContactUs from "./components/ContactUs.tsx";
import RightToInformation from "./components/RightToInformation.tsx";
import { HelmetProvider } from "react-helmet-async";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    handle: { label: RouteNames.Home },
    children: [
      { path: "/", element: <Home />, handle: { label: RouteNames.DashBoard } },
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
        path: "/govhostel",
        element: <GovHostels />,
        handle: { label: RouteNames.GovHostels },
      },
      // {
      //   path: "/aidedAshram",
      //   element: <AidedAshramSchool />,
      //   handle: { label: RouteNames.AidedAshram },
      // },
      {
        path: "/projectOfficerContact",
        element: <ProjectOfficerContact />,
        handle: { label: RouteNames.ProjectOfficerContact },
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
        path: "/downloadForm",
        element: <DownloadForm />,
        handle: { label: RouteNames.DownloadForm },
      },
      {
        path: "/labharthiList",
        element: <LabharthiList />,
        handle: { label: RouteNames.LabharthiList },
      },
      {
        path: "/loksevahakka",
        element: <LoksevaHakka />,
        handle: { label: RouteNames.LokSevaHakka },
      },
      {
        path: "/contactUs",
        element: <ContactUs />,
        handle: { label: RouteNames.ContactUs },
      },
      {
        path: "/rti",
        element: <RightToInformation />,
        handle: { label: RouteNames.RightToInformation },
      },
      // {
      //   path: "/innovation-challenge",
      //   element: <InnovationChallenge />,
      //   handle: { label: RouteNames.InnovationChallenge },
      //   children: [
      //     {
      //       path: "scope-of-work",
      //       element: <InnovationChallenge />,
      //       handle: { label: RouteNames.ScopeOfWork },
      //     },
      //   ],
      // },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <HelmetProvider>
    <RouterProvider router={router} />
  </HelmetProvider>
  // </StrictMode>
);

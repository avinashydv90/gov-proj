import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { RouteNames } from "./constants/RouteNames.ts";
import Home from "./pages/Home.tsx";
import Introduction from "./components/Introduction.tsx";
import AshramSchools from "./components/AshramSchools.tsx";
import GovHostels from "./components/GovHostels.tsx";
import AidedAshramSchool from "./components/AidedAshramSchool.tsx";
import ProjectOfficerContact from "./components/ProjectOfficerContact.tsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    handle: { label: RouteNames.Home },
    children: [
      { path: "/", element: <Home />, handle: { label: RouteNames.DashBoard } },
      {
        path: "/introduction",
        element: <Introduction />,
        handle: { label: RouteNames.Introduction },
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
      {
        path: "/aidedAshram",
        element: <AidedAshramSchool />,
        handle: { label: RouteNames.AidedAshram },
      },
      {
        path: "/projectOfficerContact",
        element: <ProjectOfficerContact />,
        handle: { label: RouteNames.ProjectOfficerContact },
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
  <RouterProvider router={router} />
  // </StrictMode>
);

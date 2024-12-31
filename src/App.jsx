import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import WorkSpace from "./Pages/WorkSpace";
import FolderSection from "./Pages/FolderSection";
import FormCreate from "./Pages/FormCreate";
import Settings from "./Pages/Settings";
import FormBot from "./Pages/FormBot";
import { ThemeProvider } from "./Contexts/ThemeProvider";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <LandingPage />
      </>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/workspace",
    element: <WorkSpace />,
  },
  {
    path: "/settings/:userId",
    element: <Settings />,
  },
  {
    path: "/workspace/:id",
    element: <FolderSection />,
  },
  {
    path: "/form-create/:folderid",
    element: <FormCreate />,
  },
  {
    path: "/form-create/workspace",
    element: <FormCreate />,
  },
  {
    path: "/form-get/:formid",
    element: <FormCreate />,
  },
  {
    path: "/form-bot/:formid",
    element: <FormBot />,
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
};

export default App;

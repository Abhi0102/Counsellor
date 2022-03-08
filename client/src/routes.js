import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      //   element: <Home />,
      children: [
        { path: "", element: <Navigate to="/home" replace /> },
        { path: "/home", element: <Home /> },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Signup />,
        },
      ],
    },
  ]);
}

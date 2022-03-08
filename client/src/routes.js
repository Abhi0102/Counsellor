import { useRoutes, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Signup from "./component/Signup";

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

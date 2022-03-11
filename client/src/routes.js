import { useRoutes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import PrivateRoute from "./utils/PrivateRoute";
import CounsellorDetail from "./components/CounsellorDetail";

export default function Router() {
  return useRoutes([
    {
      path: "/user",
      children: [
        { path: "", element: <Navigate to="/user/profile" replace /> },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
      ],
    },
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
        { path: "/counsellor/:id", element: <CounsellorDetail /> },
      ],
    },
  ]);
}

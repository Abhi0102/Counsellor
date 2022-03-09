import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute(props) {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.user);
  if (isLoggedIn) {
    return props.children;
  }

  return <Navigate to="/" state={{ from: location }} />;
}

export default PrivateRoute;

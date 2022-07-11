import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, redirectTo = "/login" }) {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}

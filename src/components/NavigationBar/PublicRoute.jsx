import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = "/contacts",
}) {
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;

  return shouldRedirect ? <Navigate to={redirectTo} /> : children;
}

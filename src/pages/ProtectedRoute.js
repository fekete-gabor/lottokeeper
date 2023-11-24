import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useMainContext } from "../context/main_context";

export const ProtectedRoute = ({
  redirectPath = "/select-player",
  children,
}) => {
  const { player } = useMainContext();

  if (!player.active) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

import { Navigate, Outlet, replace, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, loading  } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Hoặc component Loading tùy ý
  }
  console.log(auth);
  return ( 
    auth?.roles?.find((role) => allowedRoles?.includes(role)) 
    ? <Outlet />
    : auth?.username 
      ? <Navigate to="/unauthorized" state={{ from: location }} replace />
      : <Navigate to="/login" state={{ from: location }} replace />
  )
};

export default RequireAuth;

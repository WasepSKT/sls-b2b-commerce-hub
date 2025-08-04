import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/store/auth";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute = ({ children, allowedRoles = [] }: PrivateRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!user && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.role) {
          // No reload needed, useAuth already initializes from localStorage
        }
      } catch (e) {
        localStorage.removeItem('user');
      }
    }
  }, [user, allowedRoles]);

  if (!user) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user's role
    const roleRoutes: { [key: string]: string } = {
      admin: "/admin",
      principal: "/dashboard/principal",
      agent: "/dashboard/agent",
      customer: "/dashboard/customer",
      reseller: "/dashboard/reseller",
    };

    // Get the base route for the current role
    const baseRoute = roleRoutes[user.role] || "/";

    // Only redirect if we're not already on a path for the user's role
    if (!location.pathname.startsWith(baseRoute)) {
      return <Navigate to={baseRoute} replace />;
    }
  }

  return <>{children}</>;
}; 
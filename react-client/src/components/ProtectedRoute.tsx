import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { RootContext } from "../pages/Root";

const ProtectedRoute = () => {
  const context = useContext(RootContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!context?.user) {
      // Redirect to the login page if the user is not authenticated
      navigate("/login");
    }
  }, [context?.user, navigate]);

  // Render the protected content if the user is authenticated
  return context?.user ? <Outlet /> : null;
};

export default ProtectedRoute;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../constants/auth";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // Clear authentication tokens or user data here
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      await logout();

      // Redirect to login or home page
      navigate("/login", { replace: true });
    };
    performLogout();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

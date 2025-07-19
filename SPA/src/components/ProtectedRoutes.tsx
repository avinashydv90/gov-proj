import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface ProtectedRoutesProps {
  children: React.ReactNode;
  role?: "superadmin" | "user";
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({
  children,
  role,
}) => {
  const navigate = useNavigate();
  //const isAuthenticated = !!localStorage.getItem("token");
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const isAuthenticated = !!token; // ✅ compute once
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (role && userRole !== role) {
      alert("Unauthorized: Superadmin access only");
      navigate("/");
    }
  }, [isAuthenticated, userRole, role, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoutes;



// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// interface ProtectedRoutesProps {
//   children: React.ReactNode;
// }

// const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
//   const navigate = useNavigate();
//   const isAuthenticated = !!localStorage.getItem("token");

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate("/login");
//     }
//   }, [isAuthenticated, navigate]);

//   return isAuthenticated ? <>{children}</> : null;
// };

// export default ProtectedRoutes;
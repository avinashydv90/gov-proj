import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import TopbarAdminApp from "./components/TopbarAdminApp";

function AdminApp() {
  return (
    <div className="font-sans">
      <div className="absolute top-0 left-0 w-full z-20">
        <TopbarAdminApp />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminApp;

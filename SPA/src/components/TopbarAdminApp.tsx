import { useState, useEffect } from "react";
import logo1 from "../assets/adivasi-vikas-vibhag.png";
import logo2 from "../assets/shivrajyabhishek.png";
import logo3 from "../assets/nationalemblem.png";
import { NavLink } from "react-router-dom";

const TopbarAdminApp = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideLogo, setHideLogo] = useState(false);
  // const navigate = useNavigate();
  // const location = useLocation();

  // Check user role
  const userRole = localStorage.getItem("role");

  const menuItems = [
    {
      label: "शाळांची यादी",
      path: "/admin/school-list",
      userRole: "SuperAdmin",
    },
  { label: "शाळेचा प्रकार", path: "/admin/schooltype-list" },
  { label: "इयत्ता आणि विभाग", path: "/admin/standard-list" },
  { label: "कर्मचारी यादी", path: "/admin/staff-list" },
  { label: "कर्मचारी प्रकार", path: "/admin/employeetype-list" },
  { label: "स्टाफ प्रकार", path: "/admin/stafftype-list" },
  { label: "जात यादी", path: "/admin/castetype-list" },
  { label: "धर्म प्रकार", path: "/admin/religiontype-list" },
  { label: "कर्मचारी हजेरी", path: "/admin/add-staff-attendance" },
  { label: "कर्मचारी हजेरी यादी", path: "/admin/staff-attendance-list" },
  { label: "विद्यार्थी", path: "/admin/student-list" },
  { label: "हजेरी यादी", path: "/admin/attendance-list" },
  { label: "हजेरी",  path: "/admin/add-attendance" },
  { label: "लॉगआउट", path: "/logout" }
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.userRole || item.userRole === userRole
  );

  useEffect(() => {
    const handleScroll = () => {
      setHideLogo(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className={`transition-all duration-500 border-b border-gray-300 ${
          hideLogo ? "opacity-0 h-0 overflow-hidden" : "opacity-100 py-3"
        }`}
        style={{
          backgroundColor: "rgba(245, 245, 220, 0.6)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="flex flex-col items-center">
          <div className="flex gap-3 items-center">
            <img
              src={logo1}
              alt="adivasi-vikas-vibhag"
              className="w-[72px] h-[72px] object-contain"
            />
            <img
              src={logo2}
              alt="shivrajyabhishek"
              className="w-[72px] h-[72px] object-contain"
            />
            <img
              src={logo3}
              alt="nationalemblem"
              className="w-[72px] h-[72px] object-contain"
            />
          </div>
          <h1 className="text-[#5C4033] font-semibold text-xl mt-2 text-center">
            एकात्मिक आदिवासी विकास प्रकल्प, शहापुर
          </h1>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white/70 backdrop-blur-md border-b border-gray-300">
        <div className="flex items-center px-4 py-2" style={{ height: "55px" }}>
          {/* Desktop Nav */}
          <ul className="hidden md:flex m-auto font-semibold gap-4">
            {filteredMenuItems.map((item, index) => (
              <li key={index} className="cursor-pointer">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <ul className="md:hidden flex flex-col gap-3 px-6 py-4 font-medium bg-white">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopbarAdminApp;

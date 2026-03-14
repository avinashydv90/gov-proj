import "./index.css";
import React, { useEffect, useState } from "react";
import LeftImg from "../../assets/logo.jpg";
import PageLayout from "../../shared-components/PageLayout";
import { useLoginMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import logo1 from "../../assets/adivasi-vikas-vibhag.png";
import logo2 from "../../assets/shivrajyabhishek.png";
import logo3 from "../../assets/nationalemblem.png";
import AppSnackbar from "../alert/AppSnackbar";

interface ErrorResponse {
  status?: number;
  data?: {
    message?: string;
  };
}

const LoginForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  // const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [hideLogo, setHideLogo] = useState(false);

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

  useEffect(() => {
    const handleScroll = () => {
      setHideLogo(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // const toggleDropdown = () => setShowDropdown(!showDropdown);

  // const handleRoleSelect = (selectedRole: string) => {
  //   setRole(selectedRole);
  //   setShowDropdown(false);
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAlertType("error");
      setAlertMessage("वापरकर्तानाव आणि संकेतशब्द रिकामे असू शकत नाहीत.");
      return;
    }
    try {
      const data = await login({ email, password }).unwrap();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.email);
      localStorage.setItem("role", data.role);
      // सुधारित नेव्हिगेशन लॉजिक
  if (data.role === "SuperAdmin") {
    navigate("/admin/school-list");
  } else {
    // Teacher किंवा इतर रोलसाठी
    navigate("/admin/student-list");
  }
    } catch (error) {
      const err = error as Partial<ErrorResponse>;
      if (err?.status === 401) {
        setAlertType("error");
        setAlertMessage("अवैध वापरकर्तानाव किंवा संकेतशब्द.");    
      } else if (err?.status === 400) {
        setAlertType("error");
        setAlertMessage("चुकीची विनंती. कृपया आपली माहिती तपासा.");
      } else if (err?.status === 500) {
        setAlertType("error");
        setAlertMessage("सर्व्हर त्रुटी. कृपया नंतर पुन्हा प्रयत्न करा.");
      } else if (err?.data?.message) {
        setAlertType("error");
        setAlertMessage(err.data.message);
      } else {
        setAlertType("error");
        setAlertMessage("काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.");
      }
    }
  };

  return (
    <PageLayout>
      <AppSnackbar
        open={!!alertMessage}
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage(null)}
      />
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
        <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
          
          {/* Left Side: Logo */}
          <div className="md:w-1/3 lg:w-1/2 bg-white  rounded-xl p-6 flex justify-center items-center">
            <img
              src={LeftImg}
              alt="Logo"
              className="w-full min-w-[16rem] max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] h-auto rounded-xl"
            />
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-2/3 lg:w-1/2 bg-white  rounded-xl p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-center text-[#5C4033]">स्वागत आहे</h2>

              {/* Username */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold  text-[#5C4033] mb-1"
                >
                  ई-मेल :
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E3023]"
                  placeholder="Enter Email"
                  autoComplete="email"
                />
              </div>

              {/* Role */}
              {/* <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                भूमिका
              </label>
              <div className="relative inline-block w-full">
                <button
                  id="dropdownDefaultButton"
                  onClick={toggleDropdown}
                  type="button"
                  className="w-full text-white bg-[#5E3023] hover:bg-[#4a251a] focus:ring-4 focus:outline-none focus:ring-[#bb8e7d] font-medium rounded-lg text-sm px-5 py-2.5 text-left inline-flex items-center"
                >
                  {role ? role : "भूमिका निवडा"}
                  <svg
                    className="w-2.5 h-2.5 ml-auto"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l4 4 4-4"
                    />
                  </svg>
                </button>
                {showDropdown && (
                  <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-full mt-1">
                    <ul className="py-2 text-sm text-gray-700">
                      {roles.map((r) => (
                        <li key={r}>
                          <button
                            type="button"
                            onClick={() => handleRoleSelect(r)}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            {r}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div> */}

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#5C4033] mb-1"
                >
                  संकेतशब्द :
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E3023]"
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-center px-4 py-3 text-white font-semibold rounded-xl transition-colors duration-200 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                style={{ backgroundColor: "#5E3023" }}
              >
                {isLoading ? "लॉगिन होत आहे..." : "लॉगिन करा"}
              </button>

              {/* Register Link */}
              {/* <p className="text-sm mt-4 font-semibold text-center">
                अजून खाते नाहीये?{" "}
                <Link to="/register" className="text-red-500 hover:underline">
                  नोंदणी करा
                </Link>
              </p> */}
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </PageLayout>
  );
};

export default LoginForm;

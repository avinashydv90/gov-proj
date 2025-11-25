/* eslint-disable @typescript-eslint/no-explicit-any */
import "./index.css";
import React, { useEffect, useState } from "react";
import LeftImg from "../../assets/logo.jpg";
import PageLayout from "../../shared-components/PageLayout";
import { useRegisterMutation } from "../../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import Topbar from "../Topbar";
import Footer from "../Footer";
import AppSnackbar from "../alert/AppSnackbar";

interface ErrorResponse {
  status?: number;
  data?: {
    message?: string;
  };
}
const placeholderMap: { [key: string]: string } = {
  userName: "username",
  firstName: "first name",
  lastName: "last name",
  email: "email",
  password: "password",
  confirmPassword: "confirm password",
};

const RegisterForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const [register, { isLoading }] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

  const handleRoleSelect = (selectedRole: string) => {
    setUser((prevUser) => ({ ...prevUser, role: selectedRole }));
    setShowDropdown(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      userName,
      firstName,
      lastName,
      email,
      role,
      password,
      confirmPassword,
    } = user;

    if (
      !userName.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !role.trim() ||
      !password ||
      !confirmPassword
    ) {
      setAlertType("error");
      setAlertMessage("सर्व फील्ड आवश्यक आहेत.");
      return;
    }

    if (password !== confirmPassword) {
      setAlertType("error");
      setAlertMessage("संकेतशब्द जुळत नाहीत!");
      return;
    }

    try {
      await register({
        userName,
        firstName,
        lastName,
        email,
        role,
        password,
      }).unwrap();
      setAlertType("success");
      setAlertMessage("नोंदणी यशस्वी!");
      navigate("/login");
    } catch (error) {
      const err = error as Partial<ErrorResponse>;
      if (err.status === 400) {
        setAlertType("error");
        setAlertMessage("अवैध माहिती. कृपया तपासा.");
      } else if (err.status === 500) {
        setAlertType("error");
        setAlertMessage("सर्व्हर त्रुटी. कृपया नंतर प्रयत्न करा.");
      } else if (err.data?.message) {
        setAlertType("error");
        setAlertMessage(err.data.message);
      } else {
        setAlertType("error");
        setAlertMessage("नोंदणी अयशस्वी. कृपया पुन्हा प्रयत्न करा.");
      }
    }
  };

  return (
    <PageLayout>
      <Topbar />
     <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
        {/* Left Side: Logo */}
        <div className="md:w-1/3 lg:w-1/2 bg-white rounded-xl p-6 flex justify-center items-center">
          <img
            src={LeftImg}
            alt="Logo"
            className="w-full min-w-[16rem] max-w-[20rem] md:max-w-[24rem] lg:max-w-[28rem] h-auto rounded-xl"
          />
        </div>

        {/* Right Side: Register Form */}
        <div className="md:w-2/3 lg:w-1/2 bg-white rounded-xl p-6">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              नोंदणी करा
            </h2>

            {[
              // Input Fields
              { label: "वापरकर्तानाव", name: "userName", type: "text" },
              { label: "पहिले नाव", name: "firstName", type: "text" },
              { label: "आडनाव", name: "lastName", type: "text" },
              { label: "ई-मेल", name: "email", type: "email" },
              { label: "संकेतशब्द", name: "password", type: "password" },
              {
                label: "संकेतशब्द पुन्हा",
                name: "confirmPassword",
                type: "password",
              },
            ].map(({ label, name, type }) => {
              const isPasswordField =
                name === "password" || name === "confirmPassword";
              const show =
                name === "password" ? showPassword : showConfirmPassword;
              const setShow =
                name === "password" ? setShowPassword : setShowConfirmPassword;

              return (
                <div className="mb-4 relative" key={name}>
                  <label
                    htmlFor={name}
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    {label}
                  </label>
                  <input
                    type={isPasswordField ? (show ? "text" : "password") : type}
                    id={name}
                    name={name}
                    value={(user as any)[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#5E3023]"
                    placeholder={`Enter your ${placeholderMap[name]}`}
                  />
                  {isPasswordField && (
                    <button
                      type="button"
                      onClick={() => setShow((prev) => !prev)}
                      className="absolute top-9 right-3 text-gray-600 hover:text-black"
                      tabIndex={-1}
                    >
                      {/* {show ? <EyeOff size={18} /> : <Eye size={18} />} */}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Role Dropdown */}
            <div className="mb-4">
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
                  {user.role || "भूमिका निवडा"}
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
                  <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg  w-full mt-1">
                    <ul className="py-2 text-sm text-gray-700">
                      {["User", "Admin", "SuperAdmin"].map((r) => (
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
              {isLoading ? "नोंदणी चालू आहे..." : "नोंदणी करा"}
            </button>

            {/* Login Link */}
            <p className="text-sm mt-4 font-semibold text-center">
              आधीच खाते आहे?{" "}
              <Link to="/login" className="text-red-500 hover:underline">
                लॉगिन करा
              </Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default RegisterForm;

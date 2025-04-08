import React, { useState } from "react";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/emblem_transparent1.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Topbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuItems = [
    // "मुख्य पृष्ठ",
    // "आश्रमशाळा",
    // "वसतीगृह",
    // "विकास योजना",
    // "यशोगाथा",
    { label: "मुख्य पृष्ठ", path: "/" },
    { label: "आश्रमशाळा", path: "/ashramschool" },
    { label: "वसतीगृह", path: "./govhostel" },
    { label: "विकास योजना", path: "/vikasyojana" },
    { label: "यशोगाथा", path: "/gallery" },
    { label: "डाउनलोड फॉर्म ", path: "/downloadForm" },
    { label: "लाभार्थी यादी", path: "/labharthiList" },
    { label: "लोकसेवा हक्क", path: "/loksevahakka" },
    { label: "माहितीचा अधिकार अधिनियम", path: "/rti" },
    { label: "परिचय", path: "/introduction" },
    { label: "संपर्क", path: "/contactUs" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md border-b border-gray-300 z-50">
      <div className="flex justify-between items-center px-4 py-3">
        {/* Left section: Logos + text */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <div className="flex gap-1 items-center">
            <div className="w-px h-16 bg-white mx-2 shadow-md rounded" />
            <img
              src={logo1}
              alt="Logo 1"
              className="w-16 h-16 object-contain"
            />
            <div className="w-px h-16 bg-white mx-2 shadow-md rounded" />
            <img
              src={logo2}
              alt="Logo 2"
              className="w-16 h-16 object-contain"
            />
            <div className="w-px h-16 bg-white mx-2 shadow-md rounded" />
            <img
              src={logo3}
              alt="Logo 3"
              className="w-16 h-16 object-contain"
            />
            <div className="w-px h-16 bg-white mx-2 shadow-md rounded" />
          </div>
          <span className="text-gray-700 font-semibold text-2xl ">
            एकात्मिक आदिवासी विकास प्रकल्प, शहापुर
          </span>
        </div>

        {/* Navigation for desktop */}
        <ul className="hidden md:flex gap-6 text-primary font-medium ml-auto text-lg">
          {menuItems.map((item, index) => (
            <li key={index} className="cursor-pointer w-min">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold underline"
                    : "hover:underline"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-primary text-xl ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-4 text-primary font-medium">
            {menuItems.map((item, index) => (
              <li className="w-min" key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-semibold underline"
                      : "hover:underline"
                  }
                  onClick={() => setMenuOpen(false)} // close menu on click
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Topbar;

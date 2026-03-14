// import React, { useState, useEffect, useRef } from "react";
// import { User, LogOut, ExternalLink } from "lucide-react";
// import profilePhoto from "../assets/person.png";

// // Define a type for our User data
// interface UserData {
//   name: string;
//   email: string;
//   photoUrl?: string;
// }

// export default function UserAvatar() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const user: UserData = {
//     name: localStorage.getItem("userName") || "SuperAdmin",
//     email: localStorage.getItem("userEmail") || "superadmin@poitdp.shahapur-mh.in",
//     // Replace this string with your actual image source
//     photoUrl: profilePhoto,
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = (): void => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       {/* Trigger Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="focus:outline-none group relative p-1 rounded-full hover:bg-gray-100 transition-colors"
//         aria-expanded={isOpen}
//       >
//         <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm font-medium shadow-sm group-hover:shadow-md transition-all">
//           {user.name.charAt(0).toUpperCase()}
//         </div>
//       </button>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="absolute right-0 mt-3 w-80 bg-[#e9eef6] rounded-[28px] shadow-2xl border border-gray-200/50 z-50 overflow-hidden animate-in fade-in zoom-in duration-150">
          
//           {/* Top Profile Section */}
//           <div className="px-6 py-6 flex flex-col items-center">
//             <p className="text-xs font-medium text-gray-500 mb-4 tracking-wide ">
//               {user.email}
//             </p>
            
//             <div className="relative group">
//               <div className="w-20 h-20 flex items-center justify-center rounded-full bg-indigo-600 text-white text-3xl shadow-inner">
//                 {user.name.charAt(0).toUpperCase()}
//               </div>
//               <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm border border-gray-100">
//                 <User size={14} className="text-gray-600" />
//               </div>
//             </div>
            
//             <h2 className="text-xl text-gray-800 mt-3 font-normal">Hi, {user.name}!</h2>
            
//             {/* <button className="mt-5 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm">
//               Manage your Google Account
//             </button> */}
//           </div>

//           {/* Action List Section */}
//           <div className="bg-white mx-3 mb-3 rounded-[24px] overflow-hidden shadow-sm">
//             <MenuLink icon={<User size={18} />} label="View Profile" />
//             {/* <MenuLink icon={<Key size={18} />} label="Security Settings" /> */}
            
//             <div className="h-[1px] bg-gray-100 mx-4"></div>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center px-6 py-4 text-sm text-red-600 hover:bg-red-50 transition-colors"
//             >
//               <LogOut size={18} className="mr-4" />
//               <span className="font-medium">Sign out </span>
//             </button>
//           </div>
          
//           {/* Footer Text */}
//           <div className="flex justify-center pb-4 text-[11px] text-gray-500 gap-3">
//             <span className="hover:underline cursor-pointer">Privacy Policy</span>
//             <span>•</span>
//             <span className="hover:underline cursor-pointer">Terms of Service</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Sub-component for Menu Items to keep things DRY
// interface MenuLinkProps {
//   icon: React.ReactNode;
//   label: string;
// }

// function MenuLink({ icon, label }: MenuLinkProps) {
//   return (
//     <button className="w-full flex items-center px-6 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left group">
//       <span className="mr-4 text-gray-500 group-hover:text-blue-600 transition-colors">
//         {icon}
//       </span>
//       <span className="flex-1">{label}</span>
//       <ExternalLink size={14} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
//     </button>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import { User, LogOut } from "lucide-react";
// import profilePhoto from "../assets/person.png";

// interface UserData {
//   name: string;
//   email: string;
//   photoUrl?: string;
// }

// export default function UserAvatar() {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const user: UserData = {
//     name: localStorage.getItem("userName") || "SuperAdmin",
//     email:
//       localStorage.getItem("userEmail") ||
//       "superadmin@poitdp.shahapur-mh.in",
//     photoUrl: profilePhoto,
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () =>
//       document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
      
//       {/* Avatar Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="focus:outline-none"
//       >
//         {user.photoUrl ? (
//           <img
//             src={user.photoUrl}
//             alt={user.name}
//             className="w-9 h-9 rounded-full object-cover border border-gray-300 shadow-sm"
//           />
//         ) : (
//           <div className="w-9 h-9 flex items-center justify-center rounded-full bg-[#5C4033] text-white font-semibold">
//             {user.name.charAt(0).toUpperCase()}
//           </div>
//         )}
//       </button>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="absolute right-0 mt-3 w-72 bg-white rounded-sm shadow-sm border border-gray-200 z-50 overflow-hidden font-noto-serif-devanagari">
          
//           {/* Profile Section */}
//           <div className="px-6 py-6 flex flex-col items-center border-b">
            
//             <img
//               src={user.photoUrl}
//               alt={user.name}
//               className="w-20 h-20 rounded-full object-cover border shadow"
//             />

//             <h2 className="text-sm mt-3 font-semibold text-[#5C4033]">
//               {user.name}
//             </h2>

//             <p className="text-sm text-gray-500">{user.email}</p>
//           </div>

//           {/* Menu */}
//           <div className="py-2">

//             <button
//               className="w-full flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition"
//             >
//               <User size={18} className="mr-3 text-[#5C4033]" />
//               प्रोफाइल पहा
//             </button>

//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition"
//             >
//               <LogOut size={18} className="mr-3" />
//               साइन आउट
//             </button>

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import profilePhoto from "../assets/person.png";

interface UserData {
  name: string;
  email: string;
  photoUrl?: string;
}

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const user: UserData = {
    name: localStorage.getItem("userName") || "SuperAdmin",
    email: localStorage.getItem("userEmail") || "superadmin@poitdp.shahapur-mh.in",
    photoUrl: profilePhoto,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 "
      >
        <div className="relative">
          {user.photoUrl ? (
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm group-hover:border-[#5C4033]/30 transition-colors"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#5C4033] text-white font-bold shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
          {/* <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div> */}
        </div>
        <ChevronDown size={16} className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden font-noto-serif-devanagari"
          >
            {/* Header Section */}
            <div className="relative px-6 py-8 flex flex-col items-center bg-gradient-to-b from-[#5C4033]/5 to-transparent">
              <div className="relative">
                <img
                  src={user.photoUrl}
                  alt={user.name}
                  className="w-20 h-20 rounded-full  object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="text-center mt-4">
                <h2 className="text-base font-medium  text-gray-800 leading-tight">
                  {user.name}
                </h2>
                {/* <div className="flex items-center justify-center gap-1.5 mt-1 text-gray-500">
                  <Mail size={12} />
                  <p className="text-xs truncate max-w-[200px]">{user.email}</p>
                </div> */}
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                className="w-full flex items-center px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-[#5C4033]/5 hover:text-[#5C4033] transition-colors group"
              >
                <div className="p-2 rounded-md bg-gray-50 group-hover:bg-white mr-3 transition-colors">
                  <User size={18} className="text-[#5C4033]" />
                </div>
                <span className="font-medium">View Profile </span>
              </button>

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors group"
              >
                <div className="p-2 rounded-md bg-red-50 group-hover:bg-white mr-3 transition-colors">
                  <LogOut size={18} />
                </div>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
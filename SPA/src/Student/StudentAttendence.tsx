// // import React, { useState } from 'react';
// // import PageLayout from '../shared-components/PageLayout';
// // import ReactDatePicker, { registerLocale } from 'react-datepicker';
// // import 'react-datepicker/dist/react-datepicker.css';
// // import { hi } from 'date-fns/locale';
// // import '../Student/StudentAttendence.css';
// // import { skipToken } from '@reduxjs/toolkit/query';
// // import { useGetAllStandardsQuery } from '../services/standardApi';
// // import { useGetDivisionsByStandardIdQuery } from '../services/divisionApi';
// // import { useGetStudentByDivisionIdQuery } from '../services/studentApi';
// // import { useAddAttendanceMutation } from '../services/studentAttendenceApi';
// // import { Student } from '../components/types/student';
// // import { Division } from '../components/types/division';
// // import { Standard } from '../components/types/standard';
// // import { CreateStudentAttendance } from '../components/types/studentAttendence';
// // import { useGetAllSchoolsQuery } from '../services/schoolApi';
// // import { School } from '../components/types/School';

// // // Register the locale
// // registerLocale('hi', hi);

// // // Helper function to convert numbers to Marathi digits
// // const toMarathiDigits = (num: number): string => {
// //   const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
// //   return num.toString().split('').map(d => marathiDigits[parseInt(d)]).join('');
// // };

// // // Helper function to get ordinal in Marathi
// // const getOrdinal = (n: number): string => `${toMarathiDigits(n)} वी`;

// // const StudentAttendance: React.FC = () => {
// //   // State with proper typing
// //   const [attendance, setAttendance] = useState<Record<number, boolean>>({});
// //   const [standard, setStandard] = useState<string>('');
// //   const [division, setDivision] = useState<string>('');
// //   const [school, setSchool] = useState<string>('');
// //   const [date, setDate] = useState<Date | null>(null);

// //   // API queries with proper typing

// //   const { data: schools = [] } = useGetAllSchoolsQuery();

// //    // Fetch all standards
// //   const { data: allStandards = [] } = useGetAllStandardsQuery();

// //   // Filter standards based on selected school
// //   const standards = allStandards.filter(std => std.schoolId === school);

// //   // Fetch divisions for selected standard
// //   const { data: divisions = [], isSuccess: divisionsLoaded } =
// //     useGetDivisionsByStandardIdQuery(standard ? parseInt(standard) : skipToken);

// //   // Fetch students for selected division
// //   const { data: students = [] } =
// //     useGetStudentByDivisionIdQuery(division ? parseInt(division) : skipToken);

// //   const [submitAttendance] = useAddAttendanceMutation();

// //   const handleCheckboxChange = (studentId: number) => {
// //     setAttendance(prev => ({
// //       ...prev,
// //       [studentId]: !prev[studentId],
// //     }));
// //   };

// //   const handleSubmit = async () => {
// //     // Validate all required fields
// //     if (!date || !standard || !division || !school) {
// //       alert('कृपया सर्व फील्ड भरावेत.');
// //       return;
// //     }

// //     if (students.length === 0) {
// //       alert('हजेरी साठी विद्यार्थी उपलब्ध नाहीत.');
// //       return;
// //     }

// //     // Prepare payload with proper typing
// //     const payload: CreateStudentAttendance[] = students.map(student => ({
// //       studentId: student.id,
// //       divisionId: parseInt(division),
// //       date: date.toISOString(),
// //       isPresent: !!attendance[student.id],
// //     }));

// //     try {
// //       const response = await submitAttendance(payload).unwrap();
// //       if (response.success) {
// //         alert(response.message || 'हजेरी यशस्वीपणे सबमिट झाली!');
// //         // Reset attendance state after successful submission
// //         setAttendance({});
// //       } else {
// //         alert(response.message || 'हजेरी सबमिट करताना त्रुटी आली.');
// //       }
// //     } catch (error) {
// //       console.error('Attendance submission error:', error);
// //       alert('हजेरी सबमिट करताना त्रुटी आली.');
// //     }
// //   };

// //   return (
// //     <PageLayout>
// //       <div className="student-attendence-container px-6 py-4 max-w-6xl mx-auto">

// //         <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">विद्यार्थी हजेरी</h2>

// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
// //           {/* School Selection */}
// //           <div className="flex flex-col">
// //             <label htmlFor="school" className="text-md font-bold text-gray-700 mb-1">
// //               शाळा :
// //             </label>
// //             <select
// //               id="school"
// //               value={school}
// //               onChange={(e) => {
// //                 setSchool(e.target.value);
// //                 setStandard('');
// //                 setDivision('');
// //               }}
// //               className="px-3 py-2 border  text-gray-420 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="">शाळा निवडा</option>
// //               {schools.map((school: School) => (
// //                 <option key={school.id} value={school.id}>
// //                   {school.schoolName}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Standard Selection */}
// //           <div className="flex flex-col">
// //             <label htmlFor="standard" className="text-md font-bold text-gray-700 mb-1">
// //               इयत्ता:
// //             </label>
// //             <select
// //               id="standard"
// //               value={standard}
// //               onChange={(e) => {
// //                 setStandard(e.target.value);
// //                 setDivision('');
// //               }}
// //               disabled={!school}
// //               className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
// //             >
// //               <option value="">इयत्ता निवडा</option>
// //               {standards
// //                 .filter((std: Standard) => std.schoolId === school)
// //                 .map((std: Standard) => (
// //                   <option key={std.id} value={std.id}>
// //                     {getOrdinal(Number(std.std))}
// //                   </option>
// //                 ))}
// //             </select>
// //           </div>

// //           {/* Division Selection */}
// //           <div className="flex flex-col">
// //             <label htmlFor="division" className="text-md font-bold text-gray-700 mb-1">
// //               वर्ग :
// //             </label>
// //             <select
// //               id="division"
// //               value={division}
// //               onChange={(e) => setDivision(e.target.value)}
// //               disabled={!standard || !divisionsLoaded}
// //               className={`px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
// //                 !standard ? 'bg-gray-100 cursor-not-allowed' : ''
// //               }`}
// //             >
// //               <option value="">वर्ग निवडा</option>
// //               {divisions.map((div: Division) => (
// //                 <option key={div.id} value={div.id}>
// //                   {div.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Date Picker */}
// //           <div className="flex flex-col">
// //             <label htmlFor="attendance-date" className="text-md font-bold text-gray-700 mb-1">
// //               दिनांक :
// //             </label>
// //             <ReactDatePicker
// //               id="attendance-date"
// //               selected={date}
// //               onChange={(date) => setDate(date)}
// //               dateFormat="dd MMMM yyyy"
// //               locale="hi"
// //               placeholderText="दिनांक निवडा"
// //               maxDate={new Date()}
// //               className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
// //             />
// //           </div>
// //         </div>

// //         {/* Attendance Table */}
// //         <div className="overflow-x-auto mt-4">
// //           {students.length > 0 ? (
// //             <table className="min-w-full divide-y divide-gray-200 border rounded-md shadow-sm">
// //               <thead>
// //                 <tr>
// //                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">रोल नंबर</th>
// //                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">विद्यार्थीचे नाव</th>
// //                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">हजर</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="bg-white divide-y divide-gray-200">
// //                 {students.map((student: Student) => (
// //                   <tr key={student.id}>
// //                     <td className="px-4 py-2 text-center">{toMarathiDigits(student.id)}</td>
// //                     <td className="px-4 py-2">{student.name}</td>
// //                     <td className="px-4 py-2 text-center">
// //                       <input
// //                         type="checkbox"
// //                         checked={!!attendance[student.id]}
// //                         onChange={() => handleCheckboxChange(student.id)}
// //                         className="w-5 h-5 accent-green-600"
// //                       />
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           ) : division ? (
// //             <div className="text-center py-4 text-gray-500">
// //               या वर्गात कोणतेही विद्यार्थी नाहीत
// //             </div>
// //           ) : null}
// //         </div>

// //         {/* Submit Button */}
// //         <div className="mt-6 text-center">
// //           <button
// //             onClick={handleSubmit}
// //             disabled={students.length === 0 || !date}
// //             className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-base transition-colors ${
// //               students.length === 0 || !date ? 'opacity-50 cursor-not-allowed' : ''
// //             }`}
// //           >
// //             हजेरी सबमिट करा
// //           </button>
// //         </div>
// //       </div>
// //     </PageLayout>
// //   );
// // };

// // export default StudentAttendance;

// import React, { useState, useMemo } from "react";
// import PageLayout from "../shared-components/PageLayout";
// import ReactDatePicker, { registerLocale } from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { hi } from "date-fns/locale";
// import "../Student/StudentAttendence.css";
// import { skipToken } from "@reduxjs/toolkit/query";
// import { useGetAllSchoolsQuery } from "../services/schoolApi";
// // import { useGetAllStandardsQuery } from "../services/standardApi_old";
// import { useGetDivisionsByStandardIdQuery } from "../services/divisionApi";
// import { useGetStudentByDivisionIdQuery } from "../services/studentApi";
// import { useAddAttendanceMutation } from "../services/studentAttendenceApi";
// import { CreateStudentAttendance } from "../components/types/studentAttendence";
// import { School } from "../components/types/School";
// //import { Standard } from "../components/types/standard";
// import { Division } from "../components/types/division";
// import { Student } from "../components/types/student";
// import { useGetAllStandardsQuery } from "../services/standardApi";

// // Register the locale
// registerLocale("hi", hi);

// // Helper function to convert numbers to Marathi digits
// const toMarathiDigits = (num: number): string => {
//   const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
//   return num
//     .toString()
//     .split("")
//     .map((d) => marathiDigits[parseInt(d)])
//     .join("");
// };

// // Helper function to get ordinal in Marathi
// const getOrdinal = (n: number): string => `${toMarathiDigits(n)} वी`;

// const StudentAttendance: React.FC = () => {
//   // State with proper typing
//   const [attendance, setAttendance] = useState<Record<number, boolean>>({});
//   const [standard, setStandard] = useState<string>("");
//   const [division, setDivision] = useState<string>("");
//   const [school, setSchool] = useState<string>("");
//   const [date, setDate] = useState<Date | null>(null);

//   // API queries
//   const { data: schools = [], isLoading: schoolsLoading } =
//     useGetAllSchoolsQuery();
//   const { data: allStandards = [], isLoading: standardsLoading } =
//     useGetAllStandardsQuery();

//   // Filter standards based on selected school using useMemo
//   const standards = useMemo(() => {
//     if (!school) return [];
//     return allStandards.filter((std) => std.schoolId.toString() === school);
//   }, [school, allStandards]);

//   // Fetch divisions for selected standard
//   const { data: divisions = [], isSuccess: divisionsLoaded } =
//     useGetDivisionsByStandardIdQuery(standard ? parseInt(standard) : skipToken);

//   // Fetch students for selected division
//   const { data: students = [], isLoading: studentsLoading } =
//     useGetStudentByDivisionIdQuery(division ? parseInt(division) : skipToken);

//   const [submitAttendance, { isLoading: isSubmitting }] =
//     useAddAttendanceMutation();

//   const handleCheckboxChange = (studentId: number) => {
//     setAttendance((prev) => ({
//       ...prev,
//       [studentId]: !prev[studentId],
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!date || !standard || !division || !school) {
//       alert("कृपया सर्व फील्ड भरावेत.");
//       return;
//     }

//     if (students.length === 0) {
//       alert("हजेरी साठी विद्यार्थी उपलब्ध नाहीत.");
//       return;
//     }

//     const payload: CreateStudentAttendance[] = students.map((student) => ({
//       studentId: student.id,
//       divisionId: parseInt(division),
//       date: date.toISOString(),
//       isPresent: !!attendance[student.id],
//     }));

//     try {
//       //const response = await submitAttendance(payload).unwrap();
//       // if (response.success) {
//       //   alert(response.message || "हजेरी यशस्वीपणे सबमिट झाली!");
//       //   setAttendance({});
//       // } else {
//       //   alert(response.message || "हजेरी सबमिट करताना त्रुटी आली.");
//       // }
//     } catch (error) {
//       console.error("Attendance submission error:", error);
//       alert("हजेरी सबमिट करताना त्रुटी आली.");
//     }
//   };

//   return (
//     <PageLayout>
//       <div className="student-attendence-container px-6 py-4 max-w-6xl mx-auto">
//         <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">
//           विद्यार्थी हजेरी
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-4">
//           {/* School Selection */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="school"
//               className="text-md font-bold text-gray-700 mb-1"
//             >
//               शाळा :
//             </label>
//             <select
//               id="school"
//               value={school}
//               onChange={(e) => {
//                 setSchool(e.target.value);
//                 setStandard("");
//                 setDivision("");
//               }}
//               className="px-3 py-2 border text-gray-420 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               disabled={schoolsLoading}
//             >
//               <option value="">शाळा निवडा</option>
//               {schools.map((school: School) => (
//                 <option key={school.id} value={school.id.toString()}>
//                   {/* {school.schoolName} */}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Standard Selection
//           <div className="flex flex-col">
//             <label
//               htmlFor="standard"
//               className="text-md font-bold text-gray-700 mb-1"
//             >
//               इयत्ता:
//             </label>
//             <select
//               id="standard"
//               value={standard}
//               onChange={(e) => {
//                 setStandard(e.target.value);
//                 setDivision("");
//               }}
//               disabled={!school || standardsLoading}
//               className="px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">इयत्ता निवडा</option>
//               {standardsLoading ? (
//                 <option value="">लोड होत आहे...</option>
//               ) : (
//                 standards.map((std: Standard) => (
//                   <option key={std.id} value={std.id.toString()}>
//                     {getOrdinal(Number(std.std))}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div> */}

//           {/* Division Selection */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="division"
//               className="text-md font-bold text-gray-700 mb-1"
//             >
//               वर्ग :
//             </label>
//             <select
//               id="division"
//               value={division}
//               onChange={(e) => setDivision(e.target.value)}
//               disabled={!standard || !divisionsLoaded}
//               className={`px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
//                 !standard ? "bg-gray-100 cursor-not-allowed" : ""
//               }`}
//             >
//               <option value="">वर्ग निवडा</option>
//               {divisions.map((div: Division) => (
//                 <option key={div.id} value={div.id.toString()}>
//                   {div.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date Picker */}
//           <div className="flex flex-col">
//             <label
//               htmlFor="attendance-date"
//               className="text-md font-bold text-gray-700 mb-1"
//             >
//               दिनांक :
//             </label>
//             <ReactDatePicker
//               id="attendance-date"
//               selected={date}
//               onChange={(date) => setDate(date)}
//               dateFormat="dd MMMM yyyy"
//               locale="hi"
//               placeholderText="दिनांक निवडा"
//               maxDate={new Date()}
//               className="px-3 py-2 border rounded-md shadow-sm w-full focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         {/* Attendance Table */}
//         <div className="overflow-x-auto mt-4">
//           {studentsLoading ? (
//             <div className="text-center py-4 text-gray-500">लोड होत आहे...</div>
//           ) : students.length > 0 ? (
//             <table className="min-w-full divide-y divide-gray-200 border rounded-md shadow-sm">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">
//                     रोल नंबर
//                   </th>
//                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">
//                     विद्यार्थीचे नाव
//                   </th>
//                   <th className="px-4 py-2 text-center text-lg font-bold text-gray-700">
//                     हजर
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {students.map((student: Student) => (
//                   <tr key={student.id}>
//                     <td className="px-4 py-2 text-center">
//                       {toMarathiDigits(student.id || student.id)}
//                     </td>
//                     <td className="px-4 py-2">{student.name}</td>
//                     <td className="px-4 py-2 text-center">
//                       <input
//                         type="checkbox"
//                         checked={!!attendance[student.id]}
//                         onChange={() => handleCheckboxChange(student.id)}
//                         className="w-5 h-5 accent-green-600"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : division ? (
//             <div className="text-center py-4 text-gray-500">
//               या वर्गात कोणतेही विद्यार्थी नाहीत
//             </div>
//           ) : null}
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleSubmit}
//             disabled={students.length === 0 || !date || isSubmitting}
//             className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-base transition-colors ${
//               students.length === 0 || !date || isSubmitting
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""
//             }`}
//           >
//             {isSubmitting ? "सबमिट होत आहे..." : "हजेरी सबमिट करा"}
//           </button>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default StudentAttendance;

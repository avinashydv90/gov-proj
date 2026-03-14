import {   useEffect, useState } from "react";
import { useGetAllStandardsQuery } from "../../services/standardApi";
import { useGetDivisionsByStandardIdQuery } from "../../services/divisionApi";
import { useDownloadAttendancePdfMutation, useGetAttendanceByStandardDivisionAndDateQuery } from "../../services/studentAttendenceApi";
import { skipToken } from "@reduxjs/toolkit/query/react";
import PageLayout from "../../shared-components/PageLayout";
import "../StudentAttendance/globals.css";
import { StudentAttendanceReportDto } from "../types/studentAttendence";
import { useGetAllSchoolsQuery, useGetSchoolByIdQuery } from "../../services/schoolApi";
import { getSchoolIdFromToken } from "../../constants/authUtils";
import { getRoleFromToken } from "../../constants/roleUtils";

const AttendanceList: React.FC = () => {

   const [selectedStandard, setSelectedStandard] = useState<string>("");
   const [selectedDivision, setSelectedDivision] = useState<string>("");
   const [selectedSchool, setSelectedSchool] = useState("");
   const [selectedDate, setSelectedDate] = useState<string>(
       new Date().toISOString().split("T")[0]
     );
   
   const decodedSchoolId = getSchoolIdFromToken();
   const role = getRoleFromToken();
   const { data: school, isLoading: isSchoolsLoading } = useGetSchoolByIdQuery(decodedSchoolId); 

   const [downloadAttendancePdf, { isLoading: isPdfLoading }] = useDownloadAttendancePdfMutation();
   const { data: schoolsData } = useGetAllSchoolsQuery();
   const { data: standards, isLoading: isStandardsLoading } = useGetAllStandardsQuery();
const { data: divisions, isLoading: isDivisionsLoading } =
  useGetDivisionsByStandardIdQuery(
    selectedStandard ? selectedStandard : skipToken
  );

   const { data: students = [], isLoading: isStudentsLoading } =
    useGetAttendanceByStandardDivisionAndDateQuery(
      selectedStandard && selectedDivision
        ? {
            standardId: selectedStandard,
            divisionId: selectedDivision,
            date: selectedDate,
          }
        : skipToken
        
    );

  const filteredStandards = selectedSchool
  ? standards?.filter((s) => String(s.schoolId) === String(selectedSchool))
  : [];

useEffect(() => {
  if (role !== "SuperAdmin" && school?.id) {
    setSelectedSchool(school.id);
  }
}, [school, role]);

   const handleStandardChange = (value: string) => {
      setSelectedStandard(value);
      setSelectedDivision(""); 
   };
   const handleSchoolChange = (value: string) => {
      setSelectedSchool(value);
      setSelectedStandard("");
      setSelectedDivision("");
  
   };

const handleDownloadPDF = async () => {
  const reportData: StudentAttendanceReportDto[] = students.map((s, index) => ({
    srNo: index + 1,
    fullName: s.fullName,
    standard: standards?.find(st => st.id === s.standardId)?.name || "-",
    division: divisions?.find(d => d.id === s.divisionId)?.name || "-",
    date: selectedDate,
    schoolId: selectedSchool,
    isPresent: s.isPresent,
  }));
 const schoolName = schoolsData?.find(sch => String(sch.id) === String(selectedSchool))?.name || "-";

  try {
     await downloadAttendancePdf({
      schoolName,
      students: reportData,
    });
  } catch (error) {
    console.error("Failed to download PDF", error);
  }
};

  if (isStandardsLoading || isDivisionsLoading || isStudentsLoading || isSchoolsLoading) {
    return <PageLayout><p className="text-center mt-20">Loading...</p></PageLayout>;
  }

  return (
   <PageLayout>
   <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
         <h2 className="text-2xl font-semibold mb-6 text-center font-noto-serif-devanagari text-[#5C4033]">
            विद्यार्थ्यांची हजेरी यादी
         </h2>
         {/* Dropdowns and Date Picker */}
         <div className="flex gap-4 mb-6">
            <select
  value={selectedSchool}
  onChange={(e) => handleSchoolChange(e.target.value)}
  className="custom-select-left-arrow border p-2 font-sm rounded w-1/2 text-gray-700 font-noto-serif-devanagari"
>
<option value="">-- शाळा निवडा --</option>
 {(role === "SuperAdmin"
    ? schoolsData
    : school
    ? [school]
    : []
  )?.map((s) => (
    <option key={s.id} value={s.id}>
      {s.name}
    </option>
  ))}
</select>
            <select
               value={selectedStandard}
               onChange={(e) =>
               handleStandardChange(e.target.value)}
               className="custom-select-left-arrow border p-2 font-sm rounded w-1/3 text-gray-700 font-noto-serif-devanagari"
               >
               <option value="">--इयत्ता निवडा--</option>
               {filteredStandards?.map((s) => (
               <option key={s.id} value={s.id}>
               {s.name}
                </option>
    ))}
            </select>
            <select
               value={selectedDivision}
               onChange={(e) =>
               setSelectedDivision(e.target.value)}
               disabled={!selectedStandard}
               className="custom-select-left-arrow border p-2 rounded w-1/3 font-sm text-gray-700 font-noto-serif-devanagari"
               >
               <option value="">-- विभाग निवडा --</option>
               {divisions?.map((d) => (
               <option key={d.id} value={d.id}>
                  {d.name}
               </option>
               ))}
            </select>
            <input
               type="date"
               value={selectedDate}
               onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="custom-select-left-arrow border font-sm p-2 rounded w-1/3 text-gray-700 font-noto-serif-devanagari"
            />
         </div>
         {selectedStandard && selectedDivision ? (
         students.length > 0 ? (
         <div className="overflow-x-auto">
            <div id="attendance-table" className="pdf-friendly">
               <table className="w-full border-collapse rounded-md shadow-sm">
                  <thead className="bg-blue-100 text-gray-700">
                     <tr>
                        <th className="border p-3 text-center">क्र. नं.</th>
                        <th className="border p-3 text-left">विद्यार्थ्याचे नाव</th>
                        <th className="border p-3 text-center">इयत्ता</th>
                        <th className="border p-3 text-center">विभाग</th>
                        <th className="border p-3 text-center">उपस्थित / अनुपस्थित</th>
                     </tr>
                  </thead>
                  <tbody className="bg-white">
                     {students.map((s, index) => (
                     <tr key={s.studentId} className="hover:bg-gray-50">
                        <td className="border p-3 text-center">{index + 1}</td>
                        <td className="border p-3">{s.fullName}</td>
                        <td className="border p-3 text-center">
                           {standards?.find(st => st.id === s.standardId)?.name || "-"}
                        </td>
                        <td className="border p-3 text-center">
                           {divisions?.find(d => d.id === s.divisionId)?.name || "-"}
                        </td>
                        <td
                        className={`border p-3 text-center font-semibold ${
                        s.isPresent ? "text-green-600" : "text-red-500"
                        }`}
                        >
                        {s.isPresent ? "Present" : "Absent"}
                        </td>
                     </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {/* Buttons at the bottom of table */}
            <div className="flex justify-end gap-4 mt-4">
               <button
               onClick={handleDownloadPDF}
               disabled={!students || students.length === 0}
               className="px-6 py-2 border border-[#5C4033]-700 text-[#5C4033]
                rounded-md shadow-md font-bold  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
               >
               {isPdfLoading ? "Generating PDF..." : "Download PDF"}
               </button>
            </div>
         </div>
         ) : (
         <p className="text-red-600 text-lg font-bold text-center">
            विद्यार्थी उपलब्ध नाहीत
         </p>
         )
         ) : (
         <p className="text-yellow-600 text-lg font-bold text-center">
            कृपया इयत्ता व विभाग निवडा
         </p>
         )}
      </div>
   </div>
</PageLayout>
)};

export default AttendanceList;
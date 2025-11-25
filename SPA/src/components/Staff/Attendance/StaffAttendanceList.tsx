import { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import 'react-confirm-alert/src/react-confirm-alert.css';  
import { useGetAllSchoolsQuery } from "../../../services/schoolApi";
import PageLayout from "../../../shared-components/PageLayout";
import { StaffAttendance, StaffAttendanceReportDto } from "../../types/IStaffAttendance";
import {  useDownloadStaffAttendancePdfMutation, useGetStaffAttendanceBySchoolIdAndDateQuery } from "../../../services/staffAttendanceApi";
import AppSnackbar from "../../alert/AppSnackbar";

const StaffAttendanceList: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data: schools, isLoading: isSchoolsLoading } = useGetAllSchoolsQuery();
  const { data: staffData = [], isLoading: isStaffLoading } =
    useGetStaffAttendanceBySchoolIdAndDateQuery(
      selectedSchool
        ? { schoolId: selectedSchool, date: selectedDate }
        : skipToken
    );

  const [staff, setStaff] = useState(staffData);
  const [downloadStaffAttendancePdf, { isLoading: isPdfLoading }] =
    useDownloadStaffAttendancePdfMutation();

    useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

  useEffect(() => {
    if (staffData && staffData.length > 0) {
      setStaff(staffData);
    }
  }, [staffData]);

//  const downloadCSV = () => {
//   if (!staff || staff.length === 0) return;

//   const header = ["क्र. नं.", "कर्मचाऱ्याचे नाव", "शाळा", "उपस्थित / अनुपस्थित"];

//   const rows = staff.map((s: StaffAttendance, index: number) => [
//     index + 1,
//     `"${s.fullName}"`,
//     `"${schools?.find(sc => sc.id === s.schoolId)?.name || "-"}"`,
//     `"${s.date}"`,
//     s.isPresent ? "उपस्थित" : "अनुपस्थित"
//   ]);

//   const csvContent =
//     "data:text/csv;charset=utf-8," +
//     [header, ...rows].map((e) => e.join(",")).join("\n");

//   const encodedUri = encodeURI(csvContent);
//   const link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", `staff_attendance_${selectedDate}.csv`);
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

const handleDownloadPDF = async () => {
  const reportData: StaffAttendanceReportDto[] = staff.map(
    (s: StaffAttendance, index: number) => ({
      srNo: index + 1,
      fullName: s.fullName,
      date:selectedDate,
      schoolId:selectedSchool,
      isPresent: s.isPresent,
    })
  );

  try {
    await downloadStaffAttendancePdf(reportData).unwrap();
  } catch (error) {
    setAlertType("error");
    setAlertMessage("Failed to download PDF." + (error as any).message);
    
  }
};



  if (isSchoolsLoading || isStaffLoading) {
    return (
      <PageLayout>
        <p className="text-center mt-20">लोड करत आहे...</p>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center font-noto-serif-devanagari text-[#5C4033]">
            कर्मचाऱ्यांची हजेरी यादी
          </h2>
          <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />

          {/* Dropdown and Date Picker */}
          <div className="flex gap-4 mb-6 justify-center">
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="custom-select-left-arrow border p-2 font-sm rounded w-1/4 text-gray-700 font-noto-serif-devanagari"
            >
              <option value="">शाळा निवडा</option>
              {schools?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="custom-select-left-arrow border font-sm p-2 rounded w-1/4 text-gray-700 font-noto-serif-devanagari"
            />
          </div>

          {selectedSchool ? (
            staff.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-md shadow-sm">
                  <thead className="bg-blue-100 text-gray-700">
                    <tr>
                      <th className="border p-3 text-center">क्र. नं.</th>
                      <th className="border p-3 text-left">कर्मचाऱ्याचे नाव</th>
                      <th className="border p-3 text-center">शाळा</th>
                      <th className="border p-3 text-center">उपस्थित / अनुपस्थित</th>
                    </tr>
                  </thead>
                 <tbody className="bg-white">
  {staff.map((s, index) => {
    const schoolName = schools?.find(sc => sc.id === s.schoolId)?.name || "-";
    // const statusText = s.isPresent ? "उपस्थित" : "अनुपस्थित";
    const statusText = s.isPresent ? "Present" : "Absent";
    const statusClass = s.isPresent ? "text-green-600" : "text-red-500";

    return (
      <tr key={index} className="hover:bg-gray-50">
        <td className="border p-3 text-center">{index + 1}</td>
        <td className="border p-3">{s.fullName}</td>
        <td className="border p-3 text-center">{schoolName}</td>
        <td className={`border p-3 text-center font-semibold ${statusClass}`}>
          {statusText}
        </td>
      </tr>
    );
  })}
</tbody>

                </table>

                {/* Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                  {/* <button
                    onClick={downloadCSV}
                    disabled={!staff || staff.length === 0}
                    className="px-6 py-2 border border-[#5C4033] text-[#5C4033] rounded-md shadow-md font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Download CSV
                  </button> */}
                  <button
                    onClick={handleDownloadPDF}
                    disabled={!staff || staff.length === 0}
                    className="px-6 py-2 border border-[#5C4033] text-[#5C4033] rounded-md shadow-md font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPdfLoading ? "Generating PDF..." : "Download PDF"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-red-600 text-lg font-bold text-center">
                कर्मचारी उपलब्ध नाहीत
              </p>
            )
          ) : (
            <p className="text-yellow-600 text-lg font-bold text-center">
              कृपया शाळा निवडा
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffAttendanceList;

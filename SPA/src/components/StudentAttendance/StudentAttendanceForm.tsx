import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";
import {
  useGetAttendanceByStandardDivisionAndDateQuery,
  useSaveAttendanceMutation,
} from "../../services/studentAttendenceApi";
import {  useGetStandardsBySchoolIdQuery } from "../../services/standardApi";
import { useGetDivisionsByStandardIdQuery } from "../../services/divisionApi";
import PageLayout from "../../shared-components/PageLayout";
import "../StudentAttendance/globals.css";
import AppSnackbar from "../alert/AppSnackbar";
import {  useGetAllSchoolsQuery, useGetSchoolByIdQuery } from "../../services/schoolApi";
import { getSchoolIdFromToken } from "../../constants/authUtils";
import { getRoleFromToken } from "../../constants/roleUtils";

const StudentAttendanceForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");

  const [selectedStandard, setSelectedStandard] = useState<string>("");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const decodedSchoolId = getSchoolIdFromToken();
  const role = getRoleFromToken();
  const { data: school} = useGetSchoolByIdQuery(decodedSchoolId);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectAll, setSelectAll] = useState(false);
  const { data: schoolsData } = useGetAllSchoolsQuery();
  const { data: standards } = useGetStandardsBySchoolIdQuery(
    selectedSchool ? selectedSchool : skipToken
  );
  const { data: divisions } = useGetDivisionsByStandardIdQuery(
    selectedStandard ? selectedStandard : skipToken
    
  );

  const { data: studentsData = [], isLoading, refetch } =
    useGetAttendanceByStandardDivisionAndDateQuery(
      selectedStandard && selectedDivision
        ? { standardId: selectedStandard, divisionId: selectedDivision, date: selectedDate }
        : skipToken, { refetchOnMountOrArgChange: true }
    );

  const [students, setStudents] = useState(studentsData);
  const [saveAttendance, { isLoading: saving }] = useSaveAttendanceMutation();

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

  useEffect(() => {
    setStudents(studentsData);
  }, [studentsData]);


useEffect(() => {
  if (role !== "SuperAdmin" && school?.id) {
    setSelectedSchool(school.id);
  }
}, [school, role]);
 
  useEffect(() => {
    setSelectAll(students.length > 0 && students.every((s) => s.isPresent));
  }, [students]);

  const handleStandardChange = (value: string) => {
    setSelectedStandard(value);
    setSelectedDivision(""); 
  };
const handleSchoolChange = (value: string) => {
  setSelectedSchool(value);
  setSelectedStandard("");
  setSelectedDivision("");
  setStudents([]);
};

  const handleCheckboxChange = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, isPresent: !s.isPresent } : s))
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setStudents((prev) => prev.map((s) => ({ ...s, isPresent: checked })));
  };

  const handleSave = async () => {
    if (!students || students.length === 0) return;

    const payload = students.map((s) => ({
      ...s,
      standardId: selectedStandard,
      divisionId: selectedDivision,
      date: new Date(selectedDate).toISOString(),
    }));

    try {
      await saveAttendance(payload).unwrap();
      setAlertType("success");
      setAlertMessage("उपस्थिती यशस्वीरित्या सादर केली.");
      refetch();
    } catch (err) {
      setAlertType("error");
      setAlertMessage("उपस्थिती सादर करण्यात अयशस्वी."+ (err as any).message);
    }
  };

  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center font-noto-serif-devanagari text-[#5C4033]">
            विद्यार्थी हजेरी
          </h2>
          <AppSnackbar
          open={!!alertMessage}
           message={alertMessage}
          type={alertType}
          onClose={() => setAlertMessage(null)}
           />

          {/* Dropdowns and Date Picker */}
          <div className="flex gap-4 mb-6">
            <select 
            value={selectedSchool}
           onChange={(e) => handleSchoolChange(e.target.value)}
            className="custom-select-left-arrow border p-2 font-sm rounded w-1/2 text-gray-700 font-noto-serif-devanagari">
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
              onChange={(e) => handleStandardChange(e.target.value)}
              className="custom-select-left-arrow border p-2 font-sm rounded w-1/3 text-gray-700 font-noto-serif-devanagari"
            >
              <option value="">-- इयत्ता निवडा --</option>
              {standards?.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
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

          {/* Select All */}
          {students.length > 0 && (
            <div className="flex items-center gap-2 mb-4 justify-end">
              <label className="text-gray-700 font-bold font-noto-serif-devanagari">
                सर्व निवडा
              </label>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-400"
              />
            </div>
          )}

          {/* Student List */}
          {isLoading ? (
            <p className="text-gray-600">विद्यार्थी लोड करत आहे...</p>
          ) : students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-md shadow-sm">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="border p-3 font-noto-serif-devanagari text-left">
                      विद्यार्थ्याचे नाव
                    </th>
                    <th className="border p-3 font-noto-serif-devanagari text-center">
                      उपस्थित आहे का
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {students.map((s) => (
                    <tr key={s.studentId} className="hover:bg-gray-50">
                      <td className="border p-3">{s.fullName}</td>
                      <td className="border p-3 text-center">
                        <input
                          type="checkbox"
                          checked={s.isPresent}
                          onChange={() => handleCheckboxChange(s.studentId)}
                          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-400"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-yellow-600 text-lg font-bold text-center">या विभागातील कोणतेही विद्यार्थी आढळले नाहीत.</p>
          )}

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSave}
              disabled={saving || !students || students.length === 0}
              className="px-6 py-2 border border-transparent rounded-md shadow-md text-lg font-md text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "जतन करत आहे..." : "उपस्थिती सादर करा"}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentAttendanceForm;

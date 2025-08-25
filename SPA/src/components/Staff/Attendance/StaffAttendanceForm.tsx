import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query/react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetAllSchoolsQuery } from "../../../services/schoolApi";
import { useGetStaffAttendanceBySchoolIdAndDateQuery, useSaveStaffAttendanceMutation } from "../../../services/staffAttendanceApi";
import PageLayout from "../../../shared-components/PageLayout";
import { StaffAttendance } from "../../types/IStaffAttendance";

const StaffAttendanceForm: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectAll, setSelectAll] = useState(false);

  const { data: schools } = useGetAllSchoolsQuery();

  const { data: staffData = [], isLoading, refetch } =
    useGetStaffAttendanceBySchoolIdAndDateQuery(
      selectedSchool
        ? { schoolId: selectedSchool, date: selectedDate }
        : skipToken
    );

  const [staffList, setStaffList] = useState(staffData);
  const [saveStaffAttendance, { isLoading: saving }] = useSaveStaffAttendanceMutation();

  // Sync staff list with query data
 useEffect(() => {
  setStaffList(staffData || []);
}, [staffData]);

  // Sync selectAll with staff
  useEffect(() => {
    setSelectAll(staffList.length > 0 && staffList.every((s) => s.isPresent));
  }, [staffList]);

  const handleCheckboxChange = (staffId: string) => {
    setStaffList((prev) =>
      prev.map((s) => (s.staffId === staffId ? { ...s, isPresent: !s.isPresent } : s))
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    setStaffList((prev) => prev.map((s) => ({ ...s, isPresent: checked })));
  };

  const handleSave = async () => {
    if (!staffList || staffList.length === 0) return;
const payload: StaffAttendance[] = staffList.map((s) => ({
  staffId: s.staffId,
  fullName: s.fullName ?? "",  // optional if you have it
  schoolId: selectedSchool,
  date:selectedDate,
  isPresent: s.isPresent,

}));
    try {
      await saveStaffAttendance(payload).unwrap();
      toast.success("कर्मचारी उपस्थिती यशस्वीरीत्या सादर केली गेली!");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("कर्मचारी उपस्थिती सादर करण्यात अयशस्वी.");
    }
  };

  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl h-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center font-noto-serif-devanagari text-[#5C4033]">
            कर्मचारी उपस्थिती
          </h2>
          <ToastContainer position="top-right" autoClose={3000} />

          {/* School Dropdown and Date Picker */}
          <div className="flex gap-4 mb-6 justify-center">
            <select
              value={selectedSchool}
              onChange={(e) => setSelectedSchool(e.target.value)}
              className="custom-select-left-arrow border p-2 rounded w-1/4 text-gray-700 font-noto-serif-devanagari"
            >
              <option value="">शाळा निवडा</option>
              {schools?.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="custom-select-left-arrow border p-2 rounded w-1/4 text-gray-700 font-noto-serif-devanagari"
            />
          </div>

          {/* Select All */}
          {staffList.length > 0 && (
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

          {/* Staff List */}
          {isLoading ? (
            <p className="text-gray-600">कर्मचारी लोड करत आहे...</p>
          ) : staffList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-md shadow-sm">
                <thead className="bg-blue-100 text-gray-700">
                  <tr>
                    <th className="border p-3 font-noto-serif-devanagari text-left">
                      कर्मचारी नाव
                    </th>
                    <th className="border p-3 font-noto-serif-devanagari text-center">
                      उपस्थित आहे का
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
  {staffList.map((s) => (
    <tr key={s.staffId} className="hover:bg-gray-50">
      <td className="border p-3">{s.fullName}</td>
      <td className="border p-3 text-center">
        <input
          type="checkbox"
          checked={s.isPresent}
          onChange={() => handleCheckboxChange(s.staffId)}
          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-400"
        />
      </td>
    </tr>
  ))}
</tbody>

              </table>
            </div>
          ) : (
            <p className="text-yellow-600 text-lg font-bold text-center">
              कोणतेही कर्मचारी आढळले नाहीत.
            </p>
          )}

          {/* Save Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSave}
              disabled={saving || !selectedSchool || staffList.length === 0}
              className="px-6 py-2 border border-transparent rounded-md shadow-md text-lg text-white bg-[#5C4033]
               hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 
               disabled:cursor-not-allowed"
            >
              {saving ? "जतन करत आहे..." : "उपस्थिती सादर करा"}
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffAttendanceForm;

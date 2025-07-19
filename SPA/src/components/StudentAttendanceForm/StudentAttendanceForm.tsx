import React, { useState } from "react";
import PageLayout from "../../shared-components/PageLayout";
import { useGetAllStandardsQuery } from "../../services/standardApi";
import { useGetDivisionsByStandardIdQuery } from "../../services/divisionApi";

import { toast } from "react-toastify";
import { useGetStudentByDivisionIdQuery } from "../../services/studentApi";
import { useAddAttendanceMutation } from "../../services/studentAttendenceApi";

const StudentAttendanceForm: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<number>(0);
  const [selectedDivision, setSelectedDivision] = useState<number>(0);
  const [attendanceData, setAttendanceData] = useState<{
    [key: number]: boolean;
  }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const { data: standards = [] } = useGetAllStandardsQuery();
  const { data: divisions = [] } = useGetDivisionsByStandardIdQuery(
    selectedStandard,
    {
      skip: !selectedStandard,
    }
  );
  const { data: students = [] } = useGetStudentByDivisionIdQuery(
    selectedDivision,
    {
      skip: !selectedDivision,
    }
  );
  const [addAttendance, { isLoading }] = useAddAttendanceMutation();

  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: isPresent }));
  };

  const handleSubmit = async () => {
    if (!selectedDivision || !selectedDate) {
      toast.error("Please select division and date");
      return;
    }

    try {
      for (const student of students) {
        const payload = {
          studentId: student.id,
          divisionId: selectedDivision,
          date: selectedDate,
          isPresent: attendanceData[student.id] ?? false,
        };
        await addAttendance(payload).unwrap();
      }
      toast.success("Attendance submitted successfully");
      setAttendanceData({});
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit attendance");
    }
  };

  return (
    <PageLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#5C4033] mb-4 text-center">
          विद्यार्थ्यांची उपस्थिती नोंदणी फॉर्म
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold text-[#5C4033]">
              इयत्ता *
            </label>
            <select
              className="w-full border rounded p-2"
              value={selectedStandard}
              onChange={(e) => {
                setSelectedStandard(Number(e.target.value));
                setSelectedDivision(0);
                setAttendanceData({});
              }}
            >
              <option value={0}>इयत्ता निवडा</option>
              {standards.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.std}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#5C4033]">
              विभाग *
            </label>
            <select
              className="w-full border rounded p-2"
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(Number(e.target.value));
                setAttendanceData({});
              }}
              disabled={!selectedStandard}
            >
              <option value={0}>विभाग निवडा</option>
              {divisions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-[#5C4033]">
              तारीख *
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded p-2"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {students.length > 0 && (
          <div className="overflow-auto border rounded-lg">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">नाव</th>
                  <th className="border px-4 py-2">उपस्थित आहे का?</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td className="border px-4 py-2 text-center">
                      {student.id}
                    </td>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={attendanceData[student.id] ?? false}
                        onChange={(e) =>
                          handleAttendanceChange(student.id, e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !selectedDivision || students.length === 0}
            className="w-full py-2 px-4 rounded-md text-lg font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328]"
          >
            {isLoading ? "सबमिट करत आहे..." : "उपस्थिती सबमिट करा"}
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentAttendanceForm;

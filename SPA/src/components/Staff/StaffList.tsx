import { useNavigate } from "react-router-dom";
import PageLayout from "../../shared-components/PageLayout";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useDeleteStaffMutation,
  useGetAllStaffQuery,
  useGetStaffBySchoolIdQuery,
} from "../../services/StaffService/staffApi";
import { useGetAllSchoolsQuery, useGetSchoolByIdQuery } from "../../services/schoolApi";
import { useGetAllEmployeeTypeQuery } from "../../services/StaffService/employeeTypeApi";
import { useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import { useGetAllReligionTypesQuery } from "../../services/StaffService/religionTypeApi";
import { useGetAllStaffTypesQuery } from "../../services/StaffService/staffTypeApi";
import { getNameById } from "../types/utility";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useState } from "react";
import { ISchool } from "../types/School";
import Filter from "../FilterComponent/Filter";
import { confirmAlert } from 'react-confirm-alert';
import "../../constants/confirm-custom.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import AppSnackbar from "../alert/AppSnackbar";
import { getSchoolIdFromToken } from "../../constants/authUtils";
import toMarathiNumber from "../../constants/toMarathiNumber";
import { getRoleFromToken } from "../../constants/roleUtils";

export const StaffList: React.FC = () => {
  const decodedSchoolId = getSchoolIdFromToken();
  const role = getRoleFromToken();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const navigate = useNavigate();
  const [selectedSchool, setSelectedSchool] = useState<ISchool | null>(null);
  const { data: staffs, isLoading } = useGetStaffBySchoolIdQuery(
  role === "SuperAdmin" ? skipToken : decodedSchoolId
);

const { data: allStaff } =
  useGetAllStaffQuery(undefined, { skip: role !== "SuperAdmin" });
 const staffList = role === "SuperAdmin" ? allStaff ?? [] : staffs ?? [];

  const filteredStaff =
  role === "SuperAdmin"
    ? staffList?.filter(
        (s) => selectedSchool && String(s.schoolId) === String(selectedSchool.id)
      )
    : staffList;
  const { data:school } = useGetSchoolByIdQuery(decodedSchoolId);

  const { data: schoolsData } = useGetAllSchoolsQuery();
  const { data: staffTypeData } = useGetAllStaffTypesQuery();
  const { data: employeeTypeData } = useGetAllEmployeeTypeQuery();
  const { data: casteTypeData } = useGetAllCasteTypesQuery();
  const { data: religionTypeData } = useGetAllReligionTypesQuery();

  const [deleteStaff] = useDeleteStaffMutation();

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);
   useEffect(() => {
  if (role !== "SuperAdmin" && school) {
    setSelectedSchool(school);
  }
}, [school, role]);

const handleDelete = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला हा कर्मचारी हटवायचा आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteStaff(id).unwrap();
            setAlertType("success");
            setAlertMessage("कर्मचारी यशस्वीरित्या हटवला!");
          } catch (error) {
            setAlertType("error");
            setAlertMessage("कर्मचारी हटवण्यात अडचण आली: " + (error as any).message);
          }
        }
      },
      {
        label: "नाही",
        onClick: () => {}
      }
    ]
  });
};

  const handleSchoolChange = (school: ISchool | null) => {
    setSelectedSchool(school);
  };


  if (role !== "SuperAdmin" && isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div
            className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#5C4033] rounded-full"
            role="status"
            aria-label="लोड करत आहे..."
          ></div>
          <p className="mt-4 text-sm font-medium text-[#5C4033]">
            लोड करत आहे...
          </p>
        </div>
      </div>
    );
  }
  if (!selectedSchool) {
    return (
      <PageLayout>
        <div className="flex flex-col min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">
            कर्मचारी यादी
          </h2>
          <Filter  schools={role === "SuperAdmin" ? schoolsData : school}
          onSchoolChange={handleSchoolChange} />
          <div className="text-center mt-10 text-lg text-gray-600">
            कृपया शाळा निवडा
          </div>
        </div>
      </PageLayout>
    );
  }


  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">
          कर्मचारी यादी
        </h2>
         <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
       <Filter
         schools={role === "SuperAdmin" ? schoolsData : school}
             onSchoolChange={handleSchoolChange}
         selectedSchool={selectedSchool}
       />
            <div className="flex justify-end mb-4">
          <AddCircleIcon
            onClick={() => navigate("/admin/add-staff")}
            className="text-[#5C4033] cursor-pointer"
            fontSize="large"
          />
        </div>
        <div className="overflow-auto rounded-md shadow-sm border bg-white">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {[
                  "क्रमांक",
                  "नाव",
                  "लिंग",
                  "पात्रता",
                  "विषय",
                  "किमान - कमाल वर्ग",
                  "जन्मतारीख",
                  "नोकरी सुरू झाल्याची तारीख",
                  "धर्म",
                  "जात",
                  "धर्म प्रकार",
                  "जात प्रकार",
                  "कर्मचारी प्रकार",
                  "स्टाफ प्रकार",
                  "शाळा",
                  "ईमेल", 
                  "संपर्क क्रमांक",
                  "पत्ता",
                  "क्रिया",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 font-medium text-center text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStaff?.map((staff, index) => (
                <tr key={staff.id} className="hover:bg-gray-50 text-center">
                  <td className="px-2 py-2">{toMarathiNumber(index + 1)}</td>
                  <td className="px-2 py-2">{staff.name}</td>
                  <td className="px-2 py-2">{staff.gender}</td>
                  <td className="px-2 py-2">{staff.qualification}</td>
                  <td className="px-2 py-2">{staff.subject}</td>
                  <td className="px-2 py-2">
                    {toMarathiNumber(staff.minimumStandard)} - {toMarathiNumber(staff.maximumStandard)}
                  </td>
                  <td className="px-2 py-2">
                    {staff.dateOfBirth
                      ? new Date(staff.dateOfBirth).toLocaleDateString("mr-IN")
                      : ""}
                  </td>
                  <td className="px-2 py-2">
                    {staff.joiningDate
                      ? new Date(staff.joiningDate).toLocaleDateString("mr-IN")
                      : ""}
                  </td>
                  <td className="px-2 py-2">{staff.religion}</td>
                  <td className="px-2 py-2">{staff.caste}</td>
                  <td className="px-2 py-2">
                    {getNameById(staff.religionTypeId, religionTypeData)}
                  </td>
                  <td className="px-2 py-2">
                    {getNameById(
                      staff.casteTypeId,
                      casteTypeData?.map((item) => ({
                        id: item.id,
                        name: item.casteName,
                      }))
                    )}
                  </td>
                  <td className="px-2 py-2">
                    {getNameById(staff.employeeTypeId, employeeTypeData)}
                  </td>
                  <td className="px-2 py-2">
                    {getNameById(staff.staffTypeId, staffTypeData)}
                  </td>
                  <td className="px-2 py-2">
                    {getNameById(staff.schoolId, schoolsData)}
                  </td>
                  <td className="px-2 py-2">{staff.email ?? "-"}</td>
                  <td className="px-2 py-2">{staff.contact ?? "-"}</td>
                  <td
                    className="px-2 py-2"
                    style={{ whiteSpace: "normal", maxWidth: "200px" }}
                  >
                    {staff.address ?? "-"}
                  </td>
                  {/* 
                  <td className="px-2 py-2">{staff.userId ?? "-"}</td>
                  */}
                  <td className="px-2 py-2">
                    <div className="flex justify-center space-x-2">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() =>
                            navigate(`/admin/edit-staff/${staff.id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(staff.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStaff?.length === 0 && (
                <tr>
                  <td colSpan={16} className="text-center py-4">
                    कर्मचारी सापडले नाहीत.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffList;

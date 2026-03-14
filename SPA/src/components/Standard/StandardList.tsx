import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useGetAllSchoolsQuery, useGetSchoolByIdQuery } from "../../services/schoolApi";
import PageLayout from "../../shared-components/PageLayout";
import StandardDivisionPanel from "./StandardDivisionPanel";
import { useDeleteStandardMutation, useGetAllStandardsQuery } from "../../services/standardApi";
import IsLoading from "../../Status/IsLoading";
import ErrorMessage from "../../Status/IsError";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import Filter from "../FilterComponent/Filter";
import { ISchool } from "../types/School";
import AppSnackbar from "../alert/AppSnackbar";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../constants/confirm-custom.css";
import { getSchoolIdFromToken } from "../../constants/authUtils";


const StandardList: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const navigate = useNavigate();
  const [openDivisionIds, setOpenDivisionIds] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<ISchool | null>(null);

  const decodedSchoolId = getSchoolIdFromToken();

  const {
    data: standards = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllStandardsQuery();
  const { data: school, isLoading: isLoadingSchools } = useGetSchoolByIdQuery(decodedSchoolId);

  const { data: schools } = useGetAllSchoolsQuery();

  const [deleteStandard, { isLoading: isDeleting }] =
    useDeleteStandardMutation();

 useEffect(() => {
   if(school){
     setSelectedSchool(school);
   }
    
  }, [school]);

  const toggleDivision = (standardId: string) => {
    setOpenDivisionIds((prev) =>
      prev.includes(standardId)
        ? prev.filter((id) => id !== standardId)
        : [...prev, standardId]
    );
  };

const getSchoolName = (schoolId: string) => {
  const schoolName = schools?.find((s) => String(s.id) === String(schoolId)) ;
  return schoolName?.name || "Unknown School";
};


  const handleDeleteStandard = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला ही इयत्ता हटवायची आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteStandard(id).unwrap();
            setAlertType("success");
            setAlertMessage("इयत्ता यशस्वीरित्या हटवली!");
            refetch();
          } catch (err) {
            setAlertType("error");
            setAlertMessage("इयत्ता हटवण्यात अडचण आली: " + (err as any).message);
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
      setOpenDivisionIds([]); 
  };
if (isLoading || isLoadingSchools) {
  return (
    <PageLayout>
      <IsLoading isLoading={true} />
    </PageLayout>
  );
}

if (isError) {
  return (
    <PageLayout>
      <ErrorMessage isError={true} />
    </PageLayout>
  );
}


const filteredStandards = selectedSchool
  ? standards.filter(
      (standard) => String(standard.schoolId) === String(selectedSchool.id)
    )
  : standards;

  console.log("Filtered Standards:", filteredStandards);
  console.log("Selected School:", selectedSchool);

  return (
  <PageLayout>
   <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
         <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            इयत्ता यादी
         </h2>
          <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
<Filter
  schools={school}
      onSchoolChange={handleSchoolChange}
  selectedSchool={selectedSchool}
/>

         {selectedSchool  &&(
         <div className="flex justify-end mb-4">
            <AddCircleIcon
               onClick={() =>
            navigate("/admin/add-standard")}
            className="text-[#5C4033] cursor-pointer hover:scale-110 transition-transform"
            fontSize="large"
            />
         </div>
         )}
         {/* Show message if no school is selected */}
         {!selectedSchool ? (
         <p className="text-center text-gray-500 text-lg mt-6">
            कृपया शाळा निवडा
         </p>
         ) : filteredStandards.length === 0 ? (
         <p className="text-center text-gray-500 text-md my-6">
            निवडलेल्या शाळेसाठी कोणतीही इयत्ता उपलब्ध नाही.
         </p>
         ) : (
         <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-left text-md font-bold text-[#5C4033] uppercase">
                        इयत्ता
                     </th>
                     <th className="px-6 py-3 text-left text-md font-bold text-[#5C4033] uppercase">
                        शाळेचे नाव
                     </th>
                     <th className="px-6 py-3 text-center text-md font-bold text-[#5C4033] uppercase">
                        क्रिया
                     </th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {filteredStandards.map((std) => {
                  const isOpen = openDivisionIds.includes(std.id!);
                  return (
                  <React.Fragment key={std.id}>
                     <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-s font-sm text-gray-800 ">
                           {std.name}
                        </td>
                        <td className="px-6 py-4 text-s font-sm text-gray-800 ">
                           {getSchoolName(std.schoolId)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-center">
                           <div className="flex justify-center items-center space-x-3">
                              {/* Show / Hide Divisions */}
                              <Tooltip title={isOpen ? "विभाग लपवा" : "विभाग दाखवा"}>
                              <IconButton onClick={() =>
                                 toggleDivision(std.id!)}>
                                 <ArrowDropDownCircleIcon />
                              </IconButton>
                              </Tooltip>
                              {/* Edit */}
                              <Tooltip title="अद्ययावत करा">
                                 <IconButton
                                    onClick={() =>
                                    navigate(`/admin/edit-standard/${std.id}`)}
                                    >
                                    <EditIcon />
                                 </IconButton>
                              </Tooltip>
                              {/* Delete */}
                              <Tooltip title="काढून टाका">
                                 <IconButton
                                    onClick={() =>
                                    handleDeleteStandard(std.id!)}
                                    disabled={isDeleting}
                                    >
                                    <DeleteIcon />
                                 </IconButton>
                              </Tooltip>
                           </div>
                        </td>
                     </tr>
                     {isOpen && std.id && (
                     <tr>
                        <td colSpan={3} className="bg-gray-50 p-4">
                           <StandardDivisionPanel
                              standardId={std.id}
                              schoolId={std.schoolId}
                              />
                        </td>
                     </tr>
                     )}
                  </React.Fragment>
                  );
                  })}
               </tbody>
            </table>
         </div>
         )}
      </div>
   </div>
</PageLayout>
  );
};

export default StandardList;
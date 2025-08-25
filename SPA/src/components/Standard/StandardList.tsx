
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
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
import { useDialogs } from "@toolpad/core/useDialogs";
import Filter from "../FilterComponent/Filter";
import { ISchool } from "../types/School";



const StandardList: React.FC = () => {
  const navigate = useNavigate();
  const [openDivisionIds, setOpenDivisionIds] = useState<string[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<ISchool | null>(null);


  const {
    data: standards = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllStandardsQuery();
  const { data: schools = [] } = useGetAllSchoolsQuery();

  const [deleteStandard, { isLoading: isDeleting }] =
    useDeleteStandardMutation();

    const dialogs = useDialogs();

  const toggleDivision = (standardId: string) => {
    setOpenDivisionIds((prev) =>
      prev.includes(standardId)
        ? prev.filter((id) => id !== standardId)
        : [...prev, standardId]
    );
  };

const getSchoolName = (schoolId: string) => {
  const school = schools.find((s) => String(s.id) === String(schoolId));
  return school?.name || "Unknown School";
};


  const handleDeleteStandard = async (id: string) => {
    const confirmed = await dialogs.confirm("Are you sure you want to delete this standard?");
    if (confirmed) {
      try {
        await deleteStandard(id).unwrap();
        toast.success("Standard deleted successfully");
        refetch();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete standard");
      }
    }
  };
  const handleSchoolChange = (school: ISchool | null) => {
     setSelectedSchool(school);
  };

const filteredStandards = selectedSchool ? 
standards.filter(standard =>standard.schoolId === selectedSchool.id) :standards;


  return (
  <PageLayout>
   <IsLoading isLoading={isLoading} />
   <ErrorMessage isError={isError} />
   <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
         <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            इयत्ता यादी
         </h2>
         <Filter schools={schools} onSchoolChange={handleSchoolChange} />
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
                        <td className="px-6 py-4 text-lg font-sm text-gray-800">
                           {std.name}
                        </td>
                        <td className="px-6 py-4 text-lg font-sm text-gray-800">
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

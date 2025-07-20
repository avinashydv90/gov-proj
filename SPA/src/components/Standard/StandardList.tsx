// import React from "react";

// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import {
//   useDeleteStandardMutation,
//   useGetAllStandardsQuery,
// } from "../../services/standardApi";
// import { useGetAllSchoolsQuery } from "../../services/schoolApi";
// import PageLayout from "../../shared-components/PageLayout";
// import ButtonList from "../ButtonList";

// const StandardList: React.FC = () => {
//   const navigate = useNavigate();

//   const {
//     data: standards = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useGetAllStandardsQuery();
//   const { data: schools = [] } = useGetAllSchoolsQuery();
//   const [deleteStandard, { isLoading: isDeleting }] =
//     useDeleteStandardMutation();

//   const getSchoolName = (schoolId: string) => {
//     const school = schools.find((s) => s.id === schoolId);
//     return school?.schoolName || "Unknown School";
//   };

//   const handleDelete = async (id: number) => {
//     if (confirm("Are you sure you want to delete this standard?")) {
//       try {
//         await deleteStandard(id).unwrap();
//         toast.success("Standard deleted successfully");
//         refetch();
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to delete standard");
//       }
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div className="text-center">
//           <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#5C4033] rounded-full" />
//           <p className="mt-4 text-sm font-medium text-[#5C4033]">
//             लोड करत आहे...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md text-center">
//           <strong className="block font-semibold mb-1">त्रुटी आली!</strong>
//           <span className="text-sm">
//             डेटा मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.
//           </span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <PageLayout>
//       <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-4">
//         <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">
//           इयत्ता यादी
//         </h2>
//         <div className="overflow-x-auto w-full">
//           <div className="min-w-full bg-white border rounded shadow">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
//                     Standard
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
//                     School Name
//                   </th>
//                   <th className="px-6 py-3 text-center text-md font-semibold text-gray-600 uppercase">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {standards.map((std) => (
//                   <tr key={std.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
//                       {std.std}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
//                       {getSchoolName(std.schoolId)}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-semibold text-center">
//                       <div className="flex justify-center items-center space-x-2">
//                         <ButtonList
//                           buttons={[
//                             {
//                               label: "Update",
//                               onClick: () =>
//                                 navigate(`/edit-standard/${std.id}`),
//                             },
//                             {
//                               label: "Delete",
//                               onClick: () => handleDelete(std.id!),
//                               disabled: isDeleting,
//                             },
//                           ]}
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default StandardList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteStandardMutation,
  useGetAllStandardsQuery,
} from "../../services/standardApi_old";
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
import PageLayout from "../../shared-components/PageLayout";
import ButtonList from "../ButtonList";
import StandardDivisionPanel from "./StandardDivisionPanel";

const StandardList: React.FC = () => {
  const navigate = useNavigate();
  const [openDivisionIds, setOpenDivisionIds] = useState<number[]>([]);
  const {
    data: standards = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllStandardsQuery();
  const { data: schools = [] } = useGetAllSchoolsQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [deleteStandard, { isLoading: isDeleting }] =
    useDeleteStandardMutation();

  const toggleDivision = (standardId: number) => {
    setOpenDivisionIds((prev) =>
      prev.includes(standardId)
        ? prev.filter((id) => id !== standardId)
        : [...prev, standardId]
    );
  };

  const getSchoolName = (schoolId: string) => {
    const school = schools.find((s) => s.id === schoolId);
    return school?.name || "Unknown School";
  };

  const handleDeleteStandard = async (id: number) => {
    if (confirm("Are you sure you want to delete this standard?")) {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-[#5C4033] rounded-full" />
          <p className="mt-4 text-sm font-medium text-[#5C4033]">
            लोड करत आहे...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-md text-center">
          <strong className="block font-semibold mb-1">त्रुटी आली!</strong>
          <span className="text-sm">
            डेटा मिळवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.
          </span>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-4">
        <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">
          इयत्ता यादी
        </h2>
        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="flex py-2 px-4 border border-transparent rounded-md shadow-sm text-lg
                  font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => navigate("/admin/add-standard")}
          >
            नवीन इयत्ता नोंदवा
          </button>
        </div>
        <div className="overflow-x-auto w-full">
          <div className="min-w-full bg-white border rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Standard
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    School Name
                  </th>
                  <th className="px-6 py-3 text-center text-md font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {standards.map((std) => {
                  const isOpen = openDivisionIds.includes(std.id!); // assume std.id is number

                  return (
                    <React.Fragment key={std.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {std.std}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {getSchoolName(std.schoolId)}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-center">
                          <div className="flex justify-center items-center space-x-2">
                            <ButtonList
                              buttons={[
                                {
                                  label: isOpen
                                    ? "Hide Divisions"
                                    : "Show Divisions",
                                  onClick: () => toggleDivision(std.id!),
                                },
                                {
                                  label: "Update",
                                  onClick: () =>
                                    navigate(`/admin/edit-standard/${std.id}`),
                                },
                                {
                                  label: "Delete",
                                  onClick: () => handleDeleteStandard(std.id!),
                                  disabled: isDeleting,
                                },
                              ]}
                            />
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
        </div>
      </div>
    </PageLayout>
  );
};

export default StandardList;

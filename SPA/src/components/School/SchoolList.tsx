import React, { useEffect } from "react";
import PageLayout from "../../shared-components/PageLayout";
import {
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
} from "../../services/schoolApi";
import { useLocation, useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import "reactjs-popup/dist/index.css";
import { useGetAllSchoolTypesQuery } from "../../services/newSchoolTypeApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IsLoading from "../../Status/IsLoading";
import ErrorMessage from "../../Status/IsError";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDialogs } from "@toolpad/core/useDialogs";

const SchoolList: React.FC = () => {
 const {
    data: schools,
    isLoading,
    isError,
    refetch,
  } = useGetAllSchoolsQuery(undefined, {
    refetchOnMountOrArgChange: true, // Ensures refetch on mount
  });
    const { data: schoolTypes  } = useGetAllSchoolTypesQuery();
    const dialogs = useDialogs();

  const [deleteSchool] = useDeleteSchoolMutation();
    const location = useLocation();
  const { state } = location;
  
  const navigate = useNavigate();

   useEffect(() => {
    if (state?.updated) {
      refetch(); // Explicit refetch if navigation passed `state.updated`
    }
  }, [state, refetch]);

//   const handleDelete = async (id: string) => {
//     if (confirm("Are you sure you want to delete this school?")) {
//       try {
//         await deleteSchool(id)
//           .unwrap()
//           .then(() => console.log("Deleted success"))
//           .catch((e) => console.error("Delete failed:", e));
//         toast.success("School deleted successfully");
//         refetch(); // Refresh the list after deletion
//       } catch (err) {
//         toast.error("Failed to delete the school");
//         console.error(err);
//       }
//     }
//   };
const handleDelete = async(id:string)=>{
   const confirmed = await dialogs.confirm("Are you sure you want to delete this school?");
   if(confirmed)
   {
     try {
       await deleteSchool(id).unwrap();
       await dialogs.alert("School deleted successfully.");
       refetch(); // Refresh the list after deletion
     } catch (err) {
       await dialogs.alert("Failed to delete the school.");
       console.error(err);
     }
   }
}
  const getSchoolTypeName = (id: string) => {
    const match = schoolTypes?.find((type) => type.id === id);
    return match ? match.type : 'N/A';
  };

  <><ErrorMessage isError={isError} title="अरेरे! काहीतरी चुकलं" message="कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा." />
  <IsLoading isLoading={isLoading} message="Schools लोड करत आहे..." /></>

  return (
    <>   
 <PageLayout>
   <div className="flex flex-col  bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">शाळा यादी</h2>
      <div className="flex justify-end mb-4">
         <AddCircleIcon 
         onClick={() => navigate("/admin/school-registration")}
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"/>
      </div>
      <div className="overflow-auto rounded-md shadow-sm border bg-white">
         <table className="min-w-full divide-y divide-gray-200 text-md ">
            <thead className="bg-gray-100 sticky top-0 z-10 ">
               <tr >
                  {[
                  "अ.क्र.",
                  "शाळेचा कोड",
                  "क्लस्टर कोड",
                  "शाळेचे नाव",
                  "स्थापनेची तारीख",
                  "शाळेचा प्रकार",
                  "शहर",
                  "जिल्हा",
                  "राज्य",
                  "पिनकोड",
                  "ईमेल",
                  "संपर्क",
                  "इयत्ता",
                  "कृती"
                  ].map((header) => (
                  <th
                  key={header}
                  className={`px-3 py-2 font-semibold text-gray-700 whitespace-nowrap ${
                  header === "कृती" ? "text-center" : "text-left"
                  }`} 
                  >
                  {header}
                  </th>
                  ))}
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
               {schools?.map((school, index) => (
               <tr key={school.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">{index + 1}</td>
                  <td className="px-3 py-2">{school.schoolCode}</td>
                  <td className="px-3 py-2">{school.clusterCode}</td>
                  <td className="px-3 py-2">{school.name}</td>
                  <td className="px-3 py-2">
                     {new Date(school.establishMentDate).toLocaleDateString()}
                  </td>
                  <td className="px-3 py-2">
                     {getSchoolTypeName(school.schoolTypeId.toString())}
                  </td>
                  <td className="px-3 py-2">{school.city}</td>
                  <td className="px-3 py-2">{school.district}</td>
                  <td className="px-3 py-2">{school.state}</td>
                  <td className="px-3 py-2">{school.pinCode}</td>
                  <td className="px-3 py-2 truncate max-w-[180px]">{school.email}</td>
                  <td className="px-3 py-2">{school.phoneNumber}</td>
                  <td className="px-3 py-2">{school.lowerStandard} - {school.higherStandard}</td>
                  <td className="px-3 py-2 text-center md:text-lg">
                     <div className="flex justify-center gap-2">
                        <Tooltip title="Edit">
          <IconButton onClick={() => navigate(`/admin/school-edit/${school.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton  onClick={() =>handleDelete(school.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

                     </div>
                  </td>
               </tr>
               ))}
            </tbody>
         </table>
      </div>
   </div>
</PageLayout>
    </>
  );
};

export default SchoolList;


// [
//   "अ.क्र.",
//   "शाळेचा कोड",
//   "क्लस्टर कोड",
//   "शाळेचे नाव",
//   "स्थापनेची तारीख",
//   "शाळेचा प्रकार",
//   "शहर",
//   "जिल्हा",
//   "राज्य",
//   "पिनकोड",
//   "ईमेल",
//   "संपर्क",
//   "इयत्ता",
//   "कृती"
// ]










 {/* <PageLayout>
   <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">
         शाळा यादी
      </h2>
      <div className="flex justify-end mb-4">
         <button
            type="button"
            className="flex py-2 px-4 border border-transparent rounded-md shadow-sm text-lg
            font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => navigate("/admin/school-registration")}
         >
         नवीन शाळा नोंदवा
         </button>
      </div>
      <div className="overflow-x-auto w-full">
         <div className="min-w-full bg-white border rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
               <thead className="bg-gray-100">
                  <tr>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Sr. No</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">School Code</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Cluster Code</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">School Name</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Establish Date</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Type</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">City</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">District</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">State</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">PinCode</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Email</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Phone</th>
                     <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">Standards</th>
                     <th className="px-6 py-3 text-centre text-md font-semibold text-gray-600 uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200">
                  {schools?.map((school, index) => (
                  <tr key={school.id} className="hover:bg-gray-50">
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{index + 1}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.schoolCode}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.clusterCode}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.name}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {new Date(school.establishMentDate).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{getSchoolTypeName(school.schoolTypeId.toString())}</td>
                    
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.city}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.district}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.state}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.pinCode}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.email}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">{school.phoneNumber}</td>
                     <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {school.lowerStandard} - {school.higherStandard}
                     </td>
                     <td className="px-6 py-4 text-sm font-semibold">
                        <div className="flex justify-center items-center space-x-2">
                           <ButtonList
                           buttons={[
                           {
                           label: "Update",
                           onClick: () => navigate(`/admin/school-edit/${school.id}`),
                           },
                           {
                           label: "Delete",
                           onClick: () => handleDelete(school.id),
                           disabled: isDeleting,
                           },
                           ]}
                           />
                        </div>
                     </td>
                  </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   </div>
</PageLayout> */}
import React, { useEffect, useState } from "react";
import PageLayout from "../../shared-components/PageLayout";
import {
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
} from "../../services/schoolApi";
import { useLocation, useNavigate } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { useGetAllSchoolTypesQuery } from "../../services/newSchoolTypeApi";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IsLoading from "../../Status/IsLoading";
import ErrorMessage from "../../Status/IsError";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AppSnackbar from "../alert/AppSnackbar";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../constants/confirm-custom.css";
import toMarathiNumber from "../../constants/toMarathiNumber";


const SchoolList: React.FC = () => {
     const [alertMessage, setAlertMessage] = useState<string | null>(null);
     const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
 const {
    data: schools,
    isLoading,
    isError,
    refetch,
  } = useGetAllSchoolsQuery(undefined, {
    refetchOnMountOrArgChange: true, 
  });
    const { data: schoolTypes  } = useGetAllSchoolTypesQuery();
    //const dialogs = useDialogs();

  const [deleteSchool] = useDeleteSchoolMutation();
    const location = useLocation();
  const { state } = location;
  
  const navigate = useNavigate();

   useEffect(() => {
    if (state?.updated) {
      refetch(); 
    }
  }, [state, refetch]);

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);


const handleDelete = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला हे विद्यालय हटवायचे आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteSchool(id).unwrap();
            setAlertType("success");
            setAlertMessage("विद्यालय यशस्वीपणे हटविण्यात आले.");
            refetch();
          } catch (err) {
            setAlertType("error");
            setAlertMessage("विद्यालय हटविण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.");
          }
        }
      },
      {
        label: "नाही",
        onClick: () => {} // Do nothing
      }
    ]
  });
};

  const getSchoolTypeName = (id: string) => {
    const match = schoolTypes?.find((type) => type.id === id);
    return match ? match.type : 'N/A';
  };
  

  <><ErrorMessage isError={isError} title="अरेरे! काहीतरी चुकलं" message="कृपया इंटरनेट कनेक्शन तपासा आणि पुन्हा प्रयत्न करा." />
  <IsLoading isLoading={isLoading} message="Schools लोड करत आहे..." /></>

  return (
    <>   
 <PageLayout>
    <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
   <div className="flex flex-col  bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">शाळा यादी</h2>
      <div className="flex justify-end mb-4">
         <AddCircleIcon 
         onClick={() => navigate("/admin/school-registration")}
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"/>
      </div>
      <div className="overflow-auto rounded-md shadow-sm border bg-white">
         <table className="min-w-full divide-y divide-gray-200 table-auto text-md ">
            <thead className="bg-gray-100  sticky top-0 z-10 ">
               <tr >
                  {[
                  "अ.क्र.",
                  "शाळेचा कोड",
                  "क्लस्टर कोड",
                  "शाळेचे नाव",
                  "स्थापनेची तारीख",
                  "शाळेचा प्रकार",
                  "पत्ता",
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
                  className={`px-3 py-2 font-medium 
                      text-gray-700 whitespace-nowrap ${
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
                  <td className="px-3 py-2">{toMarathiNumber(index + 1)}</td>
                  <td className="px-3 py-2">{school.schoolCode}</td>
                  <td className="px-3 py-2">{school.clusterCode}</td>
                  <td className="px-3 py-2">{school.name}</td>
                  <td className="px-3 py-2">
                    {new Date(school.establishMentDate).toLocaleDateString("mr-IN")}
                  </td>
                  <td className="px-3 py-2">
                     {getSchoolTypeName(school.schoolTypeId.toString())}
                  </td>
                   <td className="px-3 py-2">{school.address}</td>
                  <td className="px-3 py-2">{school.city}</td>
                  <td className="px-3 py-2">{school.district}</td>
                  <td className="px-3 py-2">{school.state}</td>
                  <td className="px-3 py-2">{school.pinCode}</td>
                  <td className="px-3 py-2 truncate max-w-[180px]">{school.email}</td>
                  <td className="px-3 py-2">{school.phoneNumber}</td>
                  <td className="px-3 py-2">{toMarathiNumber(school.lowerStandard)} - {toMarathiNumber(school.higherStandard)}</td>
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



import { useNavigate } from "react-router-dom";
import PageLayout from "../../shared-components/PageLayout";
import { useDeleteCasteTypeMutation, useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
//import { useDialogs } from "@toolpad/core/useDialogs";
import { useEffect, useState } from "react";
import AppSnackbar from "../alert/AppSnackbar";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../constants/confirm-custom.css";
import toMarathiNumber from "../../constants/toMarathiNumber";


export const CasteTypeList: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const navigate = useNavigate();
  const { data: casteTypes, isLoading } = useGetAllCasteTypesQuery();
  const [deleteCasteType] = useDeleteCasteTypeMutation();
  //const dialogs = useDialogs();

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

 const handleDelete = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला हा जात प्रकार हटवायचा आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteCasteType(id).unwrap();
            setAlertType("success");
            setAlertMessage("जात प्रकार यशस्वीरित्या हटवला!");
          } catch (error) {
            setAlertType("error");
            setAlertMessage("जात प्रकार हटवण्यात अडचण आली: " + (error as any).message);
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

  if (isLoading) {
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

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">
          जात प्रकार यादी
        </h2>
         <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
        <div className="flex justify-end mb-4">
          <AddCircleIcon 
          onClick={() => navigate("/admin/add-castetype")}
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"/>
        </div>

        <div className="overflow-auto rounded-md shadow-sm border bg-white">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {["अ.क्र.", "जात प्रकार", "कृती"].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 font-semibold text-center text-gray-700 whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {casteTypes?.map((casteType, index) => (
                <tr key={casteType.id} className="hover:bg-gray-50 text-center">
                  <td className="px-3 text-lg py-2">{toMarathiNumber(index + 1)}</td>
                  <td className="px-3 text-lg py-2">{casteType.casteName}</td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center space-x-2">
                      <Tooltip title="Edit">
          <IconButton onClick={() => navigate(`/admin/edit-castetype/${casteType.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton  onClick={() =>handleDelete(casteType.id)}
>
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
          <div className="flex justify-end mt-3 mt-50">
  <p className="text-medium text-m text-gray-600 italic">
    <strong> टीप:</strong> जात प्रकार उदा. मराठा, कुंभी, पाटील इत्यादी नमूद करावा.
  </p>
</div>
      </div>
    </PageLayout>
  );
}


import React, { useEffect, useState } from "react";
import {
  useAddDivisionMutation,
  useDeleteDivisionMutation,
  useGetDivisionsByStandardIdQuery,
} from "../../services/divisionApi";
import { CreateDivisionDto } from "../types/division";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../constants/confirm-custom.css";
import AppSnackbar from "../alert/AppSnackbar";

interface Props {
  standardId: string;
  schoolId: string;
}

const StandardDivisionPanel: React.FC<Props> = ({ standardId, schoolId }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const { data: divisions = [], isFetching } =
    useGetDivisionsByStandardIdQuery(standardId);
  const [input, setInput] = useState("");
  const [addDivision] = useAddDivisionMutation();
  const [deleteDivision] = useDeleteDivisionMutation();

  useEffect(() => {
     if (alertMessage) {
       const timer = setTimeout(() => setAlertMessage(null), 2000);
       return () => clearTimeout(timer);
     }
   }, [alertMessage]);

  const handleAdd = async () => {
    if (!input.trim()) {
      setAlertType("error");
      setAlertMessage("Division name is required.");
      return;
    }
    try {
      const createPayLoad : CreateDivisionDto= {
        name: input,
        standardId,
        schoolId,
      }
      await addDivision(createPayLoad).unwrap();
      setAlertType("success");
      setAlertMessage("Division added.");
      setInput("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setAlertType("error");
      setAlertMessage("Failed to add division.");
    }
  };

const handleDelete = async (id: string) => {
  confirmAlert({
    title: "तुम्हाला हा विभाग हटवायचा आहे का?",
    message: "कृपया पुढे जाण्यासाठी पुष्टी करा.",
    buttons: [
      {
        label: "होय",
        onClick: async () => {
          try {
            await deleteDivision(id).unwrap();
            setAlertType("success");
            setAlertMessage("विभाग यशस्वीरित्या हटवला!");
          } catch (err) {
            setAlertType("error");
            setAlertMessage(
              "विभाग हटवण्यात अडचण आली: " + (err as any).message
            );
          }
        },
      },
      {
        label: "नाही",
        onClick: () => {},
      },
    ],
  });
};



  return (
   <div className="space-y-4 pt-4">
  <div className="flex items-center gap-2">
    <input
      type="text"
      placeholder="विभागाचे नाव"
      className="border border-gray-300 rounded-md p-2 w-60"
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />

     <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
  />
    <AddCircleIcon 
     onClick={handleAdd}
     
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"/>
    {/* <button
      onClick={handleAdd}
      className="bg-[#5C4033] text-white px-4 py-2 rounded hover:bg-[#4a3328] font-md"
    >
      जोडा
    </button> */}
  </div>

  <div>
    {isFetching ? (
      <p className="text-sm text-gray-500">लोड करत आहे...</p>
    ) : divisions.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border rounded-md shadow-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2 text-center">विभागाचे नाव</th>
              <th className="border px-4 py-2 text-center">क्रिया</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {divisions.map((div) => (
              <tr key={div.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2 text-center">{div.name}</td>
                <td className="border px-4 py-2 text-center">
                  <Tooltip title="Delete">
          <IconButton  onClick={() => handleDelete(div.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-sm text-gray-500">कोणतेही विभाग उपलब्ध नाहीत.</p>
    )}
  </div>
</div>

  );
};

export default StandardDivisionPanel;

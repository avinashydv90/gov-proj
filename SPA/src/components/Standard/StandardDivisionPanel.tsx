import React, { useState } from "react";
import {
  useAddDivisionMutation,
  useDeleteDivisionMutation,
  useGetDivisionsByStandardIdQuery,
} from "../../services/divisionApi";

import { toast } from "react-toastify";
import { CreateDivisionDto } from "../types/division";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  standardId: string;
  schoolId: string;
}

const StandardDivisionPanel: React.FC<Props> = ({ standardId, schoolId }) => {
  const { data: divisions = [], isFetching } =
    useGetDivisionsByStandardIdQuery(standardId);
  const [input, setInput] = useState("");
  const [addDivision] = useAddDivisionMutation();
  const [deleteDivision] = useDeleteDivisionMutation();

  const handleAdd = async () => {
    if (!input.trim()) {
      toast.error("Division name is required.");
      return;
    }
    try {
      const createPayLoad : CreateDivisionDto= {
        name: input,
        standardId,
        schoolId,
      }
      await addDivision(createPayLoad).unwrap();
      toast.success("Division added.");
      setInput("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to add division.");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this division?")) {
      try {
        console.log("Deleting division with ID:", id);
        await deleteDivision(id).unwrap();
        toast.success("Division deleted.");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        toast.error("Failed to delete.");
      }
    }
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

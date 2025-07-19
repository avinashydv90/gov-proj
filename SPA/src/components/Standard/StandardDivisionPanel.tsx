import React, { useState } from "react";
import {
  useAddDivisionMutation,
  useDeleteDivisionMutation,
  useGetDivisionsByStandardIdQuery,
} from "../../services/divisionApi";
import ButtonList from "../ButtonList";
import { toast } from "react-toastify";

interface Props {
  standardId: number;
}

const StandardDivisionPanel: React.FC<Props> = ({ standardId }) => {
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
      await addDivision({ name: input, standardId }).unwrap();
      toast.success("Division added.");
      setInput("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to add division.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this division?")) {
      try {
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
        <button
          onClick={handleAdd}
          className="bg-[#5C4033] text-white px-4 py-2 rounded hover:bg-[#4a3328]"
        >
          जोडा
        </button>
      </div>

      <div>
        {isFetching ? (
          <p className="text-sm text-gray-500">लोड करत आहे...</p>
        ) : divisions.length > 0 ? (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Division Name</th>
                <th className="border px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {divisions.map((div) => (
                <tr key={div.id}>
                  <td className="border px-4 py-2">{div.name}</td>
                  <td className="border px-4 py-2 text-center">
                    <ButtonList
                      buttons={[
                        {
                          label: "Delete",
                          onClick: () => handleDelete(div.id!),
                        },
                      ]}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm text-gray-500">कोणतेही विभाग उपलब्ध नाहीत.</p>
        )}
      </div>
    </div>
  );
};

export default StandardDivisionPanel;

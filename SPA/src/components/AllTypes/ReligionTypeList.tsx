import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PageLayout from "../../shared-components/PageLayout";
import {
  useDeleteReligionTypeMutation,
  useGetAllReligionTypesQuery,
} from "../../services/StaffService/religionTypeApi";
import { IReligionType } from "../types/IReligionType";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const ReligionTypeList: React.FC = () => {
  const navigate = useNavigate();
  const { data: religionTypes, isLoading } = useGetAllReligionTypesQuery();
  const [deleteReligionType] = useDeleteReligionTypeMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("आपण हटवू इच्छिता याची खात्री आहे का?")) {
      try {
        await deleteReligionType(id).unwrap();
        toast.success("धर्म प्रकार यशस्वीरित्या हटवला!");
      } catch (error) {
        console.error("धर्म प्रकार हटवण्यात अडचण आली:", error);
        toast.error("हटवण्यात अडचण आली.");
      }
    }
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
          धर्म प्रकार यादी
        </h2>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex justify-end mb-4">
         <AddCircleIcon 
         onClick={() => navigate("/admin/add-religiontype")}
          className="text-[#5C4033] cursor-pointer"
          fontSize="large"/>
        </div>

        <div className="overflow-auto rounded-md shadow-sm border bg-white">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                {["अ.क्र.", "धर्म प्रकार", "कृती"].map((header) => (
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
              {religionTypes?.map((religionType : IReligionType, index : any) => (
                <tr key={religionType.id} className="hover:bg-gray-50 text-center">
                  <td className="px-3 text-lg py-2">{index + 1}</td>
                  <td className="px-3 text-lg py-2">{religionType.name}</td>
                  <td className="px-3 py-2">
                    <div className="flex justify-center space-x-2">
                      <Tooltip title="Edit">
          <IconButton onClick={() => navigate(`/admin/edit-religiontype/${religionType.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton  onClick={() =>  handleDelete(religionType.id)}
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
      </div>
    </PageLayout>
  );
};
export default ReligionTypeList;
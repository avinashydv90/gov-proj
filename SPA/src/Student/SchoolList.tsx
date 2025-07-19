import React from "react";
import PageLayout from "../shared-components/PageLayout";
import ButtonList from "../components/ButtonList";
import {
  useDeleteSchoolMutation,
  useGetAllSchoolsQuery,
} from "../services/schoolApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const SchoolList: React.FC = () => {
  const {
    data: schools,
    isLoading,
    isError,
    refetch,
  } = useGetAllSchoolsQuery();
  const [deleteSchool, { isLoading: isDeleting }] = useDeleteSchoolMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this school?")) {
      try {
        await deleteSchool(id)
          .unwrap()
          .then(() => console.log("Deleted success"))
          .catch((e) => console.error("Delete failed:", e));
        toast.success("School deleted successfully");
        refetch(); // Refresh the list after deletion
      } catch (err) {
        toast.error("Failed to delete the school");
        console.error(err);
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
    <>
      <PageLayout>
        <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-4">
          <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">
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
                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                      Sr. No
                    </th>
                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                      School Name
                    </th>
                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                      Establish Date
                    </th>
                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                      School Type
                    </th>
                    <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                      Address
                    </th>
                    <th className="px-6 py-3 text-centre text-md font-semibold text-gray-600 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schools?.map((school, index) => (
                    <tr key={school.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {school.name}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {new Date(school.establishDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {school.type}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                        {school.address}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        <div className="flex justify-center items-center space-x-2">
                          <ButtonList
                            buttons={[
                              {
                                label: "Update",
                                onClick: () =>
                                  navigate(`/admin/school-edit/${school.id}`),
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
      </PageLayout>
    </>
  );
};

export default SchoolList;

import React from "react";
import PageLayout from "../shared-components/PageLayout";
import ButtonList from "../components/ButtonList";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "../services/studentApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentList: React.FC = () => {
  const {
    data: students,
    isLoading,
    isError,
    refetch,
  } = useGetAllStudentsQuery();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id).unwrap();
        toast.success("Student deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete the student");
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
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 py-10 px-4">
        <h2 className="text-xl font-bold mb-4 text-center text-[#5C4033]">
          विद्यार्थी यादी
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
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Standard
                  </th>
                  <th className="px-6 py-3 text-left text-md font-semibold text-gray-600 uppercase">
                    Division
                  </th>
                  <th className="px-6 py-3 text-center text-md font-semibold text-gray-600 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students?.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{`${student.name}`}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {student.address}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {student.standard}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {student.division}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      <div className="flex justify-center items-center space-x-2">
                        <ButtonList
                          buttons={[
                            {
                              label: "Update",
                              onClick: () =>
                                navigate(`/edit-student/${student.id}`),
                            },
                            {
                              label: "Delete",
                              onClick: () => handleDelete(student.id),
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
  );
};

export default StudentList;

import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PageLayout from "../../shared-components/PageLayout";
import { useDeleteStaffMutation, useGetAllStaffQuery } from "../../services/StaffService/staffApi";

export const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const { data: staffs, isLoading } = useGetAllStaffQuery();
  const [deleteStaff] = useDeleteStaffMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("आपण कर्मचारी हटवू इच्छिता याची खात्री आहे का?")) {
      try {
        await deleteStaff(id).unwrap();
        toast.success("कर्मचारी यशस्वीरित्या हटवला!");
      } catch (error) {
        console.error("कर्मचारी हटवण्यात अडचण आली:", error);
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
          <p className="mt-4 text-sm font-medium text-[#5C4033]">लोड करत आहे...</p>
        </div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-gray-50 py-6 px-2 sm:px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#5C4033]">कर्मचारी यादी</h2>
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="flex justify-end mb-4">
          <button
            type="button"
            className="flex py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-bold text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] transition-colors"
            onClick={() => navigate("/admin/add-staff")}
          >
            नवीन कर्मचारी
          </button>
        </div>

        <div className="overflow-auto rounded-md shadow-sm border bg-white">
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
               {[
                  "अ.क्र.", "नाव", "लिंग", "पदवी", "विषय", "शिकवलेले वर्ग", "DOB",
                  "सांप्रदाय", "जात", "रिलीजन ", "जात प्रकार ",
                  "कर्मचारी प्रकार ", "स्टाफ प्रकार ", "शाळा ", "User ", "संपादन/हटवा"
                ].map((header) => (
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
              {staffs?.map((staff, index) => (
                <tr key={staff.id} className="hover:bg-gray-50 text-center">
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{staff.name}</td>
                  <td className="px-2 py-2">{staff.gender}</td>
                  <td className="px-2 py-2">{staff.qualification}</td>
                  <td className="px-2 py-2">{staff.subject}</td>
                  <td className="px-2 py-2">
                    {staff.minimumStandard} - {staff.maximumStandard}
                  </td>
                  <td className="px-2 py-2">{staff.dateOfBirth}</td>
                  <td className="px-2 py-2">{staff.religion}</td>
                  <td className="px-2 py-2">{staff.caste}</td>
                  <td className="px-2 py-2">{staff.religionTypeId}</td>
                  <td className="px-2 py-2">{staff.casteTypeId}</td>
                  <td className="px-2 py-2">{staff.employeeTypeId}</td>
                  <td className="px-2 py-2">{staff.staffTypeId}</td>
                  <td className="px-2 py-2">{staff.schoolId}</td>
                  <td className="px-2 py-2">{staff.userId ?? "-"}</td>
                  <td className="px-2 py-2">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => navigate(`/admin/edit-staff/${staff.id}`)}
                        className="bg-[#5C4033] hover:bg-[#4a3328] text-white py-1 px-3 rounded font-bold"
                      >
                        संपादन
                      </button>
                      <button
                        onClick={() => handleDelete(staff.id)}
                        className="bg-[#5C4033] hover:bg-[#4a3328] text-white py-1 px-3 rounded font-bold"
                      >
                        हटवा
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
               {staffs?.length === 0 && (
                <tr>
                  <td colSpan={16} className="text-center py-4">
                    कर्मचारी सापडले नाहीत.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
};


export default StaffList;

import React, { useEffect, useState } from "react";
import {
  useRegisterSchoolMutation,
  useUpdateSchoolMutation,
  useGetSchoolByIdQuery,
} from "../services/schoolApi";
import PageLayout from "../shared-components/PageLayout";
import { SchoolRegistrationRequest } from "./types/School";
// import ButtonList from "./ButtonList";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SchoolRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // for edit
  const isEditMode = !!id;

  const [formData, setFormData] = useState<SchoolRegistrationRequest>({
    name: "",
    establishDate: "",
    address: "",
    type: "अनुदानित",
  });

  const [registerSchool, { isLoading: isRegistering }] =
    useRegisterSchoolMutation();
  const [updateSchool, { isLoading: isUpdating }] = useUpdateSchoolMutation();

  const {
    data: existingSchool,
    isSuccess: isSchoolLoaded,
    isLoading: isSchoolLoading,
    isError: isSchoolError,
  } = useGetSchoolByIdQuery(id!, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (isEditMode && isSchoolLoaded && existingSchool) {
      setFormData({
        id: existingSchool.id, // include id for update
        name: existingSchool.name,
        establishDate: existingSchool.establishDate.split("T")[0], // format ISO date to yyyy-mm-dd
        address: existingSchool.address,
        type: existingSchool.type,
      });
    }
  }, [isEditMode, isSchoolLoaded, existingSchool]);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const action =
        isEditMode && id
          ? updateSchool({ id, data: formData }).unwrap()
          : registerSchool(formData).unwrap();
      await action;

      const message = isEditMode
        ? "शाळेची माहिती यशस्वीरित्या अपडेट झाली."
        : "शाळा यशस्वीपणे नोंदवली.";
      toast.success(message);
      // Refresh the school list after registration or update

      navigate("/admin/school-list");

      if (!isEditMode) {
        setFormData({
          name: "",
          establishDate: "",
          address: "",
          type: "अनुदानित",
        });
      }
    } catch (err) {
      console.error("अपडेट अयशस्वी:", err);
      toast.error("अपडेट अयशस्वी");
    }
  };

  if (isEditMode && isSchoolLoading) {
    return (
      <PageLayout>
        <div className="text-center py-8">लोड करत आहे...</div>
      </PageLayout>
    );
  }
  if (isEditMode && isSchoolError) {
    return (
      <PageLayout>
        <div className="text-center py-8 text-red-600">
          शाळेची माहिती मिळवण्यात त्रुटी.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode ? "शाळा माहिती संपादित करा" : "शाळा नोंदणी फॉर्म"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-[#5C4033]"
              >
                शाळेचे नाव *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] shadow-sm focus:border-[#4a3328] focus:ring-[#4a3328] p-2 bg-white/90"
              />
            </div>

            <div>
              <label
                htmlFor="establishDate"
                className="block text-sm font-bold text-[#5C4033]"
              >
                स्थापना दिनांक *
              </label>
              <input
                type="date"
                id="establishDate"
                name="establishDate"
                value={formData.establishDate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // today’s date in YYYY-MM-DD
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] shadow-sm focus:border-[#4a3328] focus:ring-[#4a3328] p-2 bg-white/90"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-bold text-[#5C4033]"
              >
                पत्ता *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] shadow-sm focus:border-[#4a3328] focus:ring-[#4a3328] p-2 bg-white/90"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-bold text-[#5C4033]"
              >
                शाळेचा प्रकार *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md text-sm font-semibold border border-[#5C4033] shadow-sm focus:border-[#4a3328] focus:ring-[#4a3328] p-2 bg-white/90"
              >
                <option className="text-sm font-semibold" value="अनुदानित">
                  अनुदानित
                </option>
                <option className="text-sm font-semibold" value="बिनअनुदानित">
                  बिनअनुदानित
                </option>
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isRegistering || isUpdating}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg
                  font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isRegistering || isUpdating
                  ? "प्रक्रिया सुरू आहे..."
                  : isEditMode
                  ? "अपडेट करा"
                  : "शाळा नोंदणी करा"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default SchoolRegistrationForm;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditMode && id) {
//         await updateSchool({ id, data: formData }).unwrap();
//         toast.success("शाळेची माहिती यशस्वीरित्या अपडेट केली.");
//       } else {
//         await registerSchool(formData).unwrap();
//         toast.success("शाळा यशस्वीरित्या नोंदवली.");
//         setFormData({
//           schoolName: "",
//           establishDate: "",
//           address: "",
//           schoolType: "Aided",
//         });
//       }
//       navigate("/school-list");
//     } catch (err) {
//       console.error("नोंदणी अयशस्वी:", err);
//       toast.error("नोंदणी अयशस्वी");
//     }
//   };

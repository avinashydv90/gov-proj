import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "../../shared-components/PageLayout";
import InputField from "../InputField";
import { useCreateStaffMutation, useGetStaffByIdQuery, useUpdateStaffMutation } from "../../services/StaffService/staffApi";
import { IStaff } from "../types/IStaff";

const StaffForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<IStaff>({
    id: "",
    name: "",
    qualification: "",
    subject: "",
    joiningDate: "",
    gender: "",
    minimumStandard: "",
    maximumStandard: "",
    dateOfBirth: "",
    caste: "",
    religion: "",
    employeeTypeId: "",
    staffTypeId: "",
    userId: "",
    schoolId: "",
    religionTypeId: "",
    casteTypeId: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerStaff] = useCreateStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();

  const { data: existingStaff } = useGetStaffByIdQuery(id!, {
    skip: !isEditMode,
  });

  useEffect(() => {
    if (isEditMode && existingStaff) {
      setFormData(existingStaff);
    }
  }, [isEditMode, existingStaff]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "नाव आवश्यक आहे";
    if (!formData.joiningDate) newErrors.joiningDate = "जॉईनिंग दिनांक आवश्यक आहे";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "जन्मतारीख आवश्यक आहे";
    if (!formData.gender) newErrors.gender = "लिंग आवश्यक आहे";
    if (!formData.employeeTypeId) newErrors.employeeTypeId = "कर्मचारी प्रकार आवश्यक आहे";
    if (!formData.staffTypeId) newErrors.staffTypeId = "स्टाफ प्रकार आवश्यक आहे";
    if (!formData.schoolId) newErrors.schoolId = "शाळा आवश्यक आहे";

    setErrors(newErrors);
    Object.values(newErrors).forEach((msg) => toast.error(msg));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (isEditMode) {
        await updateStaff( { ...formData} );
        toast.success("स्टाफ माहिती अपडेट झाली.");
      } else {
        await registerStaff(formData);
        toast.success("स्टाफ यशस्वीरित्या नोंदवला गेला.");
      }
      navigate("/admin/staff-list", { state: { updated: true } });
    } catch (err) {
      console.error(err);
      toast.error("कारवाई अयशस्वी झाली");
    }
  };

  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#5C4033]">
            {isEditMode ? "स्टाफ माहिती संपादित करा" : "स्टाफ नोंदणी फॉर्म"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <InputField label="नाव" name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
              <InputField label="शैक्षणिक पात्रता" name="qualification" value={formData.qualification} onChange={handleChange} />
              <InputField label="विषय" name="subject" value={formData.subject} onChange={handleChange} />
              <InputField label="जॉईनिंग दिनांक" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required error={errors.joiningDate} />
              <InputField label="लिंग" name="gender" value={formData.gender} onChange={handleChange} required error={errors.gender} />
              <InputField label="किमान इयत्ता" name="minimumStandard" value={formData.minimumStandard} onChange={handleChange} />
              <InputField label="कमाल इयत्ता" name="maximumStandard" value={formData.maximumStandard} onChange={handleChange} />
              <InputField label="जन्मतारीख" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required error={errors.dateOfBirth} />
              <InputField label="जात" name="caste" value={formData.caste} onChange={handleChange} />
              <InputField label="धर्म" name="religion" value={formData.religion} onChange={handleChange} />
              <InputField label="कर्मचारी प्रकार ID" name="employeeTypeId" value={formData.employeeTypeId} onChange={handleChange} required error={errors.employeeTypeId} />
              <InputField label="स्टाफ प्रकार ID" name="staffTypeId" value={formData.staffTypeId} onChange={handleChange} required error={errors.staffTypeId} />
              <InputField label="शाळा ID" name="schoolId" value={formData.schoolId} onChange={handleChange} required error={errors.schoolId} />
              <InputField label="धर्म प्रकार ID" name="religionTypeId" value={formData.religionTypeId} onChange={handleChange} />
              <InputField label="जात प्रकार ID" name="casteTypeId" value={formData.casteTypeId} onChange={handleChange} />
            </div>
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-lg font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328] rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328]"
              >
                {isEditMode ? "अपडेट करा" : "नोंदणी करा"}
              </button>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffForm;
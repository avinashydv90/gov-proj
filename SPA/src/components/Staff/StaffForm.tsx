import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "../../shared-components/PageLayout";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { useCreateStaffMutation, useGetStaffByIdQuery, useUpdateStaffMutation } from "../../services/StaffService/staffApi";
import { IStaff } from "../types/IStaff";
import { useGetAllEmployeeTypeQuery } from "../../services/StaffService/employeeTypeApi";
import { useGetAllStaffTypesQuery } from "../../services/StaffService/staffTypeApi";
import { useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
import { useGetAllReligionTypesQuery } from "../../services/StaffService/religionTypeApi";
import TextareaField from "../TextareaField";



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
    address: "",
    contact: "",
    email: "",
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

  const { data: staffType } = useGetAllStaffTypesQuery();
  const { data: employeeType } = useGetAllEmployeeTypeQuery();
  const { data: casteType } = useGetAllCasteTypesQuery();
  const { data: schools } = useGetAllSchoolsQuery();
  const { data: religionTypes } = useGetAllReligionTypesQuery();

 const [createStaff] = useCreateStaffMutation();
  const [updateStaff] = useUpdateStaffMutation();

  const { data: existingStaff } = useGetStaffByIdQuery(id!, {
    skip: !isEditMode,
  });

useEffect(() => {
  if (isEditMode && existingStaff) {
    setFormData(prev => ({
      ...prev,
      ...existingStaff,
      joiningDate: existingStaff.joiningDate
        ? existingStaff.joiningDate.split("T")[0]
        : prev.joiningDate || "",
      dateOfBirth: existingStaff.dateOfBirth
        ? existingStaff.dateOfBirth.split("T")[0]
        : prev.dateOfBirth || ""
    }));
  }
}, [isEditMode, existingStaff]);


  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
    if (!formData.religionTypeId) newErrors.religionTypeId = "धर्म प्रकार आवश्यक आहे";
    if (!formData.casteTypeId) newErrors.casteTypeId = "जात प्रकार आवश्यक आहे";
    if (!formData.contact) newErrors.contact = "संपर्क क्रमांक आवश्यक आहे";
    const phoneRegex = /^\d{10}$/;
    if (formData.contact && !phoneRegex.test(formData.contact)) {
      newErrors.contact = "वैध संपर्क क्रमांक भरा.";
    }

    setErrors(newErrors);
    Object.values(newErrors).forEach((msg) => toast.error(msg));
    return Object.keys(newErrors).length === 0;
  };
 // Date formatting helper
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    // Input type="date" gives YYYY-MM-DD string, backend might accept this directly
    // Otherwise convert to ISO string:
    const d = new Date(dateStr);
    return d.toISOString(); // If backend expects full ISO
    // return dateStr; // Uncomment this if backend expects just YYYY-MM-DD
  };

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!validateForm()) return;
   const payload = {
      ...formData,
      joiningDate: formatDate(formData.joiningDate),
      dateOfBirth: formatDate(formData.dateOfBirth),
    };

  try {
    if (isEditMode) {
      await updateStaff(payload).unwrap();
      toast.success("स्टाफ माहिती अपडेट झाली.");
    } else {
      await createStaff(payload).unwrap();
      toast.success("स्टाफ यशस्वीरित्या नोंदवला गेला.");
    }
    navigate("/admin/staff-list", { state: { updated: true } });
  } catch (err) {
    toast.error("कारवाई अयशस्वीरित्या अयशस्वी.");
  }
};

  const casteTypeOptions = casteType?.map((c ) => ({ id: c.id, name: c.casteName })) || [];
  const employeeTypeOptions = employeeType?.map((e) => ({ id: e.id, name: e.name })) || [];
  const staffTypeOptions = staffType?.map((s) => ({ id: s.id, name: s.name })) || [];
  const schoolOptions = schools?.map((s) => ({ id: s.id, name: s.name })) || [];
  const religionOptions = religionTypes?.map((r) => ({
  id: r.id,
  name: r.name,
})) || [];


  return (
    <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#5C4033]">
            {isEditMode ? "कर्मचारी माहिती संपादित करा" : "कर्मचारी नोंदणी फॉर्म"}
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <InputField label="नाव" name="name" value={formData.name} onChange={handleChange} required error={errors.name} />
              <InputField label="शैक्षणिक पात्रता" name="qualification" value={formData.qualification} required onChange={handleChange} />
              <InputField label="विषय" name="subject" value={formData.subject} required onChange={handleChange} />
              <InputField label="जॉईनिंग दिनांक" type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required error={errors.joiningDate} />
              <InputField label="लिंग" name="gender" value={formData.gender} onChange={handleChange} required error={errors.gender} />
              <TextareaField
  label="पत्ता"
  name="address"
  value={formData.address}
  onChange={handleChange}
  required
  rows={2}
  maxLength={500}
  error={errors.address}
/>
              <InputField label="संपर्क" name="contact" value={formData.contact} required onChange={handleChange} />
              <InputField label="ईमेल" name="email" value={formData.email} onChange={handleChange} />
              <InputField label="किमान इयत्ता" name="minimumStandard" value={formData.minimumStandard} required onChange={handleChange} />
              <InputField label="कमाल इयत्ता" name="maximumStandard" value={formData.maximumStandard} required onChange={handleChange} />
              <InputField label="जन्मतारीख" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required error={errors.dateOfBirth} />
              <InputField label="जात" name="caste" value={formData.caste} onChange={handleChange} />
              <InputField label="धर्म" name="religion" value={formData.religion} onChange={handleChange} />

              <SelectField label="कर्मचारी प्रकार" name="employeeTypeId" value={formData.employeeTypeId} onChange={handleChange} required error={errors.employeeTypeId} options={employeeTypeOptions} />
              <SelectField label="स्टाफ प्रकार" name="staffTypeId" value={formData.staffTypeId} onChange={handleChange} required error={errors.staffTypeId} options={staffTypeOptions} />
              <SelectField label="शाळा" name="schoolId" value={formData.schoolId} onChange={handleChange} required error={errors.schoolId} options={schoolOptions} />

              
              <SelectField label="धर्म प्रकार" name="religionTypeId" value={formData.religionTypeId} onChange={handleChange} required error={errors.religionTypeId} options={religionOptions} />
              <SelectField label="जात प्रकार" name="casteTypeId" value={formData.casteTypeId} onChange={handleChange} required error={errors.casteTypeId} options={casteTypeOptions} />
            </div>
           <div className="pt-4 flex justify-center gap-x-4">
  {/* Cancel Button */}
  <button
    type="button"
    onClick={() => navigate("/admin/staff-list")}
    className="px-4 py-2 text-lg font-sm text-[#5C4033] border border-[#5C4033] 
    rounded-md shadow-sm hover:bg-gray-100 
    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
  >
    रद्द करा
  </button>
              <button
                type="submit"
                className="px-4 py-2 text-lg font-md text-white bg-[#5C4033] hover:bg-[#4a3328] rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328]"
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

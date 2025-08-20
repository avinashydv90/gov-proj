import { useEffect, useState } from "react";
import { IStudentRegistrationRequest, IStudentUpdationRequest } from "../types/student";
import { useAddStudentMutation, useGetStudentByIdQuery, useUpdateStudentMutation } from "../../services/studentApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageLayout from "../../shared-components/PageLayout";
import InputField from "../InputField";
import SelectField from "../SelectField";
import { useGetAllCasteTypesQuery } from "../../services/StaffService/casteTypeApi";
import { useGetAllReligionTypesQuery } from "../../services/StaffService/religionTypeApi";
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
import { useGetAllStandardsQuery } from "../../services/standardApi";
import { useGetDivisionsByStandardIdQuery } from "../../services/divisionApi";
import TextareaField from "../TextareaField";

const StudentForm: React.FC = () => {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [selectedStandard, setSelectedStandard] = useState<string>("");

  const [formData, setFormData] = useState<IStudentRegistrationRequest>({
    fullName: "",
    dateOfBirth: "",
    grNumber: 0,
    gender: "",
    address: "",
    guardianName: "",
    motherName: "",
    contact: "",
    caste: "",
    casteTypeId: "",
    religion: "",
    religionTypeId: "",
    divisionId: "",
    schoolId: "",
    standardId: "",
  });
  const [registerStudent, { isLoading: isRegistering }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const {data: existingStudent, isLoading: isStudentLoading } = useGetStudentByIdQuery(id!, { skip: !isEditMode });
  const {data:casteType} = useGetAllCasteTypesQuery();
  const {data:religionTypes} = useGetAllReligionTypesQuery();
  const {data:schools}=useGetAllSchoolsQuery();
  const {data:standards}=useGetAllStandardsQuery();

  // Get divisions for selected standard
const { data: divisions } = useGetDivisionsByStandardIdQuery(selectedStandard, {
  skip: !selectedStandard, // skip query if no standard selected
});
// handle standard change
const handleStandardChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const value = e.target.value;
  setSelectedStandard(value);
  setFormData((prev) => ({
    ...prev,
    standardId: value,   // ✅ set standardId in formData
    divisionId: "",      // reset division
  }));
};
console.log("Selected division:", divisions);

useEffect(()=>{
  if (isEditMode && existingStudent) {
    setFormData((prev)=>({
      ...prev,
      ...existingStudent,
      dateOfBirth: existingStudent.dateOfBirth
        ? existingStudent.dateOfBirth.split("T")[0]
        : prev.dateOfBirth || "",
    }));
  }
}, [isEditMode, existingStudent]);

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };
   const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const nameRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.fullName.trim() || !nameRegex.test(formData.fullName)) {
      newErrors.fullName = "Please enter a valid full name.";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Please select date of birth.";
    }
    if (!phoneRegex.test(formData.contact)) {
      newErrors.contact = "Please enter a valid 10-digit phone number.";
    }

    if (Object.keys(newErrors).length) {
      Object.values(newErrors).forEach(msg => toast.error(msg));
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  if (isEditMode && isStudentLoading) {
    return <PageLayout><div className="text-center py-8">Loading...</div></PageLayout>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  if (!validateForm()) return;
    // Ensure dateOfBirth is ISO string
 const preparePayload = (data: typeof formData) => ({
  ...data,
  dateOfBirth: data.dateOfBirth
    ? new Date(data.dateOfBirth).toISOString()
    : "",
 
});

try{
  if (isEditMode && id) {
     const editPayload: IStudentUpdationRequest = {
        ...preparePayload(formData),
        id :id,
    }
    await updateStudent(editPayload).unwrap();
    toast.success("Student updated successfully.");
}
  else {
   const newPayload = preparePayload(formData);
      console.log("Registering new student with payload:", newPayload);
      await registerStudent(newPayload).unwrap();
      toast.success("Student registered successfully.");
      
    setFormData({
      fullName: "",
      dateOfBirth: "",
      grNumber: 0,
      gender: "",
      address: "",
      guardianName: "",
      motherName: "",
      contact: "",
      caste: "",
      casteTypeId: "",
      religion: "",
      religionTypeId: "",
      divisionId: "",
      schoolId: "",
      standardId: "",
    });
  }
  navigate("/admin/student-list", { state: { updated: true } });
} catch (error) {
  console.error("Error in student form submission:", error);
  toast.error("An error occurred while submitting the form. Please try again.");
}
  }
  const casteTypeOptions = casteType?.map(c => ({ id: c.id, name: c.casteName })) || [];
  const religionTypeOptions = religionTypes?.map(r => ({ id: r.id, name: r.name })) || [];
  const schoolOptions = schools?.map(s => ({ id: s.id, name: s.name })) || [];

  return (
  <PageLayout>
   <div className="w-full flex justify-center px-4 py-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
         <h2 className="text-2xl font-bold mb-8 text-center text-[#5C4033]">
            {isEditMode ? "विद्यार्थी संपादित करा" : "विद्यार्थी नोंदणी करा"}
         </h2>
         <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
               <InputField label="पूर्ण नाव" name="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required />
               <InputField label="जन्मतारीख" type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} required />
               <InputField label="जी.आर. क्रमांक" name="grNumber" value={formData.grNumber} onChange={handleChange} type="number" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
               <TextareaField label="पत्ता" name="address" value={formData.address} onChange={handleChange} error={errors.address} required rows={2}/>
               <InputField label="पालकाचे नाव" name="guardianName" value={formData.guardianName} onChange={handleChange} error={errors.guardianName} required />
               <InputField label="आईचे नाव" name="motherName" value={formData.motherName} onChange={handleChange} error={errors.motherName} required />
            </div>
            <div className="grid grid-cols-3 gap-4">
               <InputField label="संपर्क क्रमांक" name="contact" value={formData.contact} onChange={handleChange} error={errors.contact} required />
               <InputField label="जात" name="caste" value={formData.caste} onChange={handleChange} error={errors.caste}  />
               <SelectField  label="जातीचा प्रकार"
                  name="casteTypeId"
                  value={formData.casteTypeId}
                  onChange={handleChange}
                  error={errors.casteTypeId}
                  required
                  options={casteTypeOptions} />
            </div>
            <div className="grid grid-cols-3 gap-4">
               <InputField label="धर्म" name="religion" value={formData.religion} onChange={handleChange} error={errors.religion}  />
               <SelectField  label="धर्म प्रकार"
                  name="religionTypeId"
                  value={formData.religionTypeId}
                  onChange={handleChange}
                  error={errors.religionTypeId}
                  required
                  options={religionTypeOptions} />
                  <SelectField label="शाळा"
                  name="schoolId"
                  value={formData.schoolId}
                  onChange={handleChange}
                  error={errors.schoolId}
                  required
                  options={schoolOptions} />
            </div>
            <div className="grid grid-cols-3 gap-4">
<SelectField
  label="इयत्ता"
  name="standardId"
  required
  value={formData.standardId}
  onChange={handleStandardChange}
  error={errors.standardId}
  options={
    standards?.filter(s => s.id).map(s => ({
      id: s.id!,
      name: s.name,
    })) || []
  }
/>

<SelectField label="विभाग"
name="divisionId"
required
value={formData.divisionId}
onChange={handleChange}
error={errors.divisionId}
disabled={!selectedStandard}
options={
divisions
?.filter((d) => d.id)
.map((d) => ({
id: d.id!, 
name: d.name,
})) || []
} />
<InputField label="लिंग" name="gender" value={formData.gender} onChange={handleChange} error={errors.gender} required />
            </div>

            <div className="pt-4 flex justify-center gap-x-4">
  <button
    type="button"
    onClick={() => navigate("/admin/student-list")}
    className="px-4 py-2 text-lg font-sm text-[#5C4033] border border-[#5C4033] 
    rounded-md shadow-sm hover:bg-gray-100 
    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
  >
    रद्द करा
  </button>
               <button
               type="submit"
               disabled={isRegistering || isUpdating}
               className="px-4 py-2 text-lg font-md text-white bg-[#5C4033] hover:bg-[#4a3328] rounded-md shadow-sm disabled:opacity-50"
               >
               {isRegistering || isUpdating
               ? "प्रक्रिया चालू आहे..."
               : isEditMode
               ? "सुधारणा करा"
               : "नोंदणी करा"}
               </button>
            </div>
         </form>
         <ToastContainer position="top-right" autoClose={3000} />
      </div>
   </div>
</PageLayout>

  );
};
export default StudentForm;

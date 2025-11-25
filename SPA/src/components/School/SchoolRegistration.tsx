import React, { useEffect, useState } from "react";
import {
  useUpdateSchoolMutation,
  useGetSchoolByIdQuery,
  useAddSchoolMutation,
} from "../../services/schoolApi";
import PageLayout from "../../shared-components/PageLayout";
import { ISchoolRegistrationRequest, ISchoolUpdationRequest } from "../types/School";
import { useNavigate, useParams } from "react-router-dom";
import { SchoolType } from "../types/schoolType";
import { useGetAllSchoolTypesQuery } from "../../services/newSchoolTypeApi";
import InputField from "../InputField";
import TextareaField from "../TextareaField";
import AppSnackbar from "../alert/AppSnackbar";

const SchoolRegistrationForm: React.FC = () => {
const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // for edit
  const isEditMode = !!id;

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<ISchoolRegistrationRequest>({
    schoolCode: "",
    clusterCode: "",
    name: "",
    address: "",
    city: "",
    district: "",
    pinCode: "",
    state: "",
    email: "",
    phoneNumber: "",
    lowerStandard: 0,
    higherStandard: 0,
    establishMentDate: "",
    schoolTypeId: "",
  });

  const [registerSchool, { isLoading: isRegistering }] =
    useAddSchoolMutation();
  const { data: schoolTypes, isLoading: isSchoolTypesLoading } =
    useGetAllSchoolTypesQuery();
  const [updateSchool, { isLoading: isUpdating }] = useUpdateSchoolMutation();

  const {
    data: existingSchool,
    isLoading: isSchoolLoading,
    isError: isSchoolError,
  } = useGetSchoolByIdQuery(id!, {
    skip: !isEditMode,
  });
useEffect(() => {
  if (alertMessage) {
    const timer = setTimeout(() => setAlertMessage(null), 2000);
    return () => clearTimeout(timer);
  }
}, [alertMessage]);

  useEffect(() => {
    
    if (isEditMode && existingSchool) {
      setFormData({
        id: existingSchool.id, 
        schoolCode: existingSchool.schoolCode,
        clusterCode: existingSchool.clusterCode,
        name: existingSchool.name,
        address: existingSchool.address,
        city: existingSchool.city,
        district: existingSchool.district,
        pinCode: existingSchool.pinCode,
        state: existingSchool.state,
        email: existingSchool.email,
        phoneNumber: existingSchool.phoneNumber,
        lowerStandard: existingSchool.lowerStandard,
        higherStandard: existingSchool.higherStandard,
        establishMentDate: existingSchool.establishMentDate.split("T")[0],
        schoolTypeId: existingSchool.schoolTypeId,
      });
    }
  }, [isEditMode, existingSchool]);

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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const schoolCodeRegex = /^2\d{10}$/;
    const clusterCodeRegex = /^2\d{9}$/;
    const pinCodeRegex = /^[1-9][0-9]{5}$/;
    const phoneNumberRegex = /^\d{10,11}$/;
    const onlyLettersRegex = /^[A-Za-z\u0900-\u097F\s]+$/;
    const schoolNameRegex = /^[\p{L}\s.'-]+$/u;

   if (formData.name.length > 100) {
  newErrors.name = "शाळेचे नाव 100 अक्षरांपेक्षा कमी असावे.";
  setAlertType("error");
  setAlertMessage(newErrors.name); 
  return false;
}

if (!schoolNameRegex.test(formData.name.trim())) {
  newErrors.name = "शाळेचे नाव फक्त अक्षरे, स्पेस, डॉट (.) आणि विशेष चिन्हे (-, ') असावीत.";
  setAlertType("error");
  setAlertMessage(newErrors.name); 
  return false;
}

    if (!schoolCodeRegex.test(formData.schoolCode.trim())) {
      newErrors.schoolCode = "वैध शाळेचा कोड प्रविष्ट करा ";
      setAlertType("error");
      setAlertMessage(newErrors.schoolCode);
      return false;
    }
    if (!clusterCodeRegex.test(formData.clusterCode.trim())) {
      newErrors.clusterCode = "वैध क्लस्टर कोड प्रविष्ट करा ";
      setAlertType("error");
      setAlertMessage(newErrors.clusterCode);
      return false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "कृपया पत्ता भरा.";
      setAlertType("error");
      setAlertMessage(newErrors.address);
      return false;
    }
   if (!formData.city.trim()) {
  newErrors.city = "कृपया शहर भरा.";
  setAlertType("error");
  setAlertMessage(newErrors.city);
  return false;   
}

if (!onlyLettersRegex.test(formData.city.trim())) {
  newErrors.city =
    "शहर फक्त अक्षरांत असावे. संख्या किंवा विशेष चिन्हे वापरू नका.";
  setAlertType("error");
  setAlertMessage(newErrors.city);
  return false;
}


    if (!formData.district.trim()) {
      newErrors.district = "कृपया जिल्हा भरा.";

      return false;
    } else if (!onlyLettersRegex.test(formData.district.trim())) {
      newErrors.district =
        "जिल्हा फक्त अक्षरांत असावा. संख्या किंवा विशेष चिन्हे वापरू नका.";
     setAlertType("error");
     setAlertMessage(newErrors.district);
      return false;
    }
    if (!pinCodeRegex.test(formData.pinCode.trim())) {
      newErrors.pinCode = "कृपया पिनकोड भरा.";
      setAlertType("error");
      setAlertMessage(newErrors.pinCode);
      return false;
    }
    if (!formData.state.trim()) {
      newErrors.state = "कृपया राज्य भरा.";

      return false;
    } else if (!onlyLettersRegex.test(formData.state.trim())) {
      newErrors.state =
        "राज्य फक्त अक्षरांत असावे. संख्या किंवा विशेष चिन्हे वापरू नका.";
      setAlertType("error");
      setAlertMessage(newErrors.state);
      return false;
    }
    if (formData.email && !emailRegex.test(formData.email.trim())) {
      newErrors.email = "कृपया वैध ईमेल पत्ता भरा.";
      setAlertType("error");
      setAlertMessage(newErrors.email);
      return false;
    }
    if (
      formData.phoneNumber &&
      !phoneNumberRegex.test(formData.phoneNumber.trim())
    ) {
      newErrors.phoneNumber = "कृपया वैध फोन क्रमांक भरा.";
     setAlertType("error");
      setAlertMessage(newErrors.phoneNumber);
      return false;
    }
    if (formData.higherStandard < formData.lowerStandard) {
      newErrors.higherStandard =
        "वरची इयत्ता खालच्या इयत्तेपेक्षा मोठी किंवा समान असावी.";

      return false;
    } else if (formData.higherStandard > 12) {
      newErrors.higherStandard = "वरची इयत्ता १२ पेक्षा जास्त नसावी.";
      setAlertType("error");
      setAlertMessage(newErrors.higherStandard);
      return false;
    }
    if (!formData.schoolTypeId ) {
      newErrors.schoolTypeId = "कृपया शाळेचा प्रकार निवडा.";
      setAlertType("error");
      setAlertMessage(newErrors.schoolTypeId);
      return false;
    }

   if (Object.keys(newErrors).length > 0) {
  const firstErrorField = Object.keys(newErrors)[0];

  const el = document.getElementById(firstErrorField);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });

  const errorMsg = Object.values(newErrors)[0]; // ⭐ first error only
  setAlertType("error");
  setAlertMessage(errorMsg);

  return false;
}

return true;

  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
     if(isEditMode && id)
    {
       const updatePayLoad: ISchoolUpdationRequest={
      
        ...formData,
        establishMentDate: new Date(formData.establishMentDate).toISOString(),
        id
       };
      await updateSchool(updatePayLoad);
      setAlertType("success");
      setAlertMessage("विद्यालय यशस्वीरित्या अपडेट झाले!");
      }
      else {
         const registerPayload: ISchoolRegistrationRequest = {
           ...formData,
    establishMentDate: new Date(formData.establishMentDate).toISOString()
      };
        await registerSchool(registerPayload).unwrap();
        setAlertType("success");
       setAlertMessage("विद्यालय यशस्वीरित्या नोंदणीकृत झाले!");
          setFormData({
          schoolCode: "",
          clusterCode: "",
          name: "",
          address: "",
          city: "",
          district: "",
          pinCode: "",
          state: "",
          email: "",
          phoneNumber: "",
          lowerStandard: 0,
          higherStandard: 0,
          establishMentDate: "",
          schoolTypeId: "",
        });
      }
setTimeout(() => {
  navigate("/admin/school-list", { state: { updated: true } });
}, 1500);


     
    } catch (error : any) {
     setAlertType("error");
      setAlertMessage("शाळा नोंदवताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा." + error.message);
    }
  };

  if (isEditMode && (isSchoolLoading || !existingSchool)) {
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
        <AppSnackbar
  open={!!alertMessage}
  message={alertMessage}
  type={alertType}
  onClose={() => setAlertMessage(null)}
/>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto ">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#5C4033]">
            {isEditMode ? "शाळा माहिती संपादित करा" : "शाळा नोंदणी फॉर्म"}
          </h2>

     
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="शाळेचा कोड"
                name="schoolCode"
                value={formData.schoolCode}
                onChange={handleChange}
                maxLength={11}
                required
                error={errors.schoolCode}
              />
              <InputField
                label="क्लस्टर कोड"
                name="clusterCode"
                value={formData.clusterCode}
                onChange={handleChange}
                maxLength={10}
                required
                error={errors.clusterCode}
              />
              <InputField
                label="शाळेचे नाव"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={250}
                required
                error={errors.name}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Keep textarea as-is */}
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
             
              <InputField
                label="शहर "
                name="city"
                value={formData.city}
                onChange={handleChange}
                maxLength={50}
                required
                error={errors.city}
              />
              <InputField
                label="जिल्हा "
                name="district"
                value={formData.district}
                onChange={handleChange}
                maxLength={50}
                required
                error={errors.district}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <InputField
                label="पिनकोड "
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                maxLength={6}
                required
                error={errors.pinCode}
              />
              <InputField
                label="राज्य "
                name="state"
                value={formData.state}
                onChange={handleChange}
                maxLength={50}
                required
                error={errors.state}
              />
              <InputField
                label="शाळेचा ई-मेल "
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={100}
                error={errors.email}
              />
            </div>

            <div className="grid grid-cols-5 gap-4">
              <InputField
                label="फोन क्रमांक "
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength={11}
                error={errors.phoneNumber}
              />

              {/* Keep date input as-is */}
              <div>
                <label
                  htmlFor="establishMentDate"
                  className="block text-md font-bold text-[#5C4033]"
                >
                  शाळा स्थापन दिनांक :
                </label>
                <input
                  type="date"
                  id="establishMentDate"
                  name="establishMentDate"
                  value={formData.establishMentDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  className={`mt-1 block w-full rounded-md border text-sm font-semibold shadow-sm p-2 bg-white/90
        ${
          errors.establishMentDate
            ? "border-red-500 focus:border-red-600 focus:ring-red-600"
            : "border-[#5C4033] focus:border-[#4a3328] focus:ring-[#4a3328]"
        }`}
                />
                {errors.establishMentDate && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.establishMentDate}
                  </p>
                )}
              </div>

              <InputField
                label="सर्वात खालची इयत्ता "
                name="lowerStandard"
                value={formData.lowerStandard}
                onChange={handleChange}
                maxLength={2}
                required
                error={errors.lowerStandard}
              />
              <InputField
                label="सर्वात वरची इयत्ता "
                name="higherStandard"
                value={formData.higherStandard}
                onChange={handleChange}
                maxLength={2}
                required
                error={errors.higherStandard}
              />

              {/* Keep select dropdown as-is */}
              <div>
                <label
                  htmlFor="schoolTypeId"
                  className="block text-md font-bold text-[#5C4033]"
                >
                  शाळेचा प्रकार * :
                </label>
                <select
                  id="schoolTypeId"
                  name="schoolTypeId"
                  value={formData.schoolTypeId}
                  onChange={handleChange}
                  required
                  className="mt-1 block rounded-md text-sm font-semibold border border-[#5C4033] shadow-sm focus:border-[#4a3328] focus:ring-[#4a3328] p-2 bg-white/90"
                >
                  <option value={0}>-- शाळेचा प्रकार निवडा --</option>
                  {isSchoolTypesLoading ? (
                    <option disabled>लोड करत आहे...</option>
                  ) : (
                    schoolTypes?.map((type: SchoolType) => (
                      <option key={type.id} value={type.id}>
                        {type.type}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-center p-4 gap-x-4">
                 <button
        type="button"
        onClick={() => navigate("/admin/school-list")} // 👈 replace with your actual list route
        className="px-4 py-2 text-lg font-sm text-[#5C4033] border border-[#5C4033] 
        rounded-md shadow-sm hover:bg-gray-100 
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
      >
        रद्द करा
      </button>
              <button
                type="submit"
                disabled={isRegistering || isUpdating}
                className="px-4 py-2 text-lg font-sm text-white bg-[#5C4033] hover:bg-[#4a3328] 
      rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed 
      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328]"
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

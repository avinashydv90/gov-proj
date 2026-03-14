import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICreateStandardDto, IUpdateStandardDto } from "../types/standard";
import {
  useCreateStandardMutation,
  useGetStandardByIdQuery,
  useUpdateStandardMutation,
} from "../../services/standardApi";
import {  useGetSchoolByIdQuery } from "../../services/schoolApi";
import PageLayout from "../../shared-components/PageLayout";
import AppSnackbar from "../alert/AppSnackbar";
import { getSchoolIdFromToken } from "../../constants/authUtils";


const StandardForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | "info" | "warning">("info");
  const navigate = useNavigate();
  const { standardId } = useParams<{ standardId: string }>();
  const isEditMode = !!standardId;

  const schoolIdFromToken = getSchoolIdFromToken();

  const [formData, setFormData] = useState<ICreateStandardDto>({
    name: "",
    schoolId: "",
  });

  const [addStandard, { isLoading: isAdding }] = useCreateStandardMutation();
  const [updateStandard, { isLoading: isUpdating }] =  useUpdateStandardMutation();
  //const { data: schools = [] } = useGetAllSchoolsQuery();
  const { data: school } = useGetSchoolByIdQuery(schoolIdFromToken, {
    skip: !schoolIdFromToken,
  });

  const {
    data: existingStandard,
    isLoading: isStandardLoading,
    isError: isStandardError,
    isSuccess: isStandardSuccess,
  } = useGetStandardByIdQuery(String(standardId), { skip: !isEditMode });

  useEffect(() => {
  if (schoolIdFromToken && !isEditMode) {
    setFormData((prev) => ({
      ...prev,
      schoolId: schoolIdFromToken,
    }));
  }
}, [schoolIdFromToken, isEditMode]);
  useEffect(() => {
  if (alertMessage) {
    const timer = setTimeout(() => setAlertMessage(null), 2000);
    return () => clearTimeout(timer);
  }
}, [alertMessage]);


  useEffect(() => {
    if (isEditMode && isStandardSuccess && existingStandard) {
      setFormData({
        name: existingStandard.name,
        schoolId: existingStandard.schoolId,
      });
    }
  }, [isEditMode, isStandardSuccess, existingStandard]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    try {
      if (isEditMode && standardId) {
        const updatePayLoad:IUpdateStandardDto ={
          id: standardId,
          ...formData,
        }
        await updateStandard(updatePayLoad).unwrap();
        setAlertType("success");
        setAlertMessage("इयत्ता यशस्वीरित्या अपडेट झाली.");
      } else {
        const createPayload: ICreateStandardDto = {
          ...formData,
        };
        await addStandard(createPayload).unwrap();
        setAlertType("success");
        setAlertMessage("इयत्ता यशस्वीरित्या नोंदवली गेली.");
        setFormData({ name: "", schoolId: "" });
      }
      setTimeout(() => {
 navigate("/admin/standard-list");
}, 1800);

      
    } catch (err) {
      setAlertType("error");
      setAlertMessage("काहीतरी चुकले आहे. कृपया पुन्हा प्रयत्न करा." + (err as any).message);
    }
  };

  if (isEditMode && isStandardLoading) {
    return (
      <PageLayout>
        <div className="text-center py-8">लोड करत आहे...</div>
      </PageLayout>
    );
  }

  if (isEditMode && isStandardError) {
    return (
      <PageLayout>
        <div className="text-center py-8 text-red-600">
          इयत्ता माहिती मिळवण्यात त्रुटी.
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
      <div className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold text-[#5E3023]">
      
      </div>

      <div className=" w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto h-[60vh]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode ? "इयत्ता संपादित करा" : "इयत्ता नोंदणी फॉर्म"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-[#5C4033]"
              >
                इयत्ता नाव *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-lg font-sm border-[#5C4033] p-2"
              />
            </div>

            <div>
              <label
                htmlFor="schoolId"
                className="block text-sm font-bold text-[#5C4033]"
              >
                शाळा निवडा *
              </label>
              <select
                id="schoolId"
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-lg font-sm border-[#5C4033] p-2"
              >
                {/* <option value="">शाळा निवडा</option>
                {/* {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))} */}
                                {school && (
                  <option value={school.id}>
                    {school.name}
                  </option>
                )}

              </select>
            </div>

            <div className="p-4 flex justify-center gap-x-4">
              <button
  type="button"
  onClick={() => navigate("/admin/standard-list")}
  className="mr-4 px-4 py-2 text-lg font-sm text-[#5C4033] border border-[#5C4033] 
  rounded-md shadow-sm hover:bg-gray-100 
  transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
>
  रद्द करा
</button>
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className=" py-2 px-4 rounded-md text-lg font-sm text-white bg-[#5C4033] hover:bg-[#4a3328]"
              >
                {isAdding || isUpdating
                  ? "प्रक्रिया सुरू आहे..."
                  : isEditMode
                  ? "अपडेट करा"
                  : "इयत्ता नोंदणी करा"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default StandardForm;

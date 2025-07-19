import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Standard } from "../types/standard";
import {
  useCreateStandardMutation,
  useGetStandardByIdQuery,
  useUpdateStandardMutation,
} from "../../services/standardApi";
import { useGetAllSchoolsQuery } from "../../services/schoolApi";
import PageLayout from "../../shared-components/PageLayout";
import ButtonList from "../ButtonList";

const StandardForm: React.FC = () => {
  const navigate = useNavigate();
  const { standardId } = useParams<{ standardId: string }>();
  const isEditMode = !!standardId;

  const [formData, setFormData] = useState<Omit<Standard, "id">>({
    std: "",
    schoolId: "",
  });

  const [addStandard, { isLoading: isAdding }] = useCreateStandardMutation();
  const [updateStandard, { isLoading: isUpdating }] =
    useUpdateStandardMutation();
  const { data: schools = [] } = useGetAllSchoolsQuery();

  const {
    data: existingStandard,
    isLoading: isStandardLoading,
    isError: isStandardError,
    isSuccess: isStandardSuccess,
  } = useGetStandardByIdQuery(Number(standardId), { skip: !isEditMode });

  useEffect(() => {
    if (isEditMode && isStandardSuccess && existingStandard) {
      setFormData({
        std: existingStandard.std || "",
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
        await updateStandard({
          id: Number(standardId),
          data: formData,
        }).unwrap();
        toast.success("इयत्ता यशस्वीरित्या अपडेट झाली.");
      } else {
        await addStandard(formData).unwrap();
        toast.success("इयत्ता यशस्वीरित्या नोंदवली गेली.");
        setFormData({ std: "", schoolId: "" });
      }
      navigate("/standard-list");
    } catch (err) {
      console.error("त्रुटी:", err);
      toast.error("प्रक्रिया अयशस्वी");
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
      <div className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold text-[#5E3023]">
        <ButtonList
          buttons={[
            { label: "इयत्ता यादी", onClick: () => navigate("/standard-list") },
          ]}
        />
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto h-[60vh]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode ? "इयत्ता संपादित करा" : "इयत्ता नोंदणी फॉर्म"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="std"
                className="block text-sm font-bold text-[#5C4033]"
              >
                इयत्ता नाव *
              </label>
              <input
                type="text"
                id="std"
                name="std"
                value={formData.std}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
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
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              >
                <option value="">शाळा निवडा</option>
                {schools.map((school) => (
                  <option key={school.id} value={school.id}>
                    {school.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className="w-full py-2 px-4 rounded-md text-lg font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328]"
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

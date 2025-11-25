import { useForm } from "react-hook-form";
import { IStaffType } from "../types/IStaffType";
import {
  useCreateStaffTypeMutation,
  useGetStaffTypeByIdQuery,
  useUpdateStaffTypeMutation,
} from "../../services/StaffService/staffTypeApi";
import { useEffect, useState } from "react";
import PageLayout from "../../shared-components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import AppSnackbar from "../alert/AppSnackbar";

const StaffTypeForm: React.FC = () => {
  const [alertMessage, setAlertMessage] =  useState<string | null>(null);
  const [alertType, setAlertType] =  useState<"success" | "error" | "info" | "warning">("info");
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStaffType>({
    defaultValues: {
      name: "",
    },
  });

  const { data, isLoading: isFetching } = useGetStaffTypeByIdQuery(id!, {
    skip: !isEditMode,
  });
  const [addStaffType, { isLoading: isAdding }] = useCreateStaffTypeMutation();
  const [updateStaffType, { isLoading: isUpdating }] = useUpdateStaffTypeMutation();

  const navigate = useNavigate();
  useEffect(() => {
  if (alertMessage) {
    const timer = setTimeout(() => setAlertMessage(null), 2000);
    return () => clearTimeout(timer);
  }
}, [alertMessage]);


  useEffect(() => {
    if (data) {
      reset({ name: data.name });
    }
  }, [data, reset]);

  const onSubmit = async (formData: IStaffType) => {
    try {
      if (isEditMode) {
        await updateStaffType({ ...formData, id: id! }).unwrap();
        setAlertType("success");
        setAlertMessage("स्टाफ प्रकार यशस्वीरित्या अद्ययावत केला.");   
      } else {
        await addStaffType(formData).unwrap();
        setAlertType("success");
        setAlertMessage("स्टाफ प्रकार यशस्वीरित्या तयार केला.");
        reset({ name: "" });
      }
setTimeout(() => {
  navigate("/admin/stafftype-list");
}, 1200);

      
    } catch (error) {
      setAlertType("error");
      setAlertMessage("स्टाफ प्रकार तयार करण्यात अडचण आली." + (error as any).message);
     
    }
  };

  const handleCancel = () => {
    navigate("/admin/stafftype-list");
  };

  const isSubmitting = isAdding || isUpdating || isFetching;

  return (
    <PageLayout>
      <AppSnackbar
        open={!!alertMessage}
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage(null)}
      />
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode ? "स्टाफ प्रकार अद्ययावत करा" : "नवीन स्टाफ प्रकार तयार करा"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-md font-bold text-[#5C4033] mb-1">
                स्टाफ प्रकारचे नाव *
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "स्टाफ प्रकार आवश्यक आहे",
                  maxLength: { value: 50, message: "कमाल ५० अक्षरे अनुमत आहेत." },
                })}
                placeholder="स्टाफ प्रकाराचे नाव टाका"
                disabled={isSubmitting}
                className={`mt-1 block w-full rounded-md border shadow-sm font-sm text-lg p-2 form-control ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:border-[#5C4033] focus:ring focus:ring-[#5C4033] focus:ring-opacity-50 text-gray-700`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-md font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
                disabled={isSubmitting}
              >
                रद्द करा
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-md font-bold text-white bg-[#5C4033] hover:bg-[#4a3328] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {isUpdating ? "अद्ययावत करत आहे..." : "जतन करत आहे..."}
                  </span>
                ) : isEditMode ? "अद्ययावत करा" : "जतन करा"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default StaffTypeForm;

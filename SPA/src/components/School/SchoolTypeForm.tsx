
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {  useNavigate, useParams } from 'react-router-dom';
import { useCreateSchoolTypeMutation, useGetSchoolTypeByIdQuery, useUpdateSchoolTypeMutation } from '../../services/newSchoolTypeApi';
import { CreateSchoolTypeRequest } from '../types/schoolType';
import { toast, ToastContainer } from 'react-toastify';
import PageLayout from '../../shared-components/PageLayout';
import 'react-toastify/dist/ReactToastify.css';



const SchoolTypeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSchoolTypeRequest>();

  const { data: schoolTypeData, isLoading: isLoadingSchoolType  } = useGetSchoolTypeByIdQuery(id!, {
    skip: !isEditMode,
  });

 const [addSchoolType, { isLoading: isAdding }] = useCreateSchoolTypeMutation();
  const [updateSchoolType, { isLoading: isUpdating}] = useUpdateSchoolTypeMutation();


  useEffect(() => {
    if (schoolTypeData && isEditMode) {
      reset({ type: schoolTypeData.type });
    }
  }, [schoolTypeData, isEditMode, reset]);

  const onSubmit = async (formData: CreateSchoolTypeRequest) => {
    try {
      if (isEditMode && id) {
        
        await updateSchoolType({ ...formData, id });

        //await refetch();
        toast.success('School type updated successfully');
        navigate("/admin/schooltype-list")
       
      } else {
        await addSchoolType(formData);
        toast.success('School type created successfully');
        navigate("/admin/schooltype-list")
        
      }
     
    } catch (err: any) {

    if (err?.status === 'PARSING_ERROR') {
      console.error("Parsing error:", err);
      toast.error("Server returned invalid response. Check backend logs.");
    } else if (err?.data?.message) {
      toast.error(err.data.message);
    } else {
      console.error("Unknown error:", err);
      toast.error("An error occurred while submitting the form.");
  }
}
  
  };
  if (isLoadingSchoolType && isEditMode) {
    return <p>Loading...</p>;
  }


  return (

 <PageLayout>
      <div className="w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
           {isEditMode ? "शाळेचा प्रकार संपादित करा" : "नवीन शाळेचा प्रकार तयार करा"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-lg font-bold text-[#5C4033] mb-1">
                शाळेचा प्रकाराचे नाव *
              </label>
              <input
                type="text"
                id="type"
                {...register("type", { required: "शाळेचा प्रकार आवश्यक आहे" })}
                placeholder="शाळेचा प्रकाराचे नाव टाका"
                required
                maxLength={50}
                disabled={isAdding || isUpdating}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-lg font-sm
                  focus:border-[#5C4033] focus:ring focus:ring-[#5C4033] focus:ring-opacity-50
                  p-2 border text-gray-700"
              />
               {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/schooltype-list")}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg 
                  font-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-[#5C4033]"
                disabled={isAdding || isUpdating}
              >
                 रद्द करा
              </button>
              <button
                type="submit"
                disabled={isAdding || isUpdating}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm 
                  text-lg font-sm text-white bg-[#5C4033] hover:bg-[#4a3328] 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a3328]
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding || isUpdating ? (
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
                    {isEditMode ? "अपडेट करत आहे..." : "तयार करत आहे..."}
                  </span>
                ) :isEditMode ? "अपडेट करा" : "तयार करा"}
              </button>
            </div>
          </form>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </div>
    </PageLayout>
  );
};

export default SchoolTypeForm;




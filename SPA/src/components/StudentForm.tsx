import React, { useEffect, useState } from "react";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "../services/studentApi";
import PageLayout from "../shared-components/PageLayout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Student } from "./types/student";
import { useGetAllSchoolsQuery } from "../services/schoolApi";
import { useGetAllStandardsQuery } from "../services/standardApi_old";
import { useGetAllDivisionsQuery } from "../services/divisionApi";
// import { useGetDivisionsByStandardIdQuery } from "../services/divisionApi";

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    standardId: "",
    divisionId: "",
    schoolId: "",
    parentName: "",
    parentContact: "",
    rollNumber: 0,
  });

  const [addStudent, { isLoading: isRegistering }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const { data: schools = [] } = useGetAllSchoolsQuery();

  const { data: divisions = [], refetch: divisionRefetch } =
    useGetAllDivisionsQuery();

  const { data: standards = [], refetch: standardReftech } =
    useGetAllStandardsQuery();

  const {
    data: existingStudent,
    isSuccess,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useGetStudentByIdQuery(Number(id), { skip: !isEditMode });

  useEffect(() => {
    if (isEditMode && isSuccess && existingStudent) {
      setFormData({
        firstName: existingStudent.firstName,
        lastName: existingStudent.lastName,
        dateOfBirth: existingStudent.dateOfBirth.split("T")[0],
        gender: existingStudent.gender,
        address: existingStudent.address,
        divisionId: existingStudent.divisionId,
        schoolId: existingStudent.schoolId,
        parentName: existingStudent.parentName,
        parentContact: existingStudent.parentContact,
        rollNumber: existingStudent.rollNumber,
        standardId: "",
      });
    }
  }, [isEditMode, isSuccess, existingStudent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    standardReftech();
    divisionRefetch();
    setFormData((prev) => ({
      ...prev,
      [name]: ["rollNo"].includes(name) ? Number(value) : value,
    }));
  };

  // const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = e.target;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && id) {
        await updateStudent({ id: Number(id), data: formData }).unwrap();
        toast.success("विद्यार्थ्याची माहिती यशस्वीरित्या अपडेट झाली.");
      } else {
        await addStudent(formData).unwrap();
        toast.success("विद्यार्थी यशस्वीरित्या नोंदवला गेला.");
        setFormData({
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          divisionId: "",
          schoolId: "",
          parentName: "",
          parentContact: "",
          rollNumber: 0,
          standardId: "",
        });
      }
      navigate("/admin/student-list");
    } catch (err) {
      console.error("अपडेट अयशस्वी:", err);
      toast.error("अपडेट अयशस्वी");
    }
  };

  if (isEditMode && isStudentLoading) {
    return (
      <PageLayout>
        <div className="text-center py-8">लोड करत आहे...</div>
      </PageLayout>
    );
  }

  if (isEditMode && isStudentError) {
    return (
      <PageLayout>
        <div className="text-center py-8 text-red-600">
          विद्यार्थ्याची माहिती मिळवण्यात त्रुटी.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className=" w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto h-[80vh]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode
              ? "विद्यार्थी माहिती संपादित करा"
              : "विद्यार्थी नोंदणी फॉर्म"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-bold text-[#5C4033]"
              >
                पहिले नाव *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-bold text-[#5C4033]"
              >
                आड नाव *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-bold text-[#5C4033]"
              >
                जन्म तारीख *
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>
            <div>
              <label
                htmlFor="rollNumber"
                className="block text-sm font-bold text-[#5C4033]"
              >
                विद्यार्थी क्रमांक *
              </label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-bold text-[#5C4033]"
              >
                लिंग *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              >
                <option value="">लिंग निवडा</option>
                <option value="male">पुरुष</option>
                <option value="female">स्त्री</option>
              </select>
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
                rows={3}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>

            <div>
              <label
                htmlFor="parentName"
                className="block text-sm font-bold text-[#5C4033]"
              >
                वडिलांचे नाव *
              </label>
              <textarea
                id="parentName"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                rows={3}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>
            <div>
              <label
                htmlFor="parentContact"
                className="block text-sm font-bold text-[#5C4033]"
              >
                संपर्क *
              </label>
              <textarea
                id="parentContact"
                name="parentContact"
                value={formData.parentContact ?? ""}
                onChange={handleChange}
                rows={3}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div>

            <div>
              <label
                htmlFor="schoolId"
                className="block text-sm font-bold text-[#5C4033]"
              >
                शाळा क्रमांक *
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

            <div>
              <label
                htmlFor="standardId"
                className="block text-sm font-bold text-[#5C4033]"
              >
                Standard
              </label>
              <select
                id="standardId"
                name="standardId"
                value={formData.standardId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              >
                <option value="">इयत्ता निवडा</option>
                {standards.map((standard) => (
                  <option key={standard.id} value={standard.id}>
                    {standard.std}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="divisionId"
                className="block text-sm font-bold text-[#5C4033]"
              >
                विभाग *
              </label>
              <select
                id="divisionId"
                name="divisionId"
                value={formData.divisionId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              >
                <option value="">विभाग निवडा</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div>
              <label
                htmlFor="schoolId"
                className="block text-sm font-bold text-[#5C4033]"
              >
                शाळा क्रमांक *
              </label>
              <input
                type="text"
                id="schoolId"
                name="schoolId"
                value={formData.schoolId}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              />
            </div> */}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isRegistering || isUpdating}
                className="w-full py-2 px-4 rounded-md text-lg font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328]"
              >
                {isRegistering || isUpdating
                  ? "प्रक्रिया सुरू आहे..."
                  : isEditMode
                  ? "अपडेट करा"
                  : "विद्यार्थी नोंदणी करा"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default StudentForm;

// import React, { useEffect, useState } from "react";
// import {
//   useAddStudentMutation,
//   useUpdateStudentMutation,
//   useGetStudentByIdQuery,
// } from "../services/studentApi";
// import PageLayout from "../shared-components/PageLayout";
// import ButtonList from "./ButtonList";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import { Student } from "./types/student";

// const StudentForm: React.FC = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const isEditMode = !!id;

//   const [formData, setFormData] = useState<Omit<Student, "id">>({
//     name: "",
//     dateOfBirth: "",
//     address: "",
//     division: "",
//   standard: 0,
//   });

//   const [addStudent, { isLoading: isRegistering }] = useAddStudentMutation();
//   const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

//   const {
//     data: existingStudent,
//     isSuccess,
//     isLoading: isStudentLoading,
//     isError: isStudentError,
//   } = useGetStudentByIdQuery(Number(id), { skip: !isEditMode });

//   useEffect(() => {
//     if (isEditMode && isSuccess && existingStudent) {
//       setFormData({
//         name: existingStudent.name,
//         dateOfBirth: existingStudent.dateOfBirth.split("T")[0],
//         address: existingStudent.address,
//         division: existingStudent.division,
//         standard: existingStudent.standard,
//       });
//     }
//   }, [isEditMode, isSuccess, existingStudent]);

// const handleChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// ) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: name === "standard" ? Number(value) : value,
//   }));
// };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (isEditMode && id) {
//         await updateStudent({ id: Number(id), ...formData }).unwrap();
//         toast.success("विद्यार्थ्याची माहिती यशस्वीरित्या अपडेट झाली.");
//       } else {
//         await addStudent(formData).unwrap();
//         toast.success("विद्यार्थी यशस्वीरित्या नोंदवला गेला.");
//         setFormData({ name: "", dateOfBirth: "", address: "", division:"", standard: 0 });
//       }
//       navigate("/student-list");
//     } catch (err) {
//       console.error("अपडेट अयशस्वी:", err);
//       toast.error("अपडेट अयशस्वी");
//     }
//   };

//   if (isEditMode && isStudentLoading) {
//     return (
//       <PageLayout>
//         <div className="text-center py-8">लोड करत आहे...</div>
//       </PageLayout>
//     );
//   }

//   if (isEditMode && isStudentError) {
//     return (
//       <PageLayout>
//         <div className="text-center py-8 text-red-600">विद्यार्थ्याची माहिती मिळवण्यात त्रुटी.</div>
//       </PageLayout>
//     );
//   }

//   return (
//     <PageLayout>
//       <div className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold text-[#5E3023]">
//         <ButtonList buttons={[{ label: "विद्यार्थी यादी", onClick: () => navigate("/student-list") }]} />
//       </div>

//       <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-6">
//         <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto h-[80vh]">
//           <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
//             {isEditMode ? "विद्यार्थी माहिती संपादित करा" : "विद्यार्थी नोंदणी फॉर्म"}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-bold text-[#5C4033]">पूर्ण नाव *</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
//               />
//             </div>

//             <div>
//               <label htmlFor="dateOfBirth" className="block text-sm font-bold text-[#5C4033]">जन्मतारीख *</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 max={new Date().toISOString().split("T")[0]}
//                 required
//                 className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
//               />
//             </div>

//             <div>
//               <label htmlFor="standardId" className="block text-sm font-bold text-[#5C4033]">इयत्ता *</label>
//               <input
//                 type="number"
//                 id="standard"
//                 name="standard"
//                 value={formData.standard}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
//               />
//             </div>

//             <div>
//               <label htmlFor="divisionId" className="block text-sm font-bold text-[#5C4033]">विभाग *</label>
//               <input
//                 type="text"
//                 id="division"
//                 name="division"
//                 value={formData.division}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-bold text-[#5C4033]">पत्ता *</label>
//               <textarea
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 rows={3}
//                 required
//                 className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
//               />
//             </div>

//             <div className="pt-4">
//               <button
//                 type="submit"
//                 disabled={isRegistering || isUpdating}
//                 className="w-full py-2 px-4 rounded-md text-lg font-semibold text-white bg-[#5C4033] hover:bg-[#4a3328]"
//               >
//                 {isRegistering || isUpdating
//                   ? "प्रक्रिया सुरू आहे..."
//                   : isEditMode
//                   ? "अपडेट करा"
//                   : "विद्यार्थी नोंदणी करा"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </PageLayout>
//   );
// };

// export default StudentForm;

import React, { useEffect, useState } from "react";
import {
  useAddStudentMutation,
  useUpdateStudentMutation,
  useGetStudentByIdQuery,
} from "../services/studentApi";
import { useGetAllStandardsQuery } from "../services/standardApi";
import { useGetDivisionsByStandardIdQuery } from "../services/divisionApi";
import PageLayout from "../shared-components/PageLayout";
import ButtonList from "./ButtonList";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Student } from "./types/student";

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Omit<Student, "id">>({
    name: "",
    dateOfBirth: "",
    address: "",
    standard: 0,
    divisionId: 0,
  });

  const [addStudent, { isLoading: isRegistering }] = useAddStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();

  const {
    data: existingStudent,
    isSuccess: isStudentLoaded,
    isLoading: isStudentLoading,
    isError: isStudentError,
  } = useGetStudentByIdQuery(Number(id), { skip: !isEditMode });

  const {
    data: standards = [],
    isLoading: isStandardsLoading,
    isError: isStandardsError,
  } = useGetAllStandardsQuery();

  const { data: divisions = [], isFetching: isDivisionsLoading } =
    useGetDivisionsByStandardIdQuery(formData.standard, {
      skip: !formData.standard,
    });

  useEffect(() => {
    if (isEditMode && isStudentLoaded && existingStudent) {
      setFormData({
        name: existingStudent.name,
        dateOfBirth: existingStudent.dateOfBirth.split("T")[0],
        address: existingStudent.address,
        standard: existingStudent.standard,
        divisionId: existingStudent.divisionId,
      });
    }
  }, [isEditMode, isStudentLoaded, existingStudent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "standard" || name === "divisionId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.standard || !formData.divisionId) {
      toast.error("इयत्ता आणि विभाग निवडणे आवश्यक आहे.");
      return;
    }

    try {
      if (isEditMode && id) {
        await updateStudent({ id: Number(id), ...formData }).unwrap();
        toast.success("विद्यार्थ्याची माहिती यशस्वीरित्या अपडेट झाली.");
      } else {
        await addStudent(formData).unwrap();
        toast.success("विद्यार्थी यशस्वीरित्या नोंदवला गेला.");
        setFormData({
          name: "",
          dateOfBirth: "",
          address: "",
          standard: 0,
          divisionId: 0,
        });
      }
      navigate("/student-list");
    } catch (err) {
      console.error("Error while saving student:", err);
      toast.error("अपडेट अयशस्वी");
    }
  };

  if (isStudentLoading || isStandardsLoading) {
    return (
      <PageLayout>
        <div className="text-center py-8">लोड करत आहे...</div>
      </PageLayout>
    );
  }

  if (isStandardsError) {
    return (
      <PageLayout>
        <div className="text-center py-8 text-red-600">
          इयत्ता डेटा मिळवण्यात त्रुटी.
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-3 px-4 inline-flex items-center gap-x-2 text-xl font-semibold text-[#5E3023]">
        <ButtonList
          buttons={[
            {
              label: "विद्यार्थी यादी",
              onClick: () => navigate("/student-list"),
            },
          ]}
        />
      </div>

      <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-8 border border-gray-200 overflow-auto h-[80vh]">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#5C4033]">
            {isEditMode
              ? "विद्यार्थी माहिती संपादित करा"
              : "विद्यार्थी नोंदणी फॉर्म"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-[#5C4033]"
              >
                पूर्ण नाव *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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
                जन्मतारीख *
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
                htmlFor="standard"
                className="block text-sm font-bold text-[#5C4033]"
              >
                इयत्ता *
              </label>
              <select
                id="standard"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border text-sm font-semibold border-[#5C4033] p-2"
              >
                <option value={0}>इयत्ता निवडा</option>
                {standards.map((std) => (
                  <option key={std.id} value={std.id}>
                    {std.std}
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
                disabled={!formData.standard}
                required
                className={`mt-1 block w-full rounded-md border text-sm font-semibold p-2 ${
                  formData.standard
                    ? "border-[#5C4033]"
                    : "border-gray-300 bg-gray-100 text-gray-500"
                }`}
              >
                <option value={0}>विभाग निवडा</option>
                {divisions.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name}
                  </option>
                ))}
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

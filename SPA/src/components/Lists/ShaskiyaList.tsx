// import React from "react";

// // type Hostel = {
// //   id: number;
// //   school_name: string;
// //   taluka: string;
// //   district: string;
// //   principal: {
// //     name: string;
// //     contact: string;
// //   };
// //   superintendent: {
// //     name: string;
// //     contact: string;
// //   };
// //   female_superintendent: {
// //     name: string;
// //     contact: string;
// //   };
// //   email: string;
// // };
// interface ShaskiyaSchool {
//   id: number;
//   schoolName: string;
//   city: string;
//   district: string;
//   principalName: string;
//   contact: string;
//   superintendantName: string;
//   contact2: string;
//   femaleSuperintendantName: string;
//   contact3: string;
//   schoolEmail: string;
// }

// const ShaskiyaList: React.FC<{
//   data: ShaskiyaSchool[];
//   selectedId: number | null;
//   onSelect: (id: number | null) => void;
// }> = ({ data, selectedId, onSelect }) => {
//   const selected = data.find((item) => item.id === selectedId);

//   if (selectedId && selected) {
//     return (
//       <div>
//         <h2 className="text-2xl font-bold text-[#5E3023] mb-2">
//           {selected.schoolName}
//         </h2>

//         <p className="text-gray-700 mb-1">
//           <strong>तालुका:</strong> {selected.city}
//         </p>
//         <p className="text-gray-700 mb-1">
//           <strong>जिल्हा:</strong> {selected.district}
//         </p>
//         <p className="text-gray-700 mb-1">
//           <strong>मुख्याध्यापक नाव:</strong> {selected.principalName}
//         </p>
//         <p className="text-gray-700">
//           <strong>संपर्क क्रमांक:</strong> {selected.contact}
//         </p>

//         <p className="text-gray-700 mb-1">
//           <strong>अधिक्षक नाव:</strong> {selected.superintendantName}
//         </p>
//         <p className="text-gray-700">
//           <strong>संपर्क क्रमांक:</strong> {selected.contact2}
//         </p>
//         <p className="text-gray-700 mb-1">
//           <strong>स्त्री अधिक्षिका नाव :</strong>{" "}
//           {selected.femaleSuperintendantName}
//         </p>
//         <p className="text-gray-700">
//           <strong>संपर्क क्रमांक:</strong> {selected.contact3}
//         </p>
//         <p className="text-gray-700">
//           <strong>शाळेचा ई-मेल आय डी:</strong> {selected.schoolEmail}
//         </p>

//         <button
//           onClick={() => onSelect(null)}
//           className="text-sm font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-3 py-3 mt-4 text-center"
//         >
//           ← परत जा
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h2 className="w-full text-xl font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-4 py-3 mb-4 text-center">
//         शासकीय यादी
//       </h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//         {data.map((hostel) => (
//           <button
//             key={hostel.id}
//             onClick={() => onSelect(hostel.id)}
//             className={`relative group overflow-hidden w-full px-4 py-2 border-2 font-semibold rounded-full flex items-center gap-3 transition duration-300
//               ${
//                 selectedId === hostel.id
//                   ? "bg-[#5E3023] text-white border-[#8A4B38]"
//                   : "text-[#5E3023] border-[#8A4B38] hover:text-white"
//               }`}
//             style={{ overflow: "hidden" }}
//           >
//             <span
//               className={`absolute inset-0 transition-transform duration-500 ease-out z-0 rounded-full ${
//                 selectedId === hostel.id
//                   ? "bg-[#5E3023] scale-x-100"
//                   : "bg-[#5E3023] scale-x-0 origin-left group-hover:scale-x-100"
//               }`}
//             ></span>
//             <span className="z-10 flex items-center gap-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//               <span>{hostel.schoolName}</span>
//             </span>
//           </button>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ShaskiyaList;

import React from "react";

interface ShaskiyaSchool {
  id: number;
  schoolName: string;
  city: string;
  district: string;
  principalName: string;
  contact: string;
  superintendantName: string;
  contact2: string;
  femaleSuperintendantName: string;
  contact3: string;
  schoolEmail: string;
}

const ShaskiyaList: React.FC<{
  data: ShaskiyaSchool[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}> = ({ data, selectedId, onSelect }) => {
  const selected = data.find((item) => item.id === selectedId);

  if (selectedId && selected) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#5E3023] mb-2">
          {selected.schoolName}
        </h1>

        <p className="text-gray-700 mb-1">
          <strong>तालुका:</strong> {selected.city}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>जिल्हा:</strong> {selected.district}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>मुख्याध्यापक नाव:</strong> {selected.principalName}
        </p>
        <p className="text-gray-700">
          <strong>संपर्क क्रमांक:</strong> {selected.contact}
        </p>

        <p className="text-gray-700 mb-1">
          <strong>अधिक्षक नाव:</strong> {selected.superintendantName}
        </p>
        <p className="text-gray-700">
          <strong>संपर्क क्रमांक:</strong> {selected.contact2}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>स्त्री अधिक्षिका नाव :</strong>{" "}
          {selected.femaleSuperintendantName}
        </p>
        <p className="text-gray-700">
          <strong>संपर्क क्रमांक:</strong> {selected.contact3}
        </p>
        <p className="text-gray-700">
          <strong>शाळेचा ई-मेल आय डी:</strong> {selected.schoolEmail}
        </p>

        <button
          onClick={() => onSelect(null)}
          className="text-sm font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-3 py-3 mt-4 text-center"
        >
          ← परत जा
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="w-full text-xl font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-4 py-3 mb-4 text-center">
        शासकीय यादी
      </h1>
      {data.length === 0 && (
        <p className="text-center text-gray-500">कोणतीही शाळा उपलब्ध नाही.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((school) => (
          <button
            key={school.id}
            onClick={() => onSelect(school.id)}
            aria-label={`Select ${school.schoolName}`}
            className={`relative group overflow-hidden w-full px-4 py-2 border-2 font-semibold rounded-full flex items-center gap-3 transition duration-300
              ${
                selectedId === school.id
                  ? "bg-[#5E3023] text-white border-[#8A4B38]"
                  : "text-[#5E3023] border-[#8A4B38] hover:text-white"
              }`}
            style={{ overflow: "hidden" }}
          >
            <span
              className={`absolute inset-0 transition-transform duration-500 ease-out z-0 rounded-full ${
                selectedId === school.id
                  ? "bg-[#5E3023] scale-x-100"
                  : "bg-[#5E3023] scale-x-0 origin-left group-hover:scale-x-100"
              }`}
            ></span>
            <span className="z-10 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span>{school.schoolName}</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default ShaskiyaList;

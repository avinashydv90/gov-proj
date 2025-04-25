import React from "react";

interface EmrsSchool {
  id: number;
  schoolName: string;
  taluka: string;
  district: string;
  headmasterName: string;
  headmasterContact: string;
  superintendentName: string;
  superintendentContact: string;
  ladySuperintendentName: string;
  ladySuperintendentContact: string;
  schoolEmail: string;
}

const EmrsList: React.FC<{
  data: EmrsSchool[];
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
          <strong>तालुका :</strong> {selected.taluka}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>जिल्हा :</strong> {selected.district}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>मुख्याध्यापक नाव :</strong> {selected.headmasterName}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>संपर्क क्रमांक :</strong> {selected.headmasterContact}
        </p>
        <p className="text-gray-700">
          <strong>अधिक्षक नाव :</strong> {selected.superintendentName}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>संपर्क क्रमांक :</strong> {selected.superintendentContact}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>स्त्री अधिक्षिका नाव :</strong>{" "}
          {selected.ladySuperintendentContact}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>संपर्क क्रमांक :</strong> {selected.ladySuperintendentContact}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>शाळेचा ई-मेल आय डी :</strong> {selected.schoolEmail}
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
        EMRS यादी
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((hostel) => (
          <button
            key={hostel.id}
            onClick={() => onSelect(hostel.id)}
            className={`relative group overflow-hidden w-full px-4 py-2 border-2 font-semibold rounded-full flex items-center gap-3 transition duration-300 
              ${
                selectedId === hostel.id
                  ? "bg-[#5E3023] text-white border-[#8A4B38]"
                  : "text-[#5E3023] border-[#8A4B38] hover:text-white"
              }`}
          >
            <span
              className={`absolute inset-0 transition-transform duration-500 ease-out z-0 rounded-full ${
                selectedId === hostel.id
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
              <span>{hostel.schoolName}</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default EmrsList;

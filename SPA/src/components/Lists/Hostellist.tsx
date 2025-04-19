import React, { useState, useEffect } from "react";

interface ShaskiyaHostel {
  id: number;
  hostelName: string;
  address: string;
  city: string;
  district: string;
  wardenName: string;
  contact: string;
  hostelEmail: string;
}

const HostelList: React.FC = () => {
  const [data, setData] = useState<ShaskiyaHostel[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.poitdp.shahapur-mh.in/api/Hostel/hostel")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const selected = data.find((item) => item.id === selectedId);

  if (selectedId && selected) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-[#5E3023] mb-2">
          {selected.hostelName}
        </h2>
        <p className="text-gray-700 mb-1">
          <strong>पत्ता:</strong> {selected.address}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>तालुका:</strong> {selected.city}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>जिल्हा:</strong> {selected.district}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>वार्डन:</strong> {selected.wardenName}
        </p>
        <p className="text-gray-700 mb-1">
          <strong>संपर्क:</strong> {selected.contact}
        </p>
        <p className="text-gray-700">
          <strong>ईमेल:</strong> {selected.hostelEmail}
        </p>

        <button
          onClick={() => setSelectedId(null)}
          className="text-sm font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-3 py-3 mt-4 text-center"
        >
          ← परत जा
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="w-full text-xl font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-4 py-3 mb-4 text-center">
        शासकीय यादी
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {data.map((hostel) => (
          <button
            key={hostel.id}
            onClick={() => setSelectedId(hostel.id)}
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
              <span>{hostel.hostelName}</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default HostelList;

import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";
import { Shaskiya } from "../constants/Shaskiya"; // adjust path if needed
type Hostel = {
  id: number;
  Name: string;
  Address: string;
  place: string;
  District: string;
  WARDAN: string;
  contact: string;
  EmailId: string;
};
const categoryData = [
  { id: 1, title: "शासकीय", description: "Located in the forest region..." },
  { id: 2, title: "अनुदानित", description: "Known for academic results..." },
  { id: 3, title: "नामांकित", description: "Focuses on sports..." },
  { id: 4, title: "EMRS", description: "Free meals & hostel facilities..." },
];

const AshramSchools: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    categoryData.length > 0 ? categoryData[0].id : null
  );
  const [selectedHostelId, setSelectedHostelId] = useState<number | null>(null);

  // Load data based on category
  const hostels: Hostel[] = [];

  if (selectedCategoryId === 1) {
    hostels.push(...Shaskiya);
  }

  const selectedHostel = hostels.find((h) => h.id === selectedHostelId);

  return (
    <PageLayout>
      <HeadingText text="आदिवासी विकास" />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Left: Category Selector */}
        <ListSelector
          items={categoryData}
          selectedId={selectedCategoryId}
          onSelect={(id) => {
            setSelectedCategoryId(id);
            setSelectedHostelId(null); // reset hostel when new category is picked
          }}
          title="आश्रमशाळा यादी"
        />

        {/* Right: Hostels or Details */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {/* Show hostels if a category is selected but not a hostel yet */}
          {selectedCategoryId && !selectedHostelId && (
            <>
              <h2 className="w-full text-xl font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-4 py-3 mb-4 text-center">
                शासकीय यादी
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hostels.map((hostel) => (
                  <button
                    key={hostel.id}
                    onClick={() => setSelectedHostelId(hostel.id)}
                    className={`relative group overflow-hidden w-full px-4 py-2 border-2 font-semibold rounded-full flex items-center gap-3 transition duration-300 
                    ${
                      selectedHostelId === hostel.id
                        ? "bg-[#5E3023] text-white border-[#8A4B38]"
                        : "text-[#5E3023] border-[#8A4B38] hover:text-white"
                    }`}
                  >
                    <span
                      className={`absolute inset-0 transition-transform duration-500 ease-out z-0 rounded-full ${
                        selectedHostelId === hostel.id
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
                      <span>{hostel.Name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Show hostel detail if selected */}
          {selectedHostelId && selectedHostel && (
            <div>
              <h2 className="text-2xl font-bold text-[#5E3023] mb-2">
                {selectedHostel.Name}
              </h2>
              <p className="text-gray-700 mb-1">
                <strong>पत्ता:</strong> {selectedHostel.Address}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>तालुका:</strong> {selectedHostel.place}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>जिल्हा:</strong> {selectedHostel.District}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>वार्डन:</strong> {selectedHostel.WARDAN}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>संपर्क:</strong> {selectedHostel.contact}
              </p>
              <p className="text-gray-700">
                <strong>ईमेल:</strong> {selectedHostel.EmailId}
              </p>

              <button
                onClick={() => setSelectedHostelId(null)}
                className="text-sm font-bold text-white bg-[#5E3023] border border-[#8A4B38] rounded-xl px-3 py-3 mt-4 text-center"
              >
                ← परत जा
              </button>
            </div>
          )}

          {/* No category selected */}
          {!selectedCategoryId && !selectedHostelId && (
            <p className="text-gray-500 italic">
              कृपया डाव्या बाजूने प्रकार निवडा.
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default AshramSchools;

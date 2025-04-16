import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";
import { Hostel } from "../constants/Hostel"; // adjust path if needed

const GovHostels: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(
    Hostel.length > 0 ? Hostel[0].id : null
  );

  const selectedHostel = Hostel.find((hostel) => hostel.id === selectedId);

  return (
    <PageLayout>
      <HeadingText text="आदिवासी विकास" />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Reusable Left Selector */}
        <ListSelector
          items={Hostel.map((h) => ({
            id: h.id,
            title: h.Name,
            description: h.Address,
          }))}
          selectedId={selectedId}
          onSelect={setSelectedId}
          title="शासकीय वसतिगृह"
        />

        {/* Right - Card */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {selectedHostel ? (
            <>
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
            </>
          ) : (
            <p className="text-gray-500 italic">कृपया वसतिगृह निवडा.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GovHostels;

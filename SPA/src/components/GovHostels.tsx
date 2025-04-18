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

  const renderHostelDetails = (hostel: (typeof Hostel)[0]) => (
    <div className="p-4 bg-white rounded-b-xl border-gray-200">
      <h2 className="text-xl font-bold text-[#5E3023] mb-2">{hostel.Name}</h2>
      <p className="text-gray-700 mb-1">
        <strong>पत्ता:</strong> {hostel.Address}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>तालुका:</strong> {hostel.place}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>जिल्हा:</strong> {hostel.District}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>वार्डन:</strong> {hostel.WARDAN}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>संपर्क:</strong> {hostel.contact}
      </p>
      <p className="text-gray-700">
        <strong>ईमेल:</strong> {hostel.EmailId}
      </p>
    </div>
  );

  return (
    <PageLayout>
      <HeadingText text="वसतिगृह" />

      {/* Desktop Layout */}
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
        {/* Left: List */}
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

        {/* Right: Details */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {selectedHostel ? (
            renderHostelDetails(selectedHostel)
          ) : (
            <p className="text-gray-500 italic">कृपया वसतिगृह निवडा.</p>
          )}
        </div>
      </div>

      {/* Mobile Accordion Layout */}
      <div className="block md:hidden mt-6 space-y-4">
        {Hostel.map((hostel) => (
          <div
            key={hostel.id}
            className="rounded-xl border border-gray-200 shadow-md"
          >
            <button
              className="w-full text-left px-4 py-3 text-white font-semibold rounded-t-xl transition-colors duration-200 btn-primary"
              style={{ backgroundColor: "#5E3023" }}
              onClick={() =>
                setSelectedId(selectedId === hostel.id ? null : hostel.id)
              }
            >
              {hostel.Name}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedId === hostel.id ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {selectedId === hostel.id && renderHostelDetails(hostel)}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default GovHostels;

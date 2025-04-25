import React, { useEffect, useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";
import HelmetComponent from "../shared-components/HelemetComponent";
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

const GovHostels: React.FC = () => {
  const [data, setData] = useState<ShaskiyaHostel[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.poitdp.shahapur-mh.in/api/Hostel/hostel")
      .then((res) => res.json())
      .then((json: ShaskiyaHostel[]) => {
        setData(json);
        if (json.length > 0) {
          setSelectedId(json[0].id);
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const selectedHostel = data.find((hostel) => hostel.id === selectedId);

  const renderHostelDetails = (hostel: (typeof data)[0]) => (
    <div className="p-4 bg-white rounded-b-xl border-gray-200">
      <h2 className="text-xl font-bold text-[#5E3023] mb-2">
        {hostel.hostelName}
      </h2>
      <p className="text-gray-700 mb-1">
        <strong>पत्ता:</strong> {hostel.address}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>तालुका:</strong> {hostel.city}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>जिल्हा:</strong> {hostel.district}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>वार्डन:</strong> {hostel.wardenName}
      </p>
      <p className="text-gray-700 mb-1">
        <strong>संपर्क:</strong> {hostel.contact}
      </p>
      <p className="text-gray-700">
        <strong>ईमेल:</strong> {hostel.hostelEmail}
      </p>
    </div>
  );

  return (
    <PageLayout>
      <HelmetComponent
        title="शासकीय वसतिगृह | Adivasi Vikas Prakalp Shahapur"
        description="शाहापूर तालुक्यातील सर्व शासकीय वसतिगृहांची माहिती"
        canonical="https://poitdp.shahapur-mh.in/gov-hostel"
      />
      <HeadingText text="शासकीय वसतिगृह" />

      {/* Desktop Layout */}
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
        {/* Left: List */}
        <ListSelector
          items={data.map((h) => ({
            id: h.id,
            title: h.hostelName,
            description: h.address,
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
        {data.map((hostel) => (
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
              {hostel.hostelName}
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

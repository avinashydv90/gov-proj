import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";

const data = [
  {
    id: 1,
    title: "शासकीय",
    description:
      "Located in the forest region, serving tribal students since 1985.",
  },
  {
    id: 2,
    title: "अनुदानित",
    description: "Known for excellent academic results in the past 5 years.",
  },
  {
    id: 3,
    title: "नामांकित",
    description: "Focuses on sports and physical education for tribal youth.",
  },
  {
    id: 4,
    title: "EMRS",
    description: "Provides free meals and hostel facilities to students.",
  },
];

const GovHostels: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedSchool = data.find((school) => school.id === selectedId);

  return (
    <PageLayout>
      <HeadingText text="आदिवासी विकास" />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Reusable Left Selector */}
        <ListSelector
          items={data}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          title="आश्रमशाळा यादी"
        />

        {/* Right - Card */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {selectedSchool ? (
            <>
              <h2 className="text-2xl font-bold text-blue-700 mb-2">
                {selectedSchool.title}
              </h2>
              <p className="text-gray-700">{selectedSchool.description}</p>
            </>
          ) : (
            <p className="text-gray-500 italic">
              कृपया डाव्या बाजूने शाळा निवडा.
            </p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default GovHostels;

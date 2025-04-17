import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";
import { yojnas } from "../constants/yojnas"; // adjust path if needed

const VikasYojana: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(
    yojnas.length > 0 ? yojnas[0].id : null
  );

  const selectedHostel = yojnas.find((yojnas) => yojnas.id === selectedId);

  return (
    <PageLayout>
      <HeadingText text="आदिवासी विकास" />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        {/* Reusable Left Selector */}
        <ListSelector
          items={yojnas.map((h) => ({
            id: h.id,
            title: h.title,
            description: h.decription,
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
                {selectedHostel.title}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedHostel.description as string,
                }}
                className="mb-4 overflow-hidden"
                style={{
                  flexShrink: 0,
                  maxHeight: "650px",
                  overflowY: "auto",
                }}
              />
            </>
          ) : (
            <p className="text-gray-500 italic">कृपया वसतिगृह निवडा.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default VikasYojana;

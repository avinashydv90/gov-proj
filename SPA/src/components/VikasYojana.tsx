import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PageLayout from "../shared-components/PageLayout";
import { yojnas } from "../constants/yojnas";
import HelmetComponent from "../shared-components/HelemetComponent";

const VikasYojana: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(
    yojnas.length > 0 ? yojnas[0].id : null
  );

  const selectedYojna = yojnas.find((y) => y.id === selectedId);

  const renderDetails = (yojna: (typeof yojnas)[0]) => (
    <div className="p-4 bg-white rounded-b-xl border-t border-gray-200">
      <h1 className="text-xl font-bold text-[#5E3023] mb-2">{yojna.title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: yojna.description as string,
        }}
        className="overflow-hidden"
        style={{
          maxHeight: "650px",
          overflowY: "auto",
        }}
      />
    </div>
  );

  return (
    <PageLayout>
      <HelmetComponent
        title="विभागीय योजना | Adivasi Vikas Prakalp Shahapur"
        description="विभागीय योजनांची संपूर्ण माहिती येथे पहा. आदिवासी विकास प्रकल्प शहापूर अंतर्गत राबविल्या जाणाऱ्या विभागीय योजनांची माहिती."
        canonical="https://poitdp.shahapur-mh.in/vikasyojana"
      />
      <HeadingText text="विभागीय योजना" />

      {/* Desktop Layout */}
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
        <ListSelector
          items={yojnas.map((h) => ({
            id: h.id,
            title: h.title,
            description: h.description,
          }))}
          selectedId={selectedId}
          onSelect={setSelectedId}
          title="योजना"
        />

        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {selectedYojna ? (
            renderDetails(selectedYojna)
          ) : (
            <p className="text-gray-500 italic">कृपया विभागीय योजना निवडा.</p>
          )}
        </div>
      </div>

      {/* Mobile Accordion Layout */}
      <div className="block md:hidden mt-6 space-y-4">
        {yojnas.map((yojna) => (
          <div
            key={yojna.id}
            className="rounded-xl border border-gray-200 shadow-md"
          >
            <button
              className="w-full text-left px-4 py-3 text-white font-semibold rounded-t-xl transition-colors duration-200 btn-primary"
              style={{ backgroundColor: "#5E3023" }}
              onClick={() =>
                setSelectedId(selectedId === yojna.id ? null : yojna.id)
              }
            >
              {yojna.title}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedId === yojna.id ? "max-h-[1000px]" : "max-h-0"
              }`}
            >
              {selectedId === yojna.id && renderDetails(yojna)}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default VikasYojana;

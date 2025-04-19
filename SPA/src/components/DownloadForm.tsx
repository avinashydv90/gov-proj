import React, { useState } from "react";
import PageLayout from "../shared-components/PageLayout";
import HeadingText from "../shared-components/HeadingText";
import ListSelector from "../shared-components/ListSelector";
import PdfViewerWithDownload from "../shared-components/PdfViewerWithDownload";

const FormTypeData = [
  {
    id: 1,
    title: "इंग्रजी माध्यमाच्या नामांकित निवासी शाळा योजना अर्ज",
    fileName: "1_इंग्रजी माध्यमाच्या नामांकित निवासी शाळा योजना अर्ज.pdf",
  },
  {
    id: 2,
    title: "उत्पन्न वाढीच्या योजनांचा अर्ज",
    fileName: "2_उत्पन्न वाढीच्या योजनांचा अर्ज.pdf",
  },
  {
    id: 3,
    title: "कातकरी जातीची शिफारस",
    fileName: "3_कातकरी जातीची शिफारस.pdf",
  },
  {
    id: 4,
    title: "शबरी घरकुल शहरी अर्ज नमुना",
    fileName: "4_शबरी घरकुल शहरी अर्ज नमुना.pdf",
  },
];

const DownloadForm: React.FC = () => {
  const [selectedFormTypeId, setSelectedFormTypeId] = useState<number | null>(
    FormTypeData.length > 0 ? FormTypeData[0].id : null
  );

  const renderCategoryContent = (fileName: string) => (
    <div className="p-4 border-t border-gray-200">
      <PdfViewerWithDownload fileName={`/pdf/${fileName}`} />
    </div>
  );

  return (
    <PageLayout>
      <HeadingText text="फॉर्म प्रकार डाउनलोड करा" />

      {/* Desktop layout */}
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
        <ListSelector
          items={FormTypeData}
          selectedId={selectedFormTypeId}
          onSelect={setSelectedFormTypeId}
          title="डाउनलोड फॉर्म प्रकार निवडा"
          displaySize={true}
        />
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {selectedFormTypeId ? (
            renderCategoryContent(
              FormTypeData.find((item) => item.id === selectedFormTypeId)
                ?.fileName || ""
            )
          ) : (
            <p className="text-gray-500 italic">
              कृपया डाव्या बाजूने प्रकार निवडा.
            </p>
          )}
        </div>
      </div>

      {/* Mobile accordion layout */}
      <div className="block md:hidden mt-6 space-y-4">
        {FormTypeData.map((form) => (
          <div
            key={form.id}
            className="rounded-xl border border-gray-200 shadow-md"
          >
            <button
              className="w-full text-left px-4 py-3 text-white font-semibold rounded-t-xl transition-colors duration-200 btn-primary"
              style={{ backgroundColor: "#5E3023" }}
              onClick={() =>
                setSelectedFormTypeId(
                  selectedFormTypeId === form.id ? null : form.id
                )
              }
            >
              {form.title}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedFormTypeId === form.id ? "h-auto" : "h-0"
              }`}
            >
              {selectedFormTypeId === form.id &&
                renderCategoryContent(form.fileName)}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default DownloadForm;

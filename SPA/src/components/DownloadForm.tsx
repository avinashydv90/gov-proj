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
  const [selectedFormTypeId, setselectedFormTypeId] = useState<number | null>(
    FormTypeData.length > 0 ? FormTypeData[0].id : null
  );

  const renderCategoryContent = () => {
    const selected = FormTypeData.find(
      (item) => item.id === selectedFormTypeId
    );
    if (!selected) {
      return (
        <p className="text-gray-500 italic">
          कृपया डाव्या बाजूने प्रकार निवडा.
        </p>
      );
    }

    return <PdfViewerWithDownload fileName={"/pdf/" + selected.fileName} />;
  };

  return (
    <PageLayout>
      <HeadingText text="फॉर्म प्रकार डाउनलोड करा" />

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <ListSelector
          items={FormTypeData}
          selectedId={selectedFormTypeId}
          onSelect={(id) => setselectedFormTypeId(id)}
          title="डाउनलोड फॉर्म प्रकार निवडा"
          displaySize={true}
        />
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {renderCategoryContent()}
        </div>
      </div>
    </PageLayout>
  );
};

export default DownloadForm;

import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import PageLayout from "../shared-components/PageLayout";
import ListSelector from "../shared-components/ListSelector";
import { Shaskiya } from "../constants/Shaskiya";
import { Anudanit } from "../constants/Anudanit";
import { Namankit } from "../constants/Namankit";
import ShaskiyaList from "./Lists/ShaskiyaList";
import AnudanitList from "./Lists/AnudanitList";
import NamankitList from "./Lists/NamankitList";
import EmrsList from "./Lists/ErmsList";
import { Emrs } from "../constants/EMRS";

const categoryData = [
  { id: 1, title: "शासकीय", description: "Located in the forest region..." },
  { id: 2, title: "अनुदानित", description: "Known for academic results..." },
  { id: 3, title: "नामांकित", description: "Focuses on sports..." },
  { id: 4, title: "EMRS", description: "Free meals & hostel facilities..." },
];

const AshramSchools: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedHostelId, setSelectedHostelId] = useState<number | null>(null);

  const resetSelection = () => {
    setSelectedHostelId(null);
  };

  const renderCategoryList = () => {
    switch (selectedCategoryId) {
      case 1:
        return (
          <ShaskiyaList
            data={Shaskiya}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 2:
        return (
          <AnudanitList
            data={Anudanit}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 3:
        return (
          <NamankitList
            data={Namankit}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 4:
        return (
          <EmrsList
            data={Emrs}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      default:
        return (
          <p className="text-gray-500 italic">
            कृपया डाव्या बाजूने प्रकार निवडा.
          </p>
        );
    }
  };

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
            resetSelection();
          }}
          title="आश्रमशाळा यादी"
        />

        {/* Right: Category Details or List */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {renderCategoryList()}
        </div>
      </div>
    </PageLayout>
  );
};

export default AshramSchools;

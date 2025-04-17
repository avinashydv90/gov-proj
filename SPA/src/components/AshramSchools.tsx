import React, { useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import PageLayout from "../shared-components/PageLayout";
import { Shaskiya } from "../constants/Shaskiya";
import { Anudanit } from "../constants/Anudanit";
import { Namankit } from "../constants/Namankit";
import { Emrs } from "../constants/Emrs";
import ShaskiyaList from "./Lists/ShaskiyaList";
import AnudanitList from "./Lists/AnudanitList";
import NamankitList from "./Lists/NamankitList";
import EmrsList from "./Lists/ErmsList";
import ListSelector from "../shared-components/ListSelector";

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

  const resetSelection = () => {
    setSelectedHostelId(null);
  };

  const renderCategoryList = (id: number | null) => {
    switch (id) {
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

      {/* Desktop View */}
      <div className="hidden md:flex mt-6 flex-col md:flex-row gap-4">
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

        {/* Right: Category Details */}
        <div className="md:w-2/3 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          {renderCategoryList(selectedCategoryId)}
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden mt-6 space-y-4">
        {categoryData.map((category) => (
          <div
            key={category.id}
            className="rounded-xl border border-gray-200 shadow-md"
          >
            <button
              className="w-full text-left px-4 py-3 text-white font-semibold rounded-t-xl transition-colors duration-200 btn-primary"
              style={{ backgroundColor: "#5E3023" }}
              onClick={() =>
                setSelectedCategoryId(
                  selectedCategoryId === category.id ? null : category.id
                )
              }
            >
              {category.title}
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                selectedCategoryId === category.id
                  ? "max-h-[1000px]"
                  : "max-h-0"
              }`}
              style={{ overflow: "hidden scroll" }}
            >
              <div className="p-4">
                {selectedCategoryId === category.id &&
                  renderCategoryList(category.id)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default AshramSchools;

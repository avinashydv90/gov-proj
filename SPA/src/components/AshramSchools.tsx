import HeadingText from "../shared-components/HeadingText";
import PageLayout from "../shared-components/PageLayout";
import ShaskiyaList from "./Lists/ShaskiyaList";
import AnudanitList from "./Lists/AnudanitList";
import NamankitList from "./Lists/NamankitList";
import EmrsList from "./Lists/ErmsList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ListSelector from "../shared-components/ListSelector";
import HelmetComponent from "../shared-components/HelemetComponent";

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
  // Data states
  const [shaskiyaData, setShaskiyaData] = useState([]);
  const [anudanitData, setAnudanitData] = useState([]);
  const [namankitData, setNamankitData] = useState([]);
  const [emrsData, setEmrsData] = useState([]);
  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shaskiyaRes, anudanitRes, namankitRes, emrsRes] =
          await Promise.all([
            axios.get(
              "https://api.poitdp.shahapur-mh.in/api/AshramSchool/ashram-school"
            ),
            axios.get(
              "https://api.poitdp.shahapur-mh.in/api/AidedAshramSchool/aided-ashram-school"
            ),
            axios.get(
              "https://api.poitdp.shahapur-mh.in/api/ReputedSchools/reputed-schools"
            ),
            axios.get("https://api.poitdp.shahapur-mh.in/api/EMRS/EMRS"),
          ]);
        setShaskiyaData(shaskiyaRes.data);
        setAnudanitData(anudanitRes.data);
        setNamankitData(namankitRes.data);
        setEmrsData(emrsRes.data);
      } catch (error) {
        console.error("Error fetching ashram school data:", error);
      }
    };

    fetchData();
  }, []);

  const resetSelection = () => {
    setSelectedHostelId(null);
  };

  const renderCategoryList = (id: number | null) => {
    switch (id) {
      case 1:
        return (
          <ShaskiyaList
            data={shaskiyaData}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 2:
        return (
          <AnudanitList
            data={anudanitData}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 3:
        return (
          <NamankitList
            data={namankitData}
            selectedId={selectedHostelId}
            onSelect={setSelectedHostelId}
          />
        );
      case 4:
        return (
          <EmrsList
            data={emrsData}
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
      <HelmetComponent
        title="Ashram Schools | Adivasi Vikas Prakalp Shahapur"
        description="Explore the various types of Ashram Schools in Shahapur including Government, Aided, Reputed, and EMRS."
        canonical="https://poitdp.shahapur-mh.in/ashramschools"
      />

      <HeadingText text="आश्रमशाळा" />

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

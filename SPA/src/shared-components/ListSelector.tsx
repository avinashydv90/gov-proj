import React, { useState } from "react";

interface Item {
  id: number;
  title: string;
}

interface ListSelectorProps {
  items: Item[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  title?: string;
}

const ITEMS_PER_PAGE = 10;

const ListSelector: React.FC<ListSelectorProps> = ({
  items,
  selectedId,
  onSelect,
  title = "सदर यादी",
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="md:w-1/3 bg-white shadow-lg rounded-xl p-4 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>

      <div className="space-y-2">
        {currentItems.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`relative group overflow-hidden w-full px-4 py-2 border-2 font-semibold rounded-full flex items-center gap-3 transition duration-300 
                ${
                  isSelected
                    ? "bg-[#5E3023] text-white border-[#8A4B38]"
                    : "text-[#5E3023] border-[#8A4B38] hover:text-white"
                }`}
            >
              <span
                className={`absolute inset-0 transition-transform duration-500 ease-out z-0 rounded-full ${
                  isSelected
                    ? "bg-[#5E3023] scale-x-100"
                    : "bg-[#5E3023] scale-x-0 origin-left group-hover:scale-x-100"
                }`}
              ></span>
              <span className="z-10 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                <span>{item.title}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center text-sm text-gray-700">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-1 bg-[#5E3023] text-white rounded border border-[#8A4B38] 
                     hover:bg-[#8A4B38] hover:text-white transition disabled:opacity-50"
          >
            मागील
          </button>

          <span className="text-[#5E3023] font-medium">
            पृष्ठ {currentPage} / {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-1 bg-[#5E3023] text-white rounded border border-[#8A4B38] 
                     hover:bg-[#8A4B38] hover:text-white transition disabled:opacity-50"
          >
            पुढील
          </button>
        </div>
      )}
    </div>
  );
};

export default ListSelector;

import { useState } from "react";

const galleryImages = [
  "/images/gallery1.jpg",
  "/images/gallery2.jpg",
  "/images/gallery3.jpg",
  "/images/gallery4.jpg",
  "/images/gallery5.jpg",
  "/images/gallery6.jpg",
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentIndex(null);
  };

  const showPrev = () => {
    setCurrentIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-[#5E3023] text-center p-5 text-xl font-bold bg-[#5E3023] text-white p-3 rounded-md text-lg font-semibold px-4">
        आमचे गॅलरी
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {galleryImages.map((src, index) => (
          <div
            key={index}
            className="relative w-full pt-[100%] overflow-hidden rounded-md shadow hover:shadow-lg cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={src}
              alt={`Gallery image ${index + 1}`}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && currentIndex !== null && (
        <div
          className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-[300px] h-[400px] sm:w-[300px] sm:h-[400px] md:w-[500px] md:h-[600px] lg:w-[700px] lg:h-[600px] xl:w-[800px] xl:h-[600px] 2xl:w-[1200px] 2xl:h-[800px] bg-black rounded overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentIndex]}
              alt="Preview"
              className="w-full h-full object-cover"
            />

            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black/60 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Prev/Next Buttons */}
            <button
              className="absolute top-1/2 left-4 transform text-white text-6xl bg-black/60 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={showPrev}
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  top: "-7px",
                }}
              >
                ‹
              </div>
            </button>
            <button
              className="absolute top-1/2 right-4 transform text-white text-6xl bg-black/60 rounded-full w-12 h-12 flex items-center justify-center"
              onClick={showNext}
            >
              <div
                style={{
                  display: "flex",
                  position: "relative",
                  top: "-7px",
                }}
              >
                ›
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

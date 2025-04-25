import { useEffect, useState } from "react";
import HeadingText from "../shared-components/HeadingText";
import PageLayout from "../shared-components/PageLayout";
import HelmetComponent from "../shared-components/HelemetComponent";

interface GalleryItem {
  id: number;
  imageUrl: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Fetch images from API
  // useEffect(() => {
  //   const fetchGalleryImages = async () => {
  //     try {
  //       const response = await fetch("/api/gallery"); // Replace with your actual endpoint
  //       const data = await response.json();
  //       setImages(data);
  //     } catch (error) {
  //       console.error("Failed to fetch gallery images:", error);
  //     }
  //   };

  //   fetchGalleryImages();
  // }, []);

  useEffect(() => {
    const fetchImages = async () => {
      // Replace this with real API call
      const data: GalleryItem[] = [
        { id: 1, imageUrl: "/images/Gallery/gallery1.jpg" },
        { id: 2, imageUrl: "/images/Gallery/gallery2.jpg" },
        { id: 3, imageUrl: "/images/Gallery/gallery3.jpg" },
        { id: 4, imageUrl: "/images/Gallery/gallery4.jpg" },
        { id: 5, imageUrl: "/images/Gallery/gallery5.jpg" },
        { id: 6, imageUrl: "/images/Gallery/gallery6.png" },
        { id: 7, imageUrl: "/images/Gallery/gallery7.png" },
        { id: 8, imageUrl: "/images/Gallery/gallery8.png" },
        { id: 9, imageUrl: "/images/Gallery/gallery9.jpeg" },
        { id: 10, imageUrl: "/images/Gallery/gallery11.jpeg" },
        { id: 11, imageUrl: "/images/Gallery/gallery12.jpeg" },
        { id: 12, imageUrl: "/images/Gallery/gallery13.jpeg" },
        { id: 13, imageUrl: "/images/Gallery/gallery14.jpeg" },
      ];
      setImages(data);
    };

    fetchImages();
  }, []);

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
      prev !== null && prev > 0 ? prev - 1 : images.length - 1
    );
  };

  const showNext = () => {
    setCurrentIndex((prev) =>
      prev !== null && prev < images.length - 1 ? prev + 1 : 0
    );
  };

  return (
    <PageLayout>
      <HelmetComponent
        title="यशोगाथा | Adivasi Vikas Prakalp Shahapur"
        description="आदिवासी विकास प्रकल्प शहापूर अंतर्गत विविध उपक्रम, कार्यक्रम आणि विकास कामांची गॅलरी येथे पहा."
        canonical="https://poitdp.shahapur-mh.in/gallery"
      />
      <div className=" m-0 md:m-5 lg:m-5">
        <HeadingText text="यशोगाथा" />

        <div className="pr-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((item, index) => (
              <div
                key={item.id}
                className="relative w-full pt-[100%] overflow-hidden rounded-md shadow hover:shadow-lg cursor-pointer"
                onClick={() => openModal(index)}
              >
                <img
                  src={item.imageUrl}
                  alt={`Gallery image ${item.id}`}
                  className="absolute top-0 left-0 w-full h-full object-containt transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
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
                src={images[currentIndex].imageUrl}
                alt="Preview"
                className="w-full h-full object-containt"
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
                  style={{ display: "flex", position: "relative", top: "-7px" }}
                >
                  ‹
                </div>
              </button>
              <button
                className="absolute top-1/2 right-4 transform text-white text-6xl bg-black/60 rounded-full w-12 h-12 flex items-center justify-center"
                onClick={showNext}
              >
                <div
                  style={{ display: "flex", position: "relative", top: "-7px" }}
                >
                  ›
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Gallery;

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import PageLayout from "../shared-components/PageLayout";

interface CarouselImage {
  id: number;
  imageUrl: string;
}

export default function CarouselWithTopbar() {
  const [images, setImages] = useState<CarouselImage[]>([]);

  // Simulating fetch
  useEffect(() => {
    const fetchImages = async () => {
      // Replace this with real API call
      const data: CarouselImage[] = [
        { id: 1, imageUrl: "/images/CarouselImage/AdhivasiVikashVibhag.jpg" },
        { id: 2, imageUrl: "/images/CarouselImage/Davendra-Fadnavis.jpg" },
        { id: 3, imageUrl: "/images/CarouselImage/Devendra Fadnavis.jpg" },
        { id: 4, imageUrl: "/images/CarouselImage/KapilPatil.jpg" },
        {
          id: 5,
          imageUrl: "/images/CarouselImage/AdhivashiVikashVibhag2.jpeg",
        },
      ];
      setImages(data);
    };

    fetchImages();
  }, []);

  return (
    <PageLayout>
      <div className="relative w-full h-[80vh]">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={true}
          slidesPerView={1}
          className="w-full h-full"
        >
          {images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.imageUrl}
                alt={`Slide ${img.id}`}
                className="w-full h-full object-containt"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </PageLayout>
  );
}

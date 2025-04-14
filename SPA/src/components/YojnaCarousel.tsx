import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import HeadingText from "../shared-components/HeadingText";
import { yojnas } from "../constants/yojnas";
import SwiperCore from "swiper";

const YojnaCarousel = () => {
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleMouseEnter = () => {
    if (swiperRef.current?.autoplay?.running) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && !swiperRef.current.autoplay.running) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div
      className="bg-white shadow-md p-4 md:p-6 rounded-lg border border-gray-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HeadingText text="योजनांची माहिती- प्रकल्प शहापूर" />
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full h-full"
      >
        {yojnas.map((yojna, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col">
              <h1
                className="text-primaryBrown"
                style={{ marginBottom: "5px", fontWeight: 600 }}
              >
                {yojna.title}
              </h1>
              <div
                dangerouslySetInnerHTML={{ __html: yojna.description }}
                className="mb-4 overflow-hidden"
                style={{
                  flexShrink: 0,
                  maxHeight: "650px",
                  overflowY: "auto",
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default YojnaCarousel;

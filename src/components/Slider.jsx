import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Slider = ({ images }) => {
  return (
    <>
      <Swiper
        className="realative"
        modules={[Autoplay]}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="custom-prev absolute left-60 top-1/4 -translate-y-1/2 bg-[#ffffff33] hover:bg-[#2d2325]/50 text-white p-2 rounded-xs z-10 cursor-pointer">
        <FiChevronLeft size={24} />
      </button>
      <button className="custom-next absolute right-60 top-1/4 -translate-y-1/2 bg-[#ffffff33] hover:bg-[#2d2325]/50 text-white p-2 rounded-xs z-10 cursor-pointer">
        <FiChevronRight size={24} />
      </button>

      
    </>
  );
};

export default Slider;

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

      <div className="absolute bottom-10 left-1/2 top-1/3 z-10 -translate-x-1/2 transform">
        <img
          src="https://content.pancake.vn/1/s938x938/fwebp/a6/32/30/2f/b6916226d26cb1c7f85bcb76653505b9f4e061e210f9ae82bc291535-w:2048-h:2048-l:682409-t:image/jpeg.jpg"
          alt="Overlay"
          className="w-32 h-32 object-cover  border-4 border-white shadow-lg"
        />
      </div>
    </>
  );
};

export default Slider;

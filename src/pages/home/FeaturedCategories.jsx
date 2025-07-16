import { FaAward } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Add CSS to move pagination dots further down
// const paginationStyle = `
//   .swiper-pagination {
//     bottom: 30px !important;
//   }
// `;

// Inject style for pagination dots position
// import React from 'react';
// React.useEffect(() => {
//   const style = document.createElement('style');
//   style.innerHTML = paginationStyle;
//   document.head.appendChild(style);
//   return () => {
//     document.head.removeChild(style);
//   };
// }, []);

const categories = [
  {
    id: 1,
    label: 'Combo giấy cuộn siêu hời',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smnszo1ft0d6.webp',
    description: 'Mô tả chi tiết giấy ăn 3 màu.',
  },
  {
    id: 2,
    label: ' Khăn giấy ướt',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smq5g4g29a31.webp',
    description: 'Mô tả chi tiết giấy ăn đa sắc.',
  },
  {
    id: 3,
    label: 'Khăn giấy rút treo tường',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smnszo1ft0d6.webp',
    description: 'Mô tả chi tiết giấy gấu trúc.',
  },
  {
    id: 4,
    label: 'Khăn giấy rút',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smi7lsqpgu46.webp',
    description: 'Mô tả chi tiết giấy rút đa sắc.',
  },
   {
    id: 5,
    label: 'Combo giấy cuộn siêu hời',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smnszo1ft0d6.webp',
    description: 'Mô tả chi tiết giấy ăn 3 màu.',
  },
  {
    id: 6,
    label: ' Khăn giấy ướt',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smq5g4g29a31.webp',
    description: 'Mô tả chi tiết giấy ăn đa sắc.',
  },
  {
    id: 7,
    label: 'Khăn giấy rút treo tường',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smnszo1ft0d6.webp',
    description: 'Mô tả chi tiết giấy gấu trúc.',
  },
  {
    id: 8,
    label: 'Khăn giấy rút',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m9smi7lsqpgu46.webp',
    description: 'Mô tả chi tiết giấy rút đa sắc.',
  },
 
];

const FeatureCategories = () => {
  const [dragStartX, setDragStartX] = useState(null);
  const navigate = useNavigate();

  const handleCategoryToggle = (category, event) => {
    if (dragStartX !== null) {
      const dragEndX = event.clientX;
      const dragDistance = Math.abs(dragEndX - dragStartX);
      const dragThreshold = 5;
      if (dragDistance > dragThreshold) {
        setDragStartX(null);
        return;
      }
    }
    navigate(`/products/${category.id}`);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm m-auto">
      <div className="flex justify-between items-center mb-10 bg-[#43bb1b] p-4 rounded-sm">
        <h2 className="text-lg font-semibold flex items-center text-white">
          <div className="mr-2 text-[#434941]">
            <FaAward />
          </div>
          Danh mục nổi bật
        </h2>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={7}
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          type: 'bullets',
          // Removed custom pagination container to use default pagination
          // el: '.custom-swiper-pagination',
          renderBullet: (index, className) =>
            `<span class="${className}" style="background:${
              className.includes('swiper-pagination-bullet-active')
                ? '#43bb1b'
                : '#ccc'
            } margin-top:10px"></span>`,
        }}
        breakpoints={{
          1024: { slidesPerView: 6 },
          768: { slidesPerView: 4 },
          320: { slidesPerView: 3 },
        }}
      >
        {categories.map(category => (
          <SwiperSlide key={category.id} className="mb-8">
            <div
              className="cursor-pointer flex flex-col items-center"
              onMouseDown={e => setDragStartX(e.clientX)}
              onClick={e => handleCategoryToggle(category, e)}
            >
              <img
                src={category.img}
                alt={category.label}
                className="w-30 h-20 md:w-40 md:h-30 lg:w-50 lg:h-40 object-cover rounded-md mb-2"
              />
              <span className="text-xs text-gray-700">{category.label}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-swiper-pagination mt-2 flex justify-center"></div>
    </div>
  );
};

export default FeatureCategories;

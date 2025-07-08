
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
    label: 'Giấy ăn 3 màu',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy ăn 3 màu.',
  },
  {
    id: 2,
    label: 'Giấy ăn đa sắc',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy ăn đa sắc.',
  },
  {
    id: 3,
    label: 'Giấy gấu trúc',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy gấu trúc.',
  },
  {
    id: 4,
    label: 'Giấy rút đa sắc',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy rút đa sắc.',
  },
  {
    id: 5,
    label: 'Giấy rút Sắc Việt',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy rút Sắc Việt.',
  },
  {
    id: 6,
    label: 'Giấy rút GiaGia',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy rút GiaGia.',
  },
  {
    id: 7,
    label: 'Giấy rút tiêu hạ',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy rút tiêu hạ.',
  },
  {
    id: 8,
    label: 'Giấy rút gấu trúc',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết giấy rút gấu trúc.',
  },
  {
    id: 9,
    label: 'Khăn ướt đa sắc 80 tờ',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết khăn ướt đa sắc 80 tờ.',
  },
  {
    id: 10,
    label: 'Khăn ướt mini 8 tờ',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết khăn ướt mini 8 tờ.',
  },
  {
    id: 11,
    label: 'Nước giặt',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết nước giặt.',
  },
  {
    id: 12,
    label: 'Viên giặt',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết viên giặt.',
  },
  {
    id: 13,
    label: 'Nước rửa chén',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết nước rửa chén.',
  },
  {
    id: 14,
    label: 'Nước giặt đồ lót',
    img: 'https://khangiaysukimoko.com/img/More/header_img.png',
    description: 'Mô tả chi tiết nước giặt đồ lót.',
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
          renderBullet: (index, className) => (
            `<span class="${className}" style="background:${className.includes('swiper-pagination-bullet-active') ? '#43bb1b' : '#ccc'} margin-top:10px"></span>`
          ),
        }}
        breakpoints={{
          1024: { slidesPerView: 6 },
          768: { slidesPerView: 4 },
          320: { slidesPerView: 3 },
        }}
      >
        {categories.map(category => (
          <SwiperSlide key={category.id} className='mb-8'>
            <div
              className="cursor-pointer flex flex-col items-center"
              onMouseDown={e => setDragStartX(e.clientX)}
              onClick={e => handleCategoryToggle(category, e)}
            >
              <img
                src={category.img}
                alt={category.label}
                className="w-20 h-20 md:w-30 md:h-30 lg:w-40 lg:h-40 object-cover rounded-md mb-2"
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

import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banners = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    swipe: true,
    vertical: false,
    edgeFriction: 0.15,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const images = [
    {
      src: 'https://khangiaysukimoko.com/img/More/header_img.png',
      alt: 'Free Ship Toàn Quốc',
    },
    {
      src: 'https://khangiaysukimoko.com/img/More/header_img.png',
      alt: 'Voucher Cực Chất',
    },
    {
      src: 'https://khangiaysukimoko.com/img/More/header_img.png',
      alt: 'Siêu Sale Mừng Đại Lễ',
    },
  ];

  return (
    <>
      {/* Slider visible on all screen sizes */}
      <div className="block mb-6 w-full max-w-[1440px] overflow-hidden pb-10" style={{ maxHeight: '300px' }}>
        <div className="relative">
          <Slider
            {...settings}
            appendDots={dots => (
              <div
                style={{
                  position: 'absolute',
                  // bottom: 0,
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px 0',
                  zIndex: 10,
                }}
              >
                <ul style={{ margin: 0, padding: 0, display: 'flex', gap: '8px' }}> {dots} </ul>
              </div>
            )}
          >
            {images.map((image, index) => (
              <div key={index} className="px-1 md:px-2 sm:px-0">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg w-full object-cover h-24 md:h-40 lg:h-50"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Banners;

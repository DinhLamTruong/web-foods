import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banners = () => {
  const settings = {
    dots: true,
    // infinite: true,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          // infinite: true,
        },
      },
    ],
  };

  const images = [
    {
      src: 'https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6jelbnfnqd4b0.webp',
      alt: 'Free Ship Toàn Quốc',
    },
    {
      src: 'https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6qeme5dh9k131.webp',
      alt: 'Voucher Cực Chất',
    },
    {
      src: 'https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6qeme5dio4hcd.webp',
      alt: 'Siêu Sale Mừng Đại Lễ',
    },
  ];

  return (
    <>
      {/* max-w-[320px] md:max-w-[320px] lg:max-w-full */}
      {/* Slider visible on all screen sizes */}
      <div
        className="block w-full overflow-hidden pb-6"
        style={{ maxHeight: 'none' }}
      >
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
                <ul
                  style={{ margin: 0, padding: 0, display: 'flex', gap: '8px' }}
                >
                  {' '}
                  {dots}{' '}
                </ul>
              </div>
            )}
          >
            {images.map((image, index) => (
              <div key={index} className="px-1 md:px-1 lg:px-2">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg object-cover h-20 md:h-30 lg:h-50 w-full"
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

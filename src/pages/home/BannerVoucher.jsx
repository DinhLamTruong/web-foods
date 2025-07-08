const BannerVoucher = () => {
  return (
    <>
      <div className=" flex justify-center m-auto">
        <div className="relative  grid grid-cols-3 gap-8 lg:gap-18 my-10 mx-2">
          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://khangiaysukimoko.com/img/More/header_img.png"
              alt="Overlay Hover Image"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay top-left */}
            <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>

            {/* Overlay bottom-right */}
            <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
          </div>

          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://khangiaysukimoko.com/img/More/header_img.png"
              alt="Overlay Hover Image"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay top-left */}
            <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>

            {/* Overlay bottom-right */}
            <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
          </div>

          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://khangiaysukimoko.com/img/More/header_img.png"
              alt="Overlay Hover Image"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay top-left */}
            <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>

            {/* Overlay bottom-right */}
            <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerVoucher;

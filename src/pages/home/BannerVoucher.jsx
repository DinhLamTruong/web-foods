const BannerVoucher = () => {
  return (
    <>
      <div className=" flex justify-center m-auto">
        <div className="relative  grid grid-cols-3 gap-8 lg:gap-10 my-10 mx-2">
          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6jelbnfnqd4b0.webp"
              alt="Overlay Hover Image"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay top-left */}
            <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>

            {/* Overlay bottom-right */}
            <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
          </div>

          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6qeme5dh9k131.webp"
              alt="Overlay Hover Image"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay top-left */}
            <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>

            {/* Overlay bottom-right */}
            <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
          </div>

          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src="https://down-zl-vn.img.susercontent.com/vn-11134210-7ra0g-m6qeme5dio4hcd.webp"
              alt="Overlay Hover Image"
              className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
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

import vch1 from '../../images/vch1.png';
import vch2 from '../../images/vch2.png';
import vch3 from '../../images/vch3.png';

const BannerVoucher = () => {
  return (
    <>
      <div className=" flex justify-center m-auto">
        <div className="relative  grid grid-cols-3 gap-8 lg:gap-10 my-10 mx-2">
          <div className="relative w-full max-w-lg group overflow-hidden rounded-xl">
            <img
              src={vch1}
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
              src={vch2}
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
              src={vch3}
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

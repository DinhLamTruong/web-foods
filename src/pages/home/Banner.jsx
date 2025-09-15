import banner from "../../images/banner.png";

const Banner = () => {
  return (
    <div>
      <img
        className="w-full h-50 md:h-70 lg:h-120 object-cover"
        src={banner}
        alt="Banner"
      />
    </div>
  );
};

export default Banner;

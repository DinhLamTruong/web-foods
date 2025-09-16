
import React, { useEffect, useState } from 'react';
import bannerDefault from "../../images/banner.png";

const Banner = () => {
  const [bannerUrl, setBannerUrl] = useState(bannerDefault);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/upload/banner`)
      .then(async (res) => {
        if (!res.ok) throw new Error('No banner');
        const data = await res.json();
        // API trả về { urls: [...] }
        if (Array.isArray(data.urls) && data.urls.length > 0) {
          setBannerUrl(apiUrl + data.urls[data.urls.length - 1]);
        } else {
          setBannerUrl(bannerDefault);
        }
      })
      .catch(() => setBannerUrl(bannerDefault));
  }, []);

  return (
    <div>
      <img
        className="w-full h-50 md:h-70 lg:h-120 object-cover"
        src={bannerUrl}
        alt="Banner"
      />
    </div>
  );
};

export default Banner;

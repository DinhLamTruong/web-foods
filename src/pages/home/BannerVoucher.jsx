
import React, { useEffect, useState } from 'react';
import vch1 from '../../images/vch1.png';
import vch2 from '../../images/vch2.png';
import vch3 from '../../images/vch3.png';

const BannerVoucher = () => {
  const [voucherUrls, setVoucherUrls] = useState([vch1, vch2, vch3]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/upload/voucher`)
      .then(async (res) => {
        if (!res.ok) throw new Error('No voucher');
        const data = await res.json();
        // API trả về { urls: [...] }
        if (Array.isArray(data.urls) && data.urls.length >= 3) {
          setVoucherUrls(data.urls.slice(-3).map(url => apiUrl + url));
        } else {
          setVoucherUrls([vch1, vch2, vch3]);
        }
      })
      .catch(() => setVoucherUrls([vch1, vch2, vch3]));
  }, []);

  return (
    <>
      <div className=" flex justify-center m-auto">
        <div className="relative  grid grid-cols-3 gap-8 lg:gap-10 my-10 mx-2">
          {voucherUrls.map((src, idx) => (
            <div key={idx} className="relative w-full max-w-lg group overflow-hidden rounded-xl">
              <img
                src={src}
                alt={`Overlay Hover Image ${idx+1}`}
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay top-left */}
              <div className="absolute w-full h-full bg-white/10 left-[-100%] top-[-100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
              {/* Overlay bottom-right */}
              <div className="absolute w-full h-full bg-white/10 left-[100%] top-[100%] z-0 transition-all duration-300 group-hover:left-0 group-hover:top-0"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerVoucher;

// import React from 'react';
import Slider from '../../components/Slider';

const images = [
  'https://content.pancake.vn/1/s938x938/fwebp/a6/32/30/2f/b6916226d26cb1c7f85bcb76653505b9f4e061e210f9ae82bc291535-w:2048-h:2048-l:682409-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s938x938/fwebp/91/26/b1/ea/4919a8e0d36d6150ae6bca8ae1ff707c18802cefed5e02b431a1407b-w:1200-h:1200-l:536947-t:image/png.png',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
];
const imagesProduct = [
  'https://content.pancake.vn/1/s938x938/fwebp/a6/32/30/2f/b6916226d26cb1c7f85bcb76653505b9f4e061e210f9ae82bc291535-w:2048-h:2048-l:682409-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s938x938/fwebp/91/26/b1/ea/4919a8e0d36d6150ae6bca8ae1ff707c18802cefed5e02b431a1407b-w:1200-h:1200-l:536947-t:image/png.png',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
];

const Home = () => {
  return (
    <>
      <Slider images={images} />

      <div className="flex items-center gap-2 mt-8">
        <div>icon</div>
        <div className="flex flex-col">
          <div>1</div>
          <div>2</div>
        </div>
        <div>giam gia</div>
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-4">
        SUPER KHUYẾN MÃI CỰC SỐC XTRA GIẢM GIÁ VẬN CHUYỂN GIÁ TỐT NHẤT 79,000đ
        Xốt ướp thịt nướng BBQ Bếp Xuyên Việt 400g cho 2kg thịt heo, bò, hải
        sản,...{' '}
      </h3>

      <div>4.9/5 (5.6k) | Đã bán 66.5K</div>

      <div className="flex gap-4 mt-8">
        <div className="group-container">
          <div id="w-s9tl86jd" className="com-rectangle p-absolute">
            <div className="rectangle-css full-mask-size mask-position full-height full-width"></div>
          </div>
          <div id="w-6dqlrvc4" className="com-text-block p-absolute">
            <div className="text-block">
              <h4 className="text-xs whiteSpace-nowrap">
                <span style={{ fontWeight: 400 }}>
                  Thanh toán khi nhận hàng
                </span>
              </h4>
            </div>
          </div>
        </div>

        <div
          id="w-aibp40zn"
          className="p-absolute group-auto-scroll scroll-size"
        >
          <div className="group-container">
            <div id="w-izsw4zsl" className="com-rectangle p-absolute">
              <div className="rectangle-css full-mask-size mask-position full-height full-width"></div>
            </div>
            <div id="w-e2jgxe3u" className="com-text-block p-absolute">
              <div className="text-block">
                <h4 className="text-xs whiteSpace-nowrap">
                  <span style={{ fontWeight: 400 }}>Đổi trả dễ dàng</span>
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div
          id="w-k1w8r6ak"
          className="p-absolute group-auto-scroll scroll-size"
        >
          <div className="group-container">
            <div id="w-kdbtgl5b" className="com-rectangle p-absolute">
              <div className="rectangle-css full-mask-size mask-position full-height full-width"></div>
            </div>
            <div id="w-3cb4nvoc" className="com-text-block p-absolute">
              <div className="text-block">
                <h4 className="text-xs whiteSpace-nowrap">
                  <span style={{ fontWeight: 400 }}>Đội ngũ hỗ trợ 24/7</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4>Hình thức thanh toán</h4>
      <h4 className="text-block-css full-width">
        Thanh toán bằng tiền mặt (COD)
      </h4>

      <div className="flex items-center gap-2 mt-4">
        <h3>Giảm giá vận chuyển</h3>
        <div className="text-block">
          <h4 className="text-block-css full-width">40.000đ</h4>
        </div>
        <div className="text-block">
          <h4 className="text-block-css full-width">
            <span>25.000đ</span>
          </h4>
        </div>
      </div>

      <h4 className="text-block-css full-width">Chính sách đổi trả</h4>
      <h4 className="text-block-css full-width">Đổi trả trong vòng 3 ngày.</h4>
      <h4 className="text-block-css full-width">
        Cho phép kiểm tra hàng <span>kiểm tra hàng</span> trước khi thanh toán.
      </h4>

      <div className="flex items-center gap-2">
        <div className="logo">logo</div>
        <div id="w-1wrog8ib" className="com-text-block p-absolute">
          <div>
            <div className="text-block">
              <h3 className="text-block-css full-width">Bếp Xuyên Việt</h3>
            </div>
            <div id="w-d3g5dmtj" className="com-rectangle p-absolute">
              <div className="rectangle-css full-mask-size mask-position full-height full-width">
                logo
              </div>
            </div>
          </div>
        </div>
        <div>
          <button>Mua ngay</button>
        </div>
      </div>

      <div className="flex justify-between items-start border-b pb-2">
        <div className="flex flex-col items-start px-4 border-r">
          <span className="font-bold text-lg">23</span>
          <span className="text-sm text-gray-600">Mặt hàng</span>
        </div>

        <div className="flex flex-col items-start px-4 border-r">
          <span className="font-bold text-lg">66.5k</span>
          <span className="text-sm text-gray-600">Đã bán</span>
        </div>

        <div className="flex flex-col items-start px-4 border-r">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">99%</span>
            <span className="bg-green-200 text-green-900 text-xs font-semibold px-2 py-0.5 rounded">
              Cao
            </span>
          </div>
          <span className="text-sm text-gray-600">Trả lời trong vài phút</span>
        </div>

        <div className="flex flex-col items-start px-4">
          <span className="font-bold text-lg">97%</span>
          <span className="text-sm text-gray-600">Xuất kho trong 24 giờ</span>
        </div>
      </div>

      <div className="text-block">
        <h3 className="text-block-css full-width">
          Giới thiệu về sản phẩm này
        </h3>
      </div>

      <Slider images={imagesProduct} />

      <div className="max-w-xl mx-auto p-4">
        <h3 className="font-bold text-lg mb-3">
          5 LÝ DO NÊN CHỌN BẾP XUYÊN VIỆT
        </h3>

        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="mr-2">👉</span>
            <span>
              Cân mọi loại thịt, từ heo đến gà đến luôn hải sản, 1 chai "xài"
              được
              <span className="font-bold">2KG</span>
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-2">👉</span>
            <span>
              Tiết kiệm thời gian, <span className="font-bold">20 PHÚT</span> có
              ngay món ngon
            </span>
          </li>

          <li className="flex items-start">
            <span className="mr-2">👉</span>
            <span>Không cần nêm nếm thêm, vị ngon chuẩn nhà hàng</span>
          </li>

          <li className="flex items-start">
            <span className="mr-2">👉</span>
            <span>Luôn là lựa chọn hàng đầu của hàng ngàn gia đình Việt</span>
          </li>

          <li className="flex items-start">
            <span className="mr-2">👉</span>
            <span>Cam kết an toàn sức khỏe người tiêu dùng</span>
          </li>
        </ul>
      </div>

      <div className="text-block">
        <h3 className="text-block-css full-width">CAM KẾT VỀ CHẤT LƯỢNG</h3>
      </div>

      <div className="image-block-css p-relative full-width full-height full-mask-size mask-position">
        <div className="image-background p-absolute"></div>
      </div>

      <div className="max-w-xl mx-auto p-4">
        <ul className="space-y-2 list-disc list-inside">
          <li>Đạt chứng nhận An toàn vệ sinh thực phẩm.</li>
          <li>
            Đạt chứng nhận An toàn vệ sinh thực phẩm
            <span className="font-bold uppercase">quốc tế.</span>
          </li>
          <li>Đạt chứng nhận OCOP – Sản phẩm tiêu biểu khu vực.</li>
          <li>
            Sản phẩm an toàn và được
            <span className="font-bold">trẻ em yêu thích</span>
            (Có vị không cay).
          </li>
        </ul>

        <div className="mt-4">
          <p className="font-bold">Đánh giá của khách hàng (5.6k)</p>
          <div className="flex items-center space-x-2">
            <span>4.9/5</span>
            <div className="flex text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current text-gray-300"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-white boxshadow-md p-4 fixed bottom-0 left-0 w-[300px] flex  items-center">
        <div className="flex gap-2 m-auto">
          <button className="border-red-200">Liên hệ</button>
          <button className="bg-[#f44336] text-white px-2 py-2">
            Mua ngay
          </button>
        </div>
      </div> */}

      {/* <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-100">
        <div className="flex items-center justify-center gap-4 p-4 shadow-xl">
          <button className="px-6 py-2 border-2 border-red-500 text-red-500 font-bold rounded hover:bg-red-50 transition">
            Liên hệ
          </button>

          <button className="px-6 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition">
            Mua ngay
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Home;

import React from 'react';
import Slider from '../../components/Slider';
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTicket,
  faStar,
  faCreditCard,
  faRightLeft,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';

const images = [
  'https://content.pancake.vn/1/s938x938/fwebp/a6/32/30/2f/b6916226d26cb1c7f85bcb76653505b9f4e061e210f9ae82bc291535-w:2048-h:2048-l:682409-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s938x938/fwebp/91/26/b1/ea/4919a8e0d36d6150ae6bca8ae1ff707c18802cefed5e02b431a1407b-w:1200-h:1200-l:536947-t:image/png.png',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
  'https://content.pancake.vn/1/s941x939/fwebp/b9/0c/65/e7/0486b553cacbbb1a5009db2b4f2fac0e466e6ff7c72bd7aeac6c74ee-w:1179-h:1176-l:248902-t:image/jpeg.jpg',
];
const imagesProduct = [
  'https://content.pancake.vn/1/s838x838/fwebp/49/c4/d9/43/47d42948f43c05aeb6a8d9b156f55b67c872c1e96b1e4830a5a26c16-w:1200-h:1200-l:799968-t:image/png.png',
  'https://content.pancake.vn/1/s838x838/fwebp/75/4b/d3/d9/8b16505e47e5d11f566744f0f1e7dff70c0b671f38ba1e2db5772f39-w:1200-h:1200-l:750707-t:image/png.png',
  'https://content.pancake.vn/1/s838x838/fwebp/55/48/db/75/e27d40b6727968cffc4419a2ecf87e698a78c00c110e665f1997e57d-w:1200-h:1200-l:424813-t:image/png.png',
  'https://content.pancake.vn/1/s838x838/fwebp/b8/5a/37/a9/3e65bf1de1f09ece2600e50d875b6c328a012b150169efc32bda9130-w:1200-h:1200-l:440427-t:image/png.png',
];
const imageLogo =
  'https://content.pancake.vn/1/s100x100/fwebp/ab/ce/95/60/b6b15051e37161b5734545c844fc4eccad211fb613ef46cefc8882d1-w:1200-h:1200-l:191878-t:image/png.png';

const Home = () => {
  const salePrice = 59000; // Giá gốc (sau giảm)
  const originalPrice = 79000; // Giá chưa sale
  const savings = originalPrice - salePrice; // Tiết kiệm: 20,000đ
  const savingsPercent = Math.round((savings / originalPrice) * 100); // Tính phần trăm giảm giá

  return (
    <div className={styles.homeContainer}>
      <div className={styles.sliderWrapper}>
        <Slider images={images} />
        <div className={styles.navigationContainer}>
          <div className={`${styles.navItem} ${styles.super}`}>
            <div className={styles.content}>
              <div className={styles.innerContent}>
                <h2 className={styles.label}>SUPER</h2>
                <p className={styles.mainText}>
                  KHUYẾN MÃI
                  <br />
                  CỰC SỐC
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.navItem} ${styles.promo}`}>
            <div className={styles.content}>
              <div className={styles.innerContent}>
                <h2 className={styles.label}>XTRA</h2>
                <p className={styles.mainText}>
                  GIẢM GIÁ
                  <br />
                  VẬN CHUYỂN
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.navItem} ${styles.shipping}`}>
            <div className={styles.content}>
              <div className={styles.innerContent}>
                <p className={styles.bonusText}>BONUS</p>
                <h2 className={styles.mainText}>
                  GIÁ <br />
                  TỐT NHẤT
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div>
          <FontAwesomeIcon icon={faTicket} className={styles.iconvoucher} />
        </div>
        <div className="flex flex-col">
          <div className={styles.salePrice}>
            {salePrice.toLocaleString('vi-VN')}đ
          </div>
          <div className={styles.originalPrice}>
            {originalPrice.toLocaleString('vi-VN')}đ
          </div>
        </div>
        <div className={styles.savingAmount}>
          <p className={styles.per}>Tiết kiệm: {savingsPercent}%</p>
        </div>
      </div>

      <h5 className="text-xl font-bold mt-4 mb-4">
        Xốt ướp thịt nướng BBQ Bếp Xuyên Việt 400g cho 2kg thịt heo, bò, hải
        sản,...
      </h5>

      <div className={styles.ratingContainer}>
        <FontAwesomeIcon icon={faStar} className={styles.starIcon} />
        <strong> 4.9</strong> /5 (5.6k) | Đã bán<strong> 66.5K</strong>
      </div>

      <div className="flex gap-2 mt-8 service">
        <div className="group-container">
          <div id="w-s9tl86jd" className="com-rectangle p-absolute">
            <div className="rectangle-css full-mask-size mask-position full-height full-width"></div>
          </div>
          <div id="w-6dqlrvc4" className="com-text-block p-absolute">
            <div className="text-block">
              <h4 className="text-xs whiteSpace-nowrap">
                <span style={{ fontWeight: 400 }}>
                  <FontAwesomeIcon
                    className={styles.iconservice}
                    icon={faCreditCard}
                  />
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
                  <span style={{ fontWeight: 400 }}>
                    <FontAwesomeIcon
                      className={styles.iconservice}
                      icon={faRightLeft}
                    />
                    Đổi trả dễ dàng
                  </span>
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
                  <span style={{ fontWeight: 400 }}>
                    {' '}
                    <FontAwesomeIcon
                      className={styles.iconservice}
                      icon={faMessage}
                    />{' '}
                    Đội ngũ hỗ trợ 24/7
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.line}>
        <hr className={styles.divider} />
      </div>
      <div className={styles.paymentContainer}>
        <h4 className={styles.title}>Hình thức thanh toán</h4>
        <h4 className={styles.codSection}>
          <h1 className={styles.codIcon}>COD</h1> Thanh toán bằng tiền mặt (COD)
        </h4>
      </div>
      <div className={styles.line}>
        <hr className={styles.divider} />
      </div>
      <div className="flex items-center gap-2 mt-4">
        <h3>Giảm giá vận chuyển</h3>
        <div className="text-block">
          <h4 className="text-block-css full-width original-price">40.000đ</h4>
        </div>
        <div className="text-block">
          <h4 className="text-block-css full-width discounted-price">
            <span>25.000đ</span>
          </h4>
        </div>
      </div>
      <div className={styles.line}>
        <hr className={styles.divider} />
      </div>
      <p className={`${styles.exchangeTitle}`}>
        <strong>Chính sách đổi trả</strong>
      </p>
      <p className={`${styles.exchangeContent}`}>
        Đổi trả trong vòng <strong>3 ngày</strong>.
      </p>
      <p className={`${styles.exchangeContent}`}>
        Cho phép kiểm tra hàng <strong>kiểm tra hàng</strong> trước khi thanh
        toán.
      </p>

      <div className={styles.brandContainer}>
        <div className={styles.logoContainer}>
          <img
            src={imageLogo}
            alt="Bếp Xuyên Việt Logo"
            className={styles.logo}
          />
        </div>
        <div className={styles.brandInfo}>
          <div className={styles.brandContent}>
            <h3 className={styles.brandName}>Bếp Xuyên Việt</h3>
            <div className={styles.ratingBox}>
              <FontAwesomeIcon icon={faStar} className={styles.starIcon} /> 4.9
            </div>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <button className={styles.buyButton}>Mua ngay</button>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>23</span>
          <span className={styles.statLabel}>Mặt hàng</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>66.5k</span>
          <span className={styles.statLabel}>Đã bán</span>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statWithBadge}>
            <span className={styles.statNumber}>99%</span>
            <span className={styles.badge}>Cao</span>
          </div>
          <span className={styles.statLabel}>Trả lời trong vài phút</span>
        </div>

        <div className={styles.statItem}>
          <span className={styles.statNumber}>97%</span>
          <span className={styles.statLabel}>Xuất kho trong 24 giờ</span>
        </div>
      </div>

      <div className="text-block">
        <h3 className={styles.introTitle}>
          <strong>Giới thiệu về sản phẩm này</strong>
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
        <h3 className="text-block-css full-width">
          {' '}
          <strong>CAM KẾT VỀ CHẤT LƯỢNG</strong>{' '}
        </h3>
      </div>

      <div className="image-block-css p-relative full-width full-height full-mask-size mask-position">
        <div className="image-background p-absolute"></div>
      </div>

      <div className="max-w-xl mx-auto p-4">
        <ul className="space-y-2 list-disc list-inside">
          <li>Đạt chứng nhận An toàn vệ sinh thực phẩm.</li>
          <li>
            Đạt chứng nhận An toàn vệ sinh thực phẩm <br />
            <strong>Quốc Tế</strong>
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
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current text-gray-300"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3 .921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
          <button className={styles.buyButton}>
            Mua ngay
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;

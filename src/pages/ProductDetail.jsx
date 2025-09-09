import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CartContext from '../context/CartContext';
import { formatPrice } from '../utils/priceUtil';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useContext(CartContext);
  const [product, setProduct] = useState(location.state?.product || null);
  const [quantity, setQuantity] = useState(location.state?.quantity || 1);
  const [selectedBox, setSelectedBox] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/product/${id}`);
        const data = await res.json();
        setProduct(data);
        console.log('Fetched product detail:', data);
        // Scroll to top after fetching product detail
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id, product,API_URL]);

  console.log('ProductDetail component rendered with product:', product);

  useEffect(() => {
    if (!product) return;

    const fetchDiscounts = async () => {
      try {
        const url = `${API_URL}/api/discounts/product/${product.id}`;
        console.log('Fetching discounts from:', url);
        const res = await fetch(url);
        console.log('Response status:', res.status);
        if (!res.ok) {
          throw new Error('Failed to fetch discounts');
        }
        const data = await res.json();
        console.log('Fetched discounts data:', data);
        setDiscounts(data);
      } catch (error) {
        console.error('Failed to fetch discounts:', error);
      }
    };

    fetchDiscounts();
  }, [product, API_URL]);

  const handleBuyNow = () => {
    if (product.classifications && product.classifications.length > 0 && !selectedBox) {
      alert('Vui lòng chọn phân loại trước khi mua hàng.');
      return;
    }
    if (product) {
      const productWithClassification = {
        ...product,
        selectedClassification: selectedBox,
      };
      addItem(productWithClassification, quantity);
      navigate('/order', {
        state: {
          productId: product.id,
          productTitle: product.description || product.title,
          selectedClassification: selectedBox,
        },
      });
    }
  };

  const addToCart = () => {
    if (!product) return;
    if (product.classifications && product.classifications.length > 0 && !selectedBox) {
      alert('Vui lòng chọn phân loại trước khi thêm vào giỏ hàng.');
      return;
    }

    console.log(
      'addToCart called with product id:',
      product.id,
      'quantity:',
      quantity,
      'selected classification:',
      selectedBox
    );
    const productWithClassification = {
      ...product,
      selectedClassification: selectedBox,
    };
    addItem(productWithClassification, quantity);
    // Removed redundant event dispatch here since it's done inside addItem now
    setQuantity(1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity(prev => (product && prev < product.quantity ? prev + 1 : prev));
  };

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto my-8 font-sans px-4 text-center">
        <Header />
        Đang tải sản phẩm...
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="max-w-7xl mx-auto my-8 font-sans px-4">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>{' '}
          {'>'}{' '}
          <Link to="/products/6" className="hover:underline">
            Sản phẩm
          </Link>{' '}
          {'>'}{' '}
          <span className="text-red-600 font-semibold">
            {product.name || product.title}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 w-full md:w-1/2 flex flex-col">
            <div className="flex-grow mb-4">
              <img
                src={product.imageUrl}
                alt={product.description || product.title || 'thumbnail'}
                className="w-full h-[400px] object-contain rounded"
              />
            </div>
            {/* Thumbnail images below main image */}
            <div className="flex mt-4 space-x-4 overflow-x-auto">
              {/* For simplicity, show the main image multiple times */}
              <img
                src={product.imageUrl}
                alt={
                  product.description
                    ? product.description + ' thumbnail 1'
                    : product.title + ' thumbnail 1'
                }
                className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-green-600"
              />
              <img
                src={product.imageUrl}
                alt={
                  product.description
                    ? product.description + ' thumbnail 2'
                    : product.title + ' thumbnail 2'
                }
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
              <img
                src={product.imageUrl}
                alt={
                  product.description
                    ? product.description + ' thumbnail 3'
                    : product.title + ' thumbnail 3'
                }
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
              <img
                src={product.imageUrl}
                alt={
                  product.description
                    ? product.description + ' thumbnail 4'
                    : product.title + ' thumbnail 4'
                }
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
              <img
                src={product.imageUrl}
                alt={
                  product.description
                    ? product.description + ' thumbnail 5'
                    : product.title + ' thumbnail 5'
                }
                className="w-20 h-20 object-cover rounded cursor-pointer border"
              />
            </div>
          </div>

          <div className="flex-grow w-full md:w-1/2 text-left">
            <h1 className="text-2xl font-bold mb-2">
              {product.description || product.title}
            </h1>
            <div className="mb-2">
              <span className="font-semibold">Mã sản phẩm: </span>
              <span className="text-red-600">{product.code || '01040721'}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold">Thương hiệu: </span>
              <span className="text-orange-600">Đang cập nhật</span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Tình trạng: </span>
              <span className="text-red-600">
                {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-semibold">Giá bán: </span>
              <span className="text-orange-600 text-xl font-semibold">
                {product.price ? formatPrice(product.price) : '169.000đ'}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex space-x-2 items-center relative z-50">
                <span className="font-semibold">Mã giảm giá: </span>
                {discounts.length === 0 ? (
                  <span className="text-gray-500">Không có mã giảm giá</span>
                ) : (
                  discounts.map(discount => (
                    <div
                      key={discount.code}
                      className="relative"
                      onMouseEnter={() => setTooltipVisible(discount.code)}
                      onMouseLeave={() => setTooltipVisible(null)}
                    >
                      <button
                        className="border border-orange-400 text-orange-400 rounded px-2 py-1 hover:bg-orange-100 transition"
                        onClick={() => {
                          navigator.clipboard.writeText(discount.code);
                          localStorage.setItem(
                            'lastCopiedDiscountCode',
                            discount.code
                          );
                          alert(`Đã sao chép mã: ${discount.code}`);
                        }}
                        aria-describedby={`tooltip-${discount.code}`}
                      >
                        {discount.name}
                      </button>
                      {tooltipVisible === discount.code && (
                        <div
                          id={`tooltip-${discount.code}`}
                          className="absolute top-full left-0 mt-1 w-48 p-2 bg-white border border-gray-300 rounded shadow-lg z-50 text-xs text-gray-700"
                          onMouseEnter={() => setTooltipVisible(discount.code)}
                          onMouseLeave={() => setTooltipVisible(null)}
                        >
                          <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white"></div>
                          <div className="absolute h-2 w-14 -top-2 left-7 bg-transparent"></div>
                          <div className="flex justify-between items-center">
                            <span className="flex-2">
                              {discount.description}
                            </span>
                            <button
                              className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded hover:bg-orange-600 transition flex-1"
                              onClick={e => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(discount.code);
                                localStorage.setItem(
                                  'lastCopiedDiscountCode',
                                  discount.code
                                );
                                alert(`Đã sao chép mã: ${discount.code}`);
                              }}
                            >
                              Sao chép mã
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <div className="font-semibold mr-2 w-[160px]">Phân loại: </div>
              <div className='flex flex-wrap'>
                {product.classifications &&
                product.classifications.length > 0 ? (
                  product.classifications.map((classification, index) => (
                    <button
                      key={index}
                      className={`border rounded px-3 py-1 mr-2 hover:bg-gray-100 transition ${
                        selectedBox === classification.label
                          ? 'border-green-600 bg-green-200'
                          : 'border-gray-200'
                      } flex items-center space-x-2`}
                      onClick={() => setSelectedBox(classification.label)}
                    >
                      {classification.imageUrl && (
                        <img
                          src={classification.imageUrl}
                          alt={classification.label}
                          className="w-7 h-7 object-contain"
                        />
                      )}
                      <span>{classification.label}</span>
                    </button>
                  ))
                ) : (
                  <>
                    <h3 className="text-sm text-gray-600">
                      Chưa có thông tin loại.
                    </h3>
                  </>
                )}
              </div>
            </div>
            <div className="mb-6 flex items-center space-x-4">
              <span className="font-semibold">Số lượng: </span>
              <div className="flex items-center border border-gray-400 rounded">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className={`px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 transition ${
                    quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={e => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      // Allow only digits or empty string
                      let numVal = val === '' ? '' : Math.max(1, Number(val));
                      if (
                        product &&
                        numVal !== '' &&
                        numVal > product.quantity
                      ) {
                        numVal = product.quantity;
                      }
                      setQuantity(numVal);
                    }
                  }}
                  onBlur={() => {
                    if (quantity === '' || quantity === 0) {
                      setQuantity(1);
                    } else if (product && quantity > product.quantity) {
                      setQuantity(product.quantity);
                    }
                  }}
                  className="w-12 text-center border-l border-r border-gray-400"
                />
                <button
                  onClick={increaseQuantity}
                  disabled={product && quantity >= product.quantity}
                  className={`px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 transition ${
                    product && quantity >= product.quantity
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={addToCart}
                disabled={product.quantity === 0}
                className={`bg-orange-500 text-white px-6 py-3 rounded transition cursor-pointer ${
                  product.quantity === 0
                    ? 'opacity-50 cursor-not-allowed hover:bg-orange-500'
                    : 'hover:bg-orange-600'
                }`}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={handleBuyNow}
                disabled={product.quantity === 0}
                className={`bg-gray-300 text-gray-800 px-6 py-3 rounded transition cursor-pointer ${
                  product.quantity === 0
                    ? 'opacity-50 cursor-not-allowed hover:bg-gray-300'
                    : 'hover:bg-gray-400'
                }`}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-4 text-gray-800 text-sm leading-relaxed whitespace-pre-line">
          1. THÔNG TIN SẢN PHẨM{'\n'}
          Tên sản phẩm: Khăn giấy cao cấp đa sắc{'\n'}
          Thành phần chính: 100% bột giấy từ thiên nhiên{'\n'}
          Đơn vị SX & Chịu trách nhiệm: Công Ty TNHH Thương Mại Xuất Nhập Khẩu
          Fani{'\n'}
          Địa chỉ trụ sở: Số nhà 93, Đường 16, Thôn Đông, Xã Phù Lỗ, Huyện Sóc
          Sơn, Thành phố Hà Nội, Việt Nam{'\n'}
          Địa chỉ sản xuất: Số 613, đường Tỉnh lộ 2, ấp Lão Táo Trung, xã Trung
          Lập Hạ, huyện Củ Chi, Thành phố Hồ Chí Minh Đóng gói: 6 Bịch{'\n'}
          NSX: xem trên bao bì{'\n'}
          Khổ giấy: 158 x 175mm{'\n'}
          HSD: 3 năm{'\n'}
          Bảo quản: Nơi khô ráo thoáng mát{'\n'}
          Hotline: 19009441{'\n'}
          Định lượng: 12.5g/m2 (+-0.5g){'\n'}
          Tiêu chuẩn cơ sở: TCCS 22:2024/FANI-KG{'\n'}
          Đạt QCVN 09: 2015/BCT
        </div>

        <section className="mt-6 mb-6">
          <h2 className="text-lg font-semibold border-b-2 border-orange-500 inline-block pb-1 mb-3">
            2. ĐẶC ĐIỂM NỔI BẬT - SẢN PHẨM AN TOÀN ĐẠT QUY CHUẨN QUỐC GIA
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
            <li>Khăn giấy đạt QCVN 09: 2015/BCT</li>
            <li>
              Không có formaldehyde và kim loại nặng : Không gây kích ứng da –
              an toàn khi dùng lau mặt, lau tay.
            </li>
            <li>
              Không chứa chất tẩy trắng huỳnh quang: An tâm dùng cho trẻ nhỏ,
              người có làn da nhạy cảm.
            </li>
            <li>
              Cấu trúc 4 lớp dày dặn, mềm mịn: mỗi lần sử dụng chỉ cần 1-2 tờ,
              hạn chế lãng phí
            </li>
            <li>
              Thấm hút tốt, thích hợp cả lau khô và lau ướt, ít hao giấy khi sử
              dụng
            </li>
            <li>
              Tiện lợi treo trong nhiều môi trường khác nhau: bàn ăn, phòng
              khách, văn phòng, nhà vệ sinh, phòng bếp,...
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold border-b-2 border-orange-500 inline-block pb-1 mb-3">
            3. CHÍNH SÁCH SHOP HỖ TRỢ KHÁCH HÀNG:
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
            <li>1 ĐỀN 3 nếu sản phẩm có vấn đề về chất lượng</li>
            <li>
              Hỗ trợ khách hàng 24/7 nếu gặp bất cứ vấn đề gì liên quan đến quá
              trình mua bán, vận chuyển sản phẩm.
            </li>
            <li>Miễn phí đổi trả nếu hàng lỗi, rách do NSX</li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Modal from '../components/common/Modal';
import CartContext from '../context/CartContext';
import { formatPrice } from '../utils/priceUtil';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}/search/products?q=${encodeURIComponent(
            searchQuery
          )}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [searchQuery]);

  const handleProductClick = product => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <Header />

      <div className="p-5 bg-[#e6ecf5] min-h-[600px] font-sans pl-10 md:pl-20 lg:pl-20 pr-10 md:pr-20 lg:pr-20">
        <nav className="text-sm text-gray-500 mb-5">
          <a href="/" className="hover:underline">
            Trang chủ
          </a>
          {'>'} <span className="text-orange-500 font-semibold">Tìm kiếm</span>
        </nav>

        {loading ? (
          <p>Đang tải kết quả...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi: {error}</p>
        ) : products.length > 0 ? (
          <>
            <h1 className="text-2xl font-bold mb-5 text-gray-900">
              Có {products.length} kết quả tìm kiếm phù hợp
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md  p-3 flex flex-row md:flex-col cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.imageUrl}
                    alt="Product"
                    className="rounded-lg mb-2 object-cover"
                  />
                  <p className="text-sm text-gray-800 mb-auto line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-orange-500 font-bold text-lg">
                      {formatPrice(product.price)}
                      {product.currency}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full border border-orange-400 text-orange-400 flex justify-center items-center hover:bg-orange-50"
                      aria-label="Filter"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current"
                      >
                        <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm2 6h6v2H9v-2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <p className="mb-3 text-gray-900">
              Không tìm thấy bất kỳ kết quả nào với từ khóa trên.
            </p>
            <h2 className="text-3xl font-bold mb-5 text-gray-900">
              Nhập từ khóa để tìm kiếm
            </h2>
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full rounded-md border border-gray-300 py-2 px-4 pr-10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={searchQuery}
                onChange={e => {
                  const newQuery = e.target.value;
                  // Update URL query param without page reload
                  const params = new URLSearchParams(location.search);
                  if (newQuery) {
                    params.set('name', newQuery);
                  } else {
                    params.delete('name');
                  }
                  window.history.replaceState(
                    {},
                    '',
                    `${location.pathname}?${params.toString()}`
                  );
                  setProducts([]); // Clear products while typing
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedProduct} onClose={closeModal}>
        {selectedProduct && (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.description}
                className="w-full h-auto rounded"
              />
              {/* Thumbnail images below main image */}
              <div className="flex mt-4 space-x-4 overflow-x-auto">
                {/* Example thumbnails, replace with real thumbnails if available */}
                <img
                  src={selectedProduct.imageUrl}
                  alt={`${selectedProduct.description} thumbnail 1`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-green-600"
                />
                <img
                  src={selectedProduct.imageUrl}
                  alt={`${selectedProduct.description} thumbnail 2`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
                <img
                  src={selectedProduct.imageUrl}
                  alt={`${selectedProduct.description} thumbnail 3`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
                <img
                  src={selectedProduct.imageUrl}
                  alt={`${selectedProduct.description} thumbnail 4`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
              </div>
            </div>
            <div className="flex-grow w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">
                {selectedProduct.description}
              </h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Qui cách: Combo 2 cây</span>
                <span className="text-lg font-semibold">
                  Giá bán: {formatPrice(selectedProduct.price)}{' '}
                  {selectedProduct.currency}
                </span>
              </div>
              <h4 className="font-semibold mb-2">Mô tả chi tiết</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6 max-h-64 overflow-y-auto">
                <li>Loại bảo quản: nơi khô ráo</li>
                <li>Loại bao bì gói: nilon</li>
                <li>Loại bao bì thùng: cartoon</li>
                <li>Kích thước: 100x105mm</li>
                <li>Qui cách: 10 cuộn x 4 lớp</li>
                <li>Hữu cơ: không</li>
                <li>CẢNH BÁO TUỔI: không</li>
                <li>Thông tin gây dị ứng: không</li>
                <li>Hạn sử dụng: in trên bao bì</li>
                <li>Được sản xuất theo công nghệ Nhật Bản</li>
                <li>Khu vực xuất xứ: Việt Nam</li>
                <li>Thành phần: 100% bột giấy</li>
                <li>Có chứng nhận về sp.</li>
                <li>Chứng nhận về nhà sản xuất.</li>
              </ul>
              <div className="flex w-full">
                <div className="flex space-x-4 mr-6">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 cursor-pointer rounded hover:bg-green-700 flex items-center justify-center"
                    // onClick={() => {
                    //   let arrProduct = localStorage.getItem('cartItems');
                    //   let cartArray = arrProduct ? JSON.parse(arrProduct) : [];

                    //   const existingProductIndex = cartArray.findIndex(
                    //     item => item.id === selectedProduct.id
                    //   );

                    //   if (existingProductIndex !== -1) {
                    //     cartArray[existingProductIndex].quantity =
                    //       (cartArray[existingProductIndex].quantity || 1) + 1;
                    //   } else {
                    //     cartArray.push({ ...selectedProduct, quantity: 1 });
                    //   }

                    //   localStorage.setItem(
                    //     'cartItems',
                    //     JSON.stringify(cartArray)
                    //   );
                    //   updateCartCount();

                    //   closeModal();
                    // }}
                    onClick={() => {
                      if (selectedProduct) {
                        addItem(selectedProduct, quantity);
                        setSelectedProduct(null);
                      }
                    }}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded hover:bg-green-700 flex items-center justify-center"
                    // onClick={() => {
                    //   if (selectedProduct) {
                    //     window.location.href = `/order?productId=${
                    //       selectedProduct.id
                    //     }&productTitle=${encodeURIComponent(
                    //       selectedProduct.description
                    //     )}`;
                    //   }
                    // }}
                    onClick={() => {
                      if (selectedProduct) {
                        setSelectedProduct(null);
                        navigate(`/product/detail/${selectedProduct.id}`, {
                          state: { product: selectedProduct, quantity },
                        });
                      }
                    }}
                  >
                    Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
};

export default SearchResults;

import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Modal from '../components/common/Modal';

// const exampleData = [
//   {
//     id: 2,
//     title: "Khăn ướt Topgia 80 tờ 15x20cm mềm mại, không mùi không...",
//     price: "159.000đ",
//     description: "Mô tả chi tiết sản phẩm khăn ướt Topgia 80 tờ.",
//     img: "https://khangiaysukimoko.com/img/CB3-6C/CB3C-001.png",
//   },
//   // Add more items if needed
// ];

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load favoriteProductsBestSelling and favoriteProductsTodaySuggestion from localStorage and merge two arrays
    const storedBestSelling = localStorage.getItem('favoriteProductsBestSelling');
    const storedTodaySuggestion = localStorage.getItem('favoriteProductsTodaySuggestion');

    let favoritesArray = [];
    if (storedBestSelling) {
      favoritesArray = JSON.parse(storedBestSelling);
    }
    if (storedTodaySuggestion) {
      const todaySuggestionArray = JSON.parse(storedTodaySuggestion);
      // Merge arrays avoiding duplicates by id
      const mergedMap = new Map();
      favoritesArray.forEach(item => mergedMap.set(item.id, item));
      todaySuggestionArray.forEach(item => {
        if (!mergedMap.has(item.id)) {
          mergedMap.set(item.id, item);
        }
      });
      favoritesArray = Array.from(mergedMap.values());
    }
    setFavorites(favoritesArray);
  }, []);

  // useEffect(() => {
  //   // Save favorite products to localStorage on change
  //   localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
  // }, [favorites]);

  const handleIconClick = productId => {
    // Placeholder for icon button action, e.g., remove from favorites
    alert(`Icon clicked for product ID: ${productId}`);
  };

  const openModal = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleOrder = product => {
    alert(`Order placed for product: ${product.title}`);
    closeModal();
  };

  return (
    <>
      <Header />

      <div className="p-4 bg-gray-100 h-100">
        <nav className="text-sm text-gray-600 mb-4">
          <span>Trang chủ</span> {'>'} {' '}
          <span className="text-orange-500 font-semibold">Yêu thích</span>
        </nav>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              Chưa có sản phẩm yêu thích
            </div>
          ) : (
            favorites.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow p-2 relative flex flex-col cursor-pointer"
                onClick={() => openModal(product)}
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-2 text-sm text-gray-800 line-clamp-2 flex-grow">
                  {product.title}
                </div>
                <div className="mt-1 font-bold text-orange-500 text-lg">
                  {product.price}
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleIconClick(product.id);
                  }}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center"
                  aria-label="Icon Button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#f97316"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        
      </div>

      {isModalOpen && selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-1/2">
              <img
                src={selectedProduct.img}
                alt={selectedProduct.title}
                className="w-full h-auto rounded"
              />
              {/* Thumbnail images below main image */}
              <div className="flex mt-4 space-x-4 overflow-x-auto">
                {/* Example thumbnails, replace with real thumbnails if available */}
                <img
                  src={selectedProduct.img}
                  alt={`${selectedProduct.title} thumbnail 1`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border-2 border-green-600"
                />
                <img
                  src={selectedProduct.img}
                  alt={`${selectedProduct.title} thumbnail 2`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
                <img
                  src={selectedProduct.img}
                  alt={`${selectedProduct.title} thumbnail 3`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
                <img
                  src={selectedProduct.img}
                  alt={`${selectedProduct.title} thumbnail 4`}
                  className="w-20 h-20 object-cover rounded cursor-pointer border"
                />
              </div>
            </div>
            <div className="flex-grow w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-2">{selectedProduct.title}</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Qui cách: Combo 2 cây</span>
                <span className="text-lg font-semibold">Giá bán: {selectedProduct.price}</span>
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
              <div className="flex space-x-4">
                <button
                  className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded hover:bg-green-700 flex items-center justify-center"
                  onClick={() => handleOrder(selectedProduct)}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default Favorites;

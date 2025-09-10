import { FiSliders } from 'react-icons/fi';
import { FaHeart, FaThLarge } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtil';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const TodaySuggestion = () => {
  const navigate = useNavigate();
  const tabs = [
    'Dành cho bạn',
    'Freeship toàn quốc',
    'Xu hướng',
    'Hàng mới',
    'Bán chạy',
  ];

  // Removed unused destructuring from CartContext

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (showAllProducts) {
          setProducts(data);
        } else {
          // Filter products with suggestion === true
          const suggestedProducts = data.filter(
            product => product.suggestion === true
          );
          setProducts(suggestedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [showAllProducts]);

  const handleOrderClick = product => {
    // Add selected product to order array in localStorage only if not already added
    let orderArr = localStorage.getItem('order');
    let orderArray = orderArr ? JSON.parse(orderArr) : [];

    const existingIndex = orderArray.findIndex(item => item.id === product.id);

    if (existingIndex !== -1) {
      orderArray[existingIndex].quantity =
        (orderArray[existingIndex].quantity || 1) + 1;
    } else {
      const { ...productWithoutColors } = product;
      orderArray.push({ ...productWithoutColors, quantity: 1 });
    }

    try {
      localStorage.setItem('order', JSON.stringify(orderArray));
    } catch (error) {
      console.error('Failed to save order to localStorage:', error);
    }

    navigate('/order', {
      state: { productId: product.id, productTitle: product.title },
    });
  };

  const handleShowMoreClick = () => {
    setShowAllProducts(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm m-auto mt-4">
      <div className="mb-4 border-b border-gray-300">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <FaThLarge className="text-[#333333] text-xl mr-2" />
          Gợi ý hôm nay
        </h2>
        <div className="flex space-x-2 overflow-x-auto mb-4 pb-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gray-300 text-gray-700 font-semibold'
                  : 'bg-[#ffe5ec] text-[333333] '
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="flex relative flex-col cursor-pointer border border-gray-200 rounded-md p-2 group transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-orange-500"
            onClick={() =>
              navigate(`/product/detail/${product.id}`, { state: { product } })
            }
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md mb-2"
            />

            {/* Icon ẩn và hiện khi hover vào ảnh */}
            <div className="absolute top-[20px] right-[20px] text-xl bg-white hover:bg-[#f0c99d] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
              <FaHeart />
              {/* color={isFavorite(product) ? '#ff6c00' : 'gray'} */}
            </div>

            <p className="text-xs text-gray-700 flex-grow">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-orange-600 font-semibold">
                {formatPrice(product.price)}
              </span>
              <button
                className="text-orange-500 border border-[#ffdfc7] p-2 rounded-full hover:text-orange-700"
                onClick={e => {
                  e.stopPropagation();
                  handleOrderClick(product);
                }}
              >
                <FiSliders />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        {!showAllProducts && (
          <button
            className="px-6 py-2 cursor-pointer border border-[ffe5ec] text-[#333333] rounded-md hover:bg-[#ffe5ec] hover:text-[#333333] transition"
            onClick={handleShowMoreClick}
          >
            Xem thêm
          </button>
        )}
      </div>
    </div>
  );
};
export default TodaySuggestion;

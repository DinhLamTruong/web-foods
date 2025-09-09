import { useState, useEffect } from 'react';
import { FiSliders, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
// import CartContext from '../../context/CartContext';
import { formatPrice } from '../../utils/priceUtil';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BestSellingProducts = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [showAllProducts, setShowAllProducts] = useState(false);
  useEffect(() => {
    // Fetch all products from API and filter best selling locally if showAllProducts is false
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
          // Filter products with bestSelling true or 1
          const bestSellingProducts = data.filter(
            product => product.bestSelling === true || product.bestSelling === 1
          );
          setProducts(bestSellingProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [showAllProducts]);

  const handleProductClick = product => {
    navigate(`/product/detail/${product.id}`, { state: { product } });
  };

  const handleOrderClick = product => {
    // Add selected product to order array in localStorage, increment quantity if exists
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

    localStorage.setItem('order', JSON.stringify(orderArray));

    navigate('/order', {
      state: {
        productId: product.id,
        productTitle: product.title,
      },
    });
  };

  const toggleFavorite = (e, product) => {
    e.stopPropagation(); // Prevent triggering product card click
    const isFavorite = favorites.some(fav => fav.id === product.id);
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const isFavorite = product => {
    return favorites.some(fav => fav.id === product.id);
  };

  // Removed unused function handleAddProductToCart to fix eslint warning

  const handleShowAllClick = e => {
    e.preventDefault();
    setShowAllProducts(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm m-auto mt-10">
      <div className="flex justify-between items-center mb-4 bg-[#43bb1b] p-6 rounded-t-lg ">
        <h2 className="text-white font-semibold flex items-center">
          <FiSliders className="mr-2" />
          Top sản phẩm bán chạy
        </h2>
        <button
          className="hidden md:block lg:block text-white text-sm hover:underline cursor-pointer"
          onClick={handleShowAllClick}
        >
          Xem tất cả &rarr;
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-white group relative rounded-lg shadow-md p-2 flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border hover:border-orange-500"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-80 object-cover rounded-md mb-2"
            />
            {/* Icon ẩn và hiện khi hover vào ảnh */}
            <div
              className="absolute top-[20px] right-[20px] text-xl text-[#ff6c00] bg-white hover:bg-[#f0c99d] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              onClick={e => toggleFavorite(e, product)}
              aria-label={
                isFavorite(product)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              <FiHeart fill={isFavorite(product) ? '#ff6c00' : 'none'} />
            </div>
            <p className="text-sm text-gray-700 flex-grow">
              {product.description}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-orange-500 font-semibold">
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
    </div>
  );
};

export default BestSellingProducts;

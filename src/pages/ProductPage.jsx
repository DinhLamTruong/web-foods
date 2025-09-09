import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Modal from '../components/common/Modal';
import Sidebar from '../components/product/Sidebar';
import Banners from '../components/product/Banners';
import ProductCard from '../components/product/ProductCard';
import { formatPrice } from '../utils/priceUtil';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const categories = [
  { id: 1, name: 'Giấy cuộn', slug: 'giay-cuon' },
  {
    id: 2,
    name: 'Khăn giấy ướt',
    slug: 'khan-giay-uot',
  },
  {
    id: 3,
    name: 'Khăn giấy rút treo tường',
    slug: 'khan-giay-rut-treo-tuong',
  },
  {
    id: 4,
    name: 'Khăn giấy rút',
    slug: 'khan-giay-rut',
  },
];

const sortOptions = [
  { id: 'default', label: 'Mặc định' },
  { id: 'az', label: 'Tên A-Z' },
  { id: 'za', label: 'Tên Z-A' },
  { id: 'priceAsc', label: 'Giá thấp đến cao' },
  { id: 'priceDesc', label: 'Giá cao xuống thấp' },
];

const priceRanges = [
  { id: 'under100', label: 'Giá dưới 100.000đ' },
  { id: '100to200', label: '100.000đ - 200.000đ' },
  { id: '200to300', label: '200.000đ - 300.000đ' },
  { id: 'above300', label: 'Trên 300.000đ' },
];

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(0); // Default to no category selected
  const [selectedSort, setSelectedSort] = useState('default');
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const { addItem } = useContext(CartContext);
  const navigate = useNavigate();

  const { category } = useParams();

  useEffect(() => {
    // Map category slug from URL to category id
    if (category) {
      const categoryObj = categories.find(c => c.slug === category);
      if (categoryObj) {
        setSelectedCategory(categoryObj.id);
      } else {
        setSelectedCategory(0); // No category matched
      }
    } else {
      setSelectedCategory(0);
    }
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSort, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/product`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelectCategory = categoryId => {
    setSelectedCategory(categoryId);
  };

  const handleSelectSort = sortId => {
    setSelectedSort(sortId);
  };

  const handleSelectPriceRange = rangeId => {
    if (selectedPriceRange.includes(rangeId)) {
      setSelectedPriceRange(selectedPriceRange.filter(id => id !== rangeId));
    } else {
      setSelectedPriceRange([...selectedPriceRange, rangeId]);
    }
  };

  const handleProductClick = product => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  // Filter products by selected category
  // Fix: filter by categoryType string matching category name instead of categoryId
  const selectedCategoryName =
    categories.find(c => c.id === selectedCategory)?.name || '';
  let filteredProducts = products.filter(
    p => p.categoryType === selectedCategoryName
  );

  // Filter by price range (simple example, real implementation may vary)
  if (selectedPriceRange.length > 0) {
    filteredProducts = filteredProducts.filter(product => {
      const price = parseInt(product.price.replace(/\./g, ''));
      return selectedPriceRange.some(rangeId => {
        switch (rangeId) {
          case 'under100':
            return price < 100000;
          case '100to200':
            return price >= 100000 && price <= 200000;
          case '200to300':
            return price > 200000 && price <= 300000;
          case 'above300':
            return price > 300000;
          default:
            return true;
        }
      });
    });
  }

  // Sort products
  if (selectedSort === 'az') {
    filteredProducts.sort((a, b) => a.description.localeCompare(b.description));
  } else if (selectedSort === 'za') {
    filteredProducts.sort((a, b) => b.description.localeCompare(a.description));
  } else if (selectedSort === 'priceAsc') {
    filteredProducts.sort(
      (a, b) =>
        parseInt(a.price.replace(/\./g, '')) -
        parseInt(b.price.replace(/\./g, ''))
    );
  } else if (selectedSort === 'priceDesc') {
    filteredProducts.sort(
      (a, b) =>
        parseInt(b.price.replace(/\./g, '')) -
        parseInt(a.price.replace(/\./g, ''))
    );
  }

  return (
    <>
      <Header />

      <div className="p-2 bg-[#e6ecf5] min-h-[600px] font-sans pl-10 md:pl-20 lg:pl-20 pr-10 md:pr-20 lg:pr-20">
        <nav className="text-sm text-gray-500 mb-5">
          <a href="/" className="hover:underline">
            Trang chủ
          </a>
          {'>'}
          <span className="text-orange-500 font-semibold">
            {categories.find(c => c.id === selectedCategory)?.name}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:space-x-6 w-full">
          <div className="w-[100%] md:w-[30%] lg:w-[20%] mb-6 md:mb-0">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
              sortOptions={sortOptions}
              selectedSort={selectedSort}
              onSelectSort={handleSelectSort}
              priceRanges={priceRanges}
              selectedPriceRange={selectedPriceRange}
              onSelectPriceRange={handleSelectPriceRange}
            />
          </div>

          {/* Main content area */}
          <div className="flex-grow w-[100%] md:w-[70%] lg:w-[80%]">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {categories
                .find(c => c.id === selectedCategory)
                ?.name.toUpperCase()}
            </h2>

            <Banners />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))
              ) : (
                <p>Không có sản phẩm nào phù hợp.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
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
            <div className="flex-grow w-full md:w-1/2 pr-2">
              <h3
                className="line-clamp-2 text-xl font-semibold mb-2"
                title={selectedProduct.description}
              >
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
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className={`px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 transition ${
                    quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={e => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      let numVal = val === '' ? '' : Math.max(1, Number(val));
                      if (
                        selectedProduct &&
                        numVal > selectedProduct.quantity
                      ) {
                        numVal = selectedProduct.quantity;
                      }
                      setQuantity(numVal);
                    }
                  }}
                  onBlur={() => {
                    if (quantity === '' || quantity === 0) {
                      setQuantity(1);
                    } else if (
                      selectedProduct &&
                      quantity > selectedProduct.quantity
                    ) {
                      setQuantity(selectedProduct.quantity);
                    }
                  }}
                  className="w-12 text-center border border-gray-400 rounded"
                />
                <button
                  onClick={() =>
                    setQuantity(
                      selectedProduct && quantity < selectedProduct.quantity
                        ? quantity + 1
                        : quantity
                    )
                  }
                  className={`px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-200 transition ${
                    selectedProduct && quantity >= selectedProduct.quantity
                      ? 'cursor-not-allowed opacity-50'
                      : ''
                  }`}
                  disabled={
                    selectedProduct && quantity >= selectedProduct.quantity
                  }
                >
                  +
                </button>
              </div>
              <div className="flex w-full">
                <div className="flex space-x-4 mr-6">
                  <button
                    className="bg-blue-500 text-white px-6 py-2 cursor-pointer rounded hover:bg-green-700 flex items-center justify-center"
                    onClick={() => {
                      if (selectedProduct) {
                        addItem(selectedProduct, quantity);
                        setSelectedProduct(null);
                      }
                    }}
                    disabled={selectedProduct?.quantity === 0}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="bg-green-600 text-white px-6 py-2 cursor-pointer rounded hover:bg-green-700 flex items-center justify-center"
                    onClick={() => {
                      if (selectedProduct) {
                        setSelectedProduct(null);
                        navigate(`/product/detail/${selectedProduct.id}`, {
                          state: { product: selectedProduct, quantity },
                        });
                      }
                    }}
                    disabled={selectedProduct?.quantity === 0}
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

export default ProductPage;

import React, { useState, useContext, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiChevronDown } from 'react-icons/hi';
import { NavLink, useNavigate } from 'react-router-dom';
import CartContext from '../../context/CartContext';

const categories = [
  { id: 1, name: 'Giấy cuộn', slug: 'giay-cuon' },
  {
    id: 2,
    name: 'Khăn giấy ướt',
    slug: 'khan-giay-uot',
    subcategories: [
      { id: 21, name: 'khăn giấy ướt 80 tờ', slug: 'khan-giay-uot-80-to' },
      { id: 22, name: 'khăn giấy ướt 20 tờ', slug: 'khan-giay-uot-20-to' },
    ],
  },
  {
    id: 3,
    name: 'Khăn giấy rút treo tường',
    slug: 'khan-giay-rut-treo-tuong',
    subcategories: [
      {
        id: 31,
        name: 'Giấy rút treo tường 4 lớp',
        slug: 'giay-rut-treo-tuong-4-lop',
      },
    ],
  },
  {
    id: 4,
    name: 'Khăn giấy rút',
    slug: 'khan-giay-rut',
    subcategories: [
      { id: 41, name: 'Khăn giấy rút lớn', slug: 'khan-giay-rut-lon' },
    ],
  },
];

const Header = () => {
  const { cartCount } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // New state for submenu visibility
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [openSubcategoryId, setOpenSubcategoryId] = useState(null);
  const timeoutRef = useRef(null);

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Handlers for submenu mouse events with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSubmenuOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSubmenuOpen(false);
      setIsClicked(false);
      setOpenSubcategoryId(null);
    }, 200);
  };

  return (
    <header className="bg-[#43bb1b] text-white font-sans sticky top-0 z-100">
      <div className="w-full max-w-[400px] md:max-w-[680px] lg:max-w-[1024px] m-auto">
        {/* Top bar */}
        <div className="flex flex-col md:flex-row lg:flex-row items-center px-5 py-3">
          {/* Logo */}
          <NavLink to={'/'}>
            <div className=" text-2xl font-bold">SUKIMOKO</div>
          </NavLink>

          {/* Search bar */}
          <div className="w-full px-5">
            <form
              className="flex w-full h-[32px] md:h-[42px] lg:h-[52px]  justify-center"
              onSubmit={handleSearchSubmit}
            >
              <div className="flex items-center bg-white p-2 rounded-l-full flex-grow">
                <FiSearch className="text-[#76809b]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="flex-grow h-[32px] md:h-[42px] lg:h-[52px] bg-white text-black px-4 py-2 text-sm outline-none"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-white text-orange-600 text-xs border-l px-5 font-semibold rounded-r-full hover:bg-gray-100 transition cursor-pointer"
              >
                Tìm kiếm
              </button>
            </form>
          </div>

          {/* User icons */}
          <div className="hidden md:flex flex  text-sm justify-center relative">
            <NavLink
              to="/cart"
              className="flex flex-col justify-center items-center cursor-pointer w-[100px] hover:opacity-50"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 mb-1"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                  <circle cx="7" cy="21" r="1" />
                  <circle cx="17" cy="21" r="1" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-5 p-3 bg-white text-orange-600 rounded-full text-sm w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Giỏ hàng</span>
            </NavLink>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="hidden md:block lg:block bg-[#43bb1b] border-t border-white">
          <ul className="flex flex-col md:flex-row lg:flex-row items-center space-x-10 px-5 py-3 text-lg">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'underline' : 'hover:underline'
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'underline' : 'hover:underline'
                }
              >
                Giới thiệu
              </NavLink>
            </li>
            <li
              className="relative inline-block text-left"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="inline-flex items-center justify-center w-full px-4 py-2 text-lg text-white bg-[#43bb1b] rounded-md hover:bg-[#3da316] transition"
                onClick={() => {
                  setIsClicked(!isClicked);
                  setIsSubmenuOpen(!isSubmenuOpen);
                }}
              >
                Sản phẩm
                <HiChevronDown
                  className={`ml-2 w-5 h-5 text-white transform transition-transform duration-300 ${
                    isSubmenuOpen || isClicked ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`absolute w-[500px] grid grid-cols-2 left-0 z-10 mt-2 origin-top-left rounded-md bg-white shadow-lg transition-all duration-200 ease-out ${
                  isSubmenuOpen
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                {categories.map(category => (
                  <div
                    key={category.id}
                    className="relative py-1 text-black w-full"
                    onMouseEnter={() => setOpenSubcategoryId(category.id)}
                    onMouseLeave={() => setOpenSubcategoryId(null)}
                  >
                    <NavLink
                      to={`/products/${category.slug}`}
                      className="block w-full w-[200px] px-4 py-2 text-sm hover:bg-gray-100 text-black flex justify-between items-center"
                    >
                      {category.name}
                      {category.subcategories && (
                        <span className="ml-2 text-xs font-bold">
                          <HiChevronDown className={`ml-2 w-5 h-5}`} />
                        </span>
                      )}
                    </NavLink>
                    {category.subcategories &&
                      openSubcategoryId === category.id && (
                        <div
                          className="absolute left-0 top-full  w-[240px] bg-white rounded-md shadow-lg z-20"
                          onMouseEnter={() => setOpenSubcategoryId(category.id)}
                          onMouseLeave={() => setOpenSubcategoryId(null)}
                        >
                          {category.subcategories.map(sub => (
                            <NavLink
                              key={sub.id}
                              to={`/products/${sub.slug}`}
                              className="block w-full px-4 py-4 text-xs hover:bg-gray-100 rounded-md text-black flex justify-between items-center"
                            >
                              {sub.name}
                              {/* Placeholder for further nested submenu arrow */}
                              {/* <span className="ml-2 text-xs font-bold">{'›'}</span> */}
                            </NavLink>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </li>

            <li>
              <NavLink
                to="/news"
                className={({ isActive }) =>
                  isActive ? 'underline' : 'hover:underline'
                }
              >
                Tin tức
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? 'underline' : 'hover:underline'
                }
              >
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

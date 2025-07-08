import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import CartContext from '../context/CartContext';
import { formatPrice } from '../utils/priceUtil';

const Cart = () => {
  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    // removeItem,
  } = useContext(CartContext);

  const navigate = useNavigate();

  // Helper function to parse price string and extract numeric value
  const parsePrice = priceStr => {
    if (typeof priceStr === 'number') return priceStr;

    if (typeof priceStr === 'string') {
      // Bỏ tất cả ký tự không phải số (ví dụ: đ, ., ,, khoảng trắng, v.v.)
      const numericStr = priceStr.replace(/\D/g, '');
      if (numericStr) {
        return parseInt(numericStr, 10); // chuyển thành số nguyên
      }
    }

    return 0; // fallback nếu không hợp lệ
  };

  /**
   * Handle payment button click.
   * This function merges current cartItems into the existing "order" array stored in localStorage.
   * If a product already exists in the order, its quantity is incremented.
   * Otherwise, new products from cartItems are added to the order.
   * After updating localStorage, it clears the "cartItems" key and navigates to the order page.
   */
  const handlePay = () => {
    if (cartItems.length === 0) {
      // Do not navigate if cart is empty
      return;
    }

    // Instead of moving cartItems to 'order' and clearing cartItems,
    // just navigate to /order to keep all products in cartItems only.
    navigate('/order');
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + parsePrice(item.price) * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <div className="max-w-5xl mx-auto p-5">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/" className="hover:underline">
            Trang chủ
          </a>{' '}
          {'>'} <span className="text-orange-600 font-semibold">Giỏ hàng</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-6">Giỏ hàng của bạn</h1>

        {/* Cart Table */}
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-left">
              <th className="p-3">Thông tin sản phẩm</th>
              <th className="p-3 w-32">Đơn giá</th>
              <th className="p-3 w-32">Số lượng</th>
              <th className="p-3 w-32">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  Giỏ hàng của bạn đang trống.
                </td>
              </tr>
            ) : (
              cartItems.map(item => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="p-3 flex items-center space-x-4">
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-20 h-20 object-cover"
                    />
                    <div>
                      <p className="whitespace-pre-line text-gray-700 text-sm">
                        {item.description || item.title}
                      </p>
                      {/* Remove delete button as per request */}
                      {/* 
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-orange-600 text-sm mt-1 hover:underline"
                      >
                        Xóa
                      </button>
                      */}
                    </div>
                  </td>
                  <td className="p-3 text-orange-600 font-semibold">
                    {formatPrice(parsePrice(item.price))}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center border border-gray-300 w-max rounded">
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.quantity}
                        className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                      />
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        className="px-3 py-1 text-lg font-bold text-gray-700 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3 text-orange-600 font-semibold">
                    {formatPrice(parsePrice(item.price) * item.quantity)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Total and Checkout */}
        <div className="flex justify-end items-center mt-6 space-x-6">
          <div className="text-lg font-semibold">
            Tổng tiền:
            <span className="text-orange-600">{formatPrice(totalPrice)}</span>
          </div>
          <button
            onClick={handlePay}
            disabled={cartItems.length === 0}
            className={`px-8 py-3 rounded cursor-pointer ${
              cartItems.length === 0
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            Thanh toán
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Cart;

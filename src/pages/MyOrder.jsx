import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [userEmail] = useState(location.state?.values.email || null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [showDetailsOrderId, setShowDetailsOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!userEmail) {
          setError('User email is required to fetch orders.');
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `${API_BASE_URL}/order/user?email=${encodeURIComponent(
            userEmail
          )}`
        );
        const data = response.data;

        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data) {
          setOrders([data]);
        } else {
          setOrders([]);
        }
      } catch {
        setError('Failed to fetch order information.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  const fetchOrderDetails = async orderId => {
    try {
      if (showDetailsOrderId === orderId) {
        // Toggle off if same order clicked again
        setShowDetailsOrderId(null);
        setOrderDetails(null);
        return;
      }
      const response = await axios.get(
        `${API_BASE_URL}/order/${orderId}`
      );
      console.log('Order details:', response.data);
      setOrderDetails(response.data);
      setShowDetailsOrderId(orderId);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      alert('Không thể lấy thông tin chi tiết đơn hàng.');
    }
  };

  if (loading) {
    return <div>Loading order information...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!orders.length) {
    return <div>No recent orders found.</div>;
  }

  return (
    <>
      <Header />

      <h2 className="text-center font-bold py-4 text-2xl">Đơn hàng của tôi</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
        {orders.map(order => {
          const {
            id,
            email,
            fullName,
            phone,
            address,
            district,
            province,
            ward,
            note,
            shippingMethod,
            paymentMethod,
            items,
            totalPrice,
          } = order;

          const shippingFee = shippingMethod === 'delivery' ? 40000 : 0;
          const subtotal = totalPrice - shippingFee;

          return (
            <div
              key={id}
              style={{
                border: '1px solid #ccc',
                padding: '16px',
                margin: '20px auto',
              }}
            >
              <div style={{ flex: 1 }}>
                <h2 style={{ color: 'green' }}>
                  Đơn hàng đã được đặt thành công!
                </h2>
                <h3>Thông tin khách hàng:</h3>
                <p>Email: {email}</p>
                <p>Họ và tên: {fullName}</p>
                <p>Số điện thoại: {phone}</p>
                <p>Địa chỉ: {address}</p>
                <p>Tỉnh/Thành phố: {province}</p>
                <p>Quận/Huyện: {district}</p>
                <p>Phường/Xã: {ward}</p>
                <p>Ghi chú: {note || 'Không có'}</p>
                <p>Phương thức vận chuyển: {shippingMethod}</p>
                <p>Phương thức thanh toán: {paymentMethod}</p>

                <button
                  onClick={() => fetchOrderDetails(id)}
                  style={{
                    margin: '10px 0',
                    padding: '8px 12px',
                    backgroundColor: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                  }}
                >
                  Xem chi tiết sản phẩm
                </button>

                {showDetailsOrderId === id && orderDetails && (
                  <div
                    style={{
                      marginTop: 10,
                      border: '1px solid #ddd',
                      padding: 10,
                    }}
                  >
                    <h4>Chi tiết đơn hàng:</h4>
                    <p>
                      <strong>Email:</strong> {orderDetails.email}
                    </p>
                    <p>
                      <strong>Họ và tên:</strong> {orderDetails.fullName}
                    </p>
                    <p>
                      <strong>Số điện thoại:</strong> {orderDetails.phone}
                    </p>
                    <p>
                      <strong>Địa chỉ:</strong> {orderDetails.address}
                    </p>
                    <p>
                      <strong>Tỉnh/Thành phố:</strong> {orderDetails.province}
                    </p>
                    <p>
                      <strong>Quận/Huyện:</strong> {orderDetails.district}
                    </p>
                    <p>
                      <strong>Phường/Xã:</strong> {orderDetails.ward}
                    </p>
                    <p>
                      <strong>Ghi chú:</strong>{' '}
                      {orderDetails.note || 'Không có'}
                    </p>
                    <p>
                      <strong>Phương thức vận chuyển:</strong>{' '}
                      {orderDetails.shippingMethod}
                    </p>
                    <p>
                      <strong>Phương thức thanh toán:</strong>{' '}
                      {orderDetails.paymentMethod}
                    </p>
                    <p>
                      <strong>Trạng thái đơn hàng:</strong>{' '}
                      {orderDetails.status}
                    </p>
                    <p>
                      <strong>Trạng thái thanh toán:</strong>{' '}
                      {orderDetails.paymentStatus}
                    </p>
                    <h5>Sản phẩm:</h5>
                    <ul>
                      {orderDetails.items && orderDetails.items.length > 0 ? (
                        orderDetails.items.map(item => (
                          <li key={item.id}>
                            <p>
                              <strong>Tên sản phẩm:</strong> {item.name}
                            </p>
                            <p>
                              <strong>Mô tả:</strong>{' '}
                              {item.description || 'Không có'}
                            </p>
                            <p>
                              <strong>Số lượng:</strong> {item.quantity}
                            </p>
                            <p>
                              <strong>Giá:</strong>{' '}
                              {item.price.toLocaleString()}đ
                            </p>
                            <p>
                              <strong>Product ID:</strong> {item.productId}
                            </p>
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ maxWidth: '150px', marginTop: '5px' }}
                              />
                            )}
                            <hr />
                          </li>
                        ))
                      ) : (
                        <li>Không có sản phẩm</li>
                      )}
                    </ul>
                  </div>
                )}

                <h3>Sản phẩm:</h3>
                <ul>
                  {items && items.length > 0 ? (
                    items.map(item => (
                      <li key={item.id}>
                        {item.name} - Số lượng: {item.quantity} - Giá:{' '}
                        {item.price.toLocaleString()}đ
                      </li>
                    ))
                  ) : (
                    <li>Không có sản phẩm</li>
                  )}
                </ul>

                <p>Tạm tính: {subtotal.toLocaleString()}đ</p>
                <p>Phí vận chuyển: {shippingFee.toLocaleString()}đ</p>
                <p>
                  <strong>Tổng cộng: {totalPrice.toLocaleString()}đ</strong>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
};

export default MyOrder;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import api from '../../api/api';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { formatPrice } from '../../utils/priceUtil';
import { NavLink, useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? '#f97316' : '#d1d5db',
    boxShadow: state.isFocused ? '0 0 0 1px #f97316' : 'none',
    '&:hover': {
      borderColor: '#f97316',
    },
    minHeight: '36px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#f97316' // orange background for selected option
      : state.isFocused
      ? '#fee2e2' // light orange background on hover/focus
      : 'white',
    color: state.isSelected ? 'white' : 'black',
    padding: 10,
    cursor: 'pointer',
  }),
  menu: provided => ({
    ...provided,
    maxHeight: '200px', // limit dropdown height
    // overflowY: 'auto',
  }),
  placeholder: provided => ({
    ...provided,
    color: '#9ca3af', // gray placeholder
  }),
  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
};

const Order = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discountCodes, setDiscountCodes] = useState([]); // new state for multiple discount codes
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [applyCouponValid, setApplyCouponValid] = useState(false);
  
  const navigate = useNavigate();

  // New state to track original total (subtotal + shipping fee) before discount
  const [originalTotal, setOriginalTotal] = useState(0);

  // Function to apply coupon by calling backend API
  const applyCoupon = async () => {
    if (!couponCode) {
      alert('Vui lòng nhập mã giảm giá');
      return;
    }

    // Add new coupon code to discountCodes array if not already present
    let newDiscountCodes = [...discountCodes];
    if (!newDiscountCodes.includes(couponCode.trim())) {
      newDiscountCodes.push(couponCode.trim());
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/discounts/apply-multiple`, // assume new endpoint for multiple codes
        {
          codes: newDiscountCodes,
          cart_total: originalTotal,
          shippingMethod: shippingMethod,
        }
      );

      console.log('Coupon response:', response.data);
      if (response.data.valid) {
        setCartTotal(response.data.new_total);
        setApplyCouponValid(true);
        setDiscountCodes(newDiscountCodes);
        // Removed calls to undefined setters
        // setDiscountAmount(response.data.discount_amount || 0);
        // setFreeShipMessage(
        //   newDiscountCodes.includes('freeship') ? 'Miễn phí vận chuyển' : ''
        // );
        alert(response.data.message);
      } else {
        setCartTotal(originalTotal);
        setApplyCouponValid(false);
        // setDiscountAmount(0);
        // setFreeShipMessage('');
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error applying coupon:', error);
      alert('Lỗi khi áp dụng mã giảm giá. Vui lòng thử lại.');
      setCartTotal(originalTotal);
      setApplyCouponValid(false);
      // setDiscountAmount(0);
      // setFreeShipMessage('');
    }
  };

  console.log(
    'Order component rendered',
    orderItems,
    totalPrice,
    originalTotal
  );

  console.log('cartTotal', cartTotal);

  // Add shippingMethod state to track changes outside Formik render
  const [shippingMethod, setShippingMethod] = useState('');

  useEffect(() => {
    const subtotal = orderItems.reduce(
      (sum, item) => sum + parsePrice(item.price) * item.quantity,
      0
    );
    const shippingFee =
      orderItems.length === 0 || !shippingMethod
        ? 0
        : shippingMethod === 'delivery'
        ? 40000
        : 0;
    const total = subtotal + shippingFee;
    setTotalPrice(total);
    setOriginalTotal(total); // update original total whenever subtotal or shipping changes
  }, [orderItems, shippingMethod]);

  // Helper function to parse price string and extract numeric value
  const parsePrice = priceStr => {
    if (typeof priceStr === 'number') return priceStr;

    if (typeof priceStr === 'string') {
      // Remove all non-digit characters (e.g., đ, ., ,, spaces, etc.)
      const numericStr = priceStr.replace(/\D/g, '');
      if (numericStr) {
        return parseInt(numericStr, 10); // convert to integer
      }
    }

    return 0; // fallback if invalid
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');

    let cartArray = [];
    try {
      if (storedCartItems) {
        cartArray = JSON.parse(storedCartItems);
      }
    } catch (error) {
      console.error('Failed to parse cartItems from localStorage', error);
    }

    setOrderItems(cartArray);
  }, []);

  // Fetch provinces on mount
  useEffect(() => {
    api.location
      .fetchProvinces()
      .then(results => {
        if (results) {
          const provinceOptions = results.map(p => ({
            label: p.province_name,
            value: p.province_id,
          }));
          setProvinces(provinceOptions);
        } else {
          setProvinces([]);
        }
      })
      .catch(error => {
        console.error('Error fetching provinces:', error);
        setProvinces([]);
      });
  }, []);

  const fetchDistricts = provinceId => {
    if (provinceId) {
      api.location
        .fetchDistricts(provinceId)
        .then(results => {
          if (results) {
            const districtOptions = results.map(d => ({
              label: d.district_name,
              value: d.district_id,
            }));
            setDistricts(districtOptions);
            setWards([]);
          } else {
            setDistricts([]);
            setWards([]);
          }
        })
        .catch(() => {
          setDistricts([]);
          setWards([]);
        });
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const fetchWards = districtId => {
    if (districtId) {
      api.location
        .fetchWards(districtId)
        .then(results => {
          if (results) {
            const wardOptions = results.map(w => ({
              label: w.ward_name,
              value: w.ward_id,
            }));
            setWards(wardOptions);
          } else {
            setWards([]);
          }
        })
        .catch(() => {
          setWards([]);
        });
    } else {
      setWards([]);
    }
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email không hợp lệ')
      .required('Email là bắt buộc'),
    fullName: Yup.string().required('Họ và tên là bắt buộc'),
    phone: Yup.string().required('phone là bắt buộc'),
    address: Yup.string().required('address là bắt buộc'),
    province: Yup.object().nullable().required('province là bắt buộc'),
    district: Yup.object().nullable().required('district là bắt buộc'),
    ward: Yup.object().nullable().required('ward là bắt buộc'),
    note: Yup.string(),
    shippingMethod: Yup.string().required('Phương thức vận chuyển là bắt buộc'),
    paymentMethod: Yup.string().required('Phương thức thanh toán là bắt buộc'),
    discountCode: Yup.string(),
    agreeTerms: Yup.boolean().oneOf(
      [true],
      'Bạn phải đồng ý với điều kiện thu thập thông tin cá nhân'
    ),
  });

  return (
    <>
      <Header />

      <div className="max-w-[1440px] mx-auto p-5 font-sans">
        <h2 className="text-orange-500 font-semibold text-xl mb-5">SUKIMOKO</h2>

        <Formik
          initialValues={{
            email: '',
            fullName: '',
            phone: '',
            address: '',
            province: null,
            district: null,
            ward: null,
            note: '',
            shippingMethod: '',
            paymentMethod: 'cod',
            discountCode: '',
            agreeTerms: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (orderItems.length === 0) {
              alert(
                'Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.'
              );
              setSubmitting(false);
              return;
            }

            try {
              // Call API to place order
              const response = await axios.post(
                `${API_BASE_URL}/api/order`,
                {
                  customerInfo: {
                    ...values,
                    discountCodes: discountCodes, // send discount codes array to backend
                  },
                  items: orderItems,
                }
              );

                if (response.status === 200 || response.status === 201) {
                  const subtotal = orderItems.reduce(
                    (sum, item) => sum + parsePrice(item.price) * item.quantity,
                    0
                  );
                  const shippingFee =
                    orderItems.length > 0 && values.shippingMethod === 'pickup'
                      ? 0
                      : 40000;
                  const totalPriceToSet = applyCouponValid
                    ? cartTotal
                    : subtotal + shippingFee;

                  setPlacedOrderDetails({
                    customerInfo: values,
                    items: orderItems,
                    subtotal: subtotal,
                    shippingFee: shippingFee,
                    totalPrice: totalPriceToSet,
                  });
                  setOrderPlaced(true);
                  localStorage.removeItem('order');
                  localStorage.setItem('cartItems', '[]');
                  window.dispatchEvent(new Event('cartUpdated'));
                  navigate('/my-orders', { state: { values } }); // Redirect to My Orders page after successful order placement
                  alert('Đặt hàng thành công.');
                  setOrderItems([]);
                } else {
                  alert('Đặt hàng thất bại. Vui lòng thử lại.');
                }
            } catch (error) {
              console.error('Error placing order:', error);
              alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            setFieldValue,
            isSubmitting,
            isValid,
            // dirty,
            touched,
            errors,
          }) => {
            // Calculate subtotal
            const subtotal = orderItems.reduce(
              (sum, item) => sum + parsePrice(item.price) * item.quantity,
              0
            );

            // Calculate shipping fee based on selected shipping method and order items
            const shippingFee =
              orderItems.length === 0 || !values.shippingMethod
                ? 0
                : values.shippingMethod === 'delivery'
                ? 40000
                : 0;
            const total = subtotal + shippingFee;

            // Handle province change
            const handleProvinceChange = selectedOption => {
              setFieldValue('province', selectedOption);
              setFieldValue('district', null);
              setFieldValue('ward', null);
              fetchDistricts(selectedOption ? selectedOption.value : null);
            };

            // Handle district change
            const handleDistrictChange = selectedOption => {
              setFieldValue('district', selectedOption);
              setFieldValue('ward', null);
              fetchWards(selectedOption ? selectedOption.value : null);
            };

            // Handle ward change
            const handleWardChange = selectedOption => {
              setFieldValue('ward', selectedOption);
            };

            // Track shippingMethod changes to update shippingMethod state
            // (Moved useEffect outside Formik render)

            return (
              <Form>
                <div className="flex gap-5">
                  {/* Left Column - Order Information */}
                  <div className="flex-[1] border-r px-5">
                    <h3 className="font-semibold text-base mb-3">
                      Thông tin đặt hàng
                    </h3>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-1 font-semibold"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="fullName"
                        className="block mb-1 font-semibold"
                      >
                        Họ và tên
                      </label>
                      <Field
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Họ và tên"
                      />
                      <ErrorMessage
                        name="fullName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block mb-1 font-semibold"
                      >
                        Số điện thoại (tùy chọn)
                      </label>
                      <div className="flex border rounded overflow-hidden">
                        <Field
                          id="phone"
                          name="phone"
                          type="text"
                          className="flex-grow px-3 py-2 border-none focus:ring-0 focus:outline-none"
                          placeholder="Số điện thoại (tùy chọn)"
                        />
                        <button
                          type="button"
                          className="flex items-center px-3 border-l border-gray-300 bg-white cursor-pointer"
                          aria-label="Select country code"
                        >
                          <img
                            src="/flags/vn.svg"
                            alt="Vietnam flag"
                            className="w-6 h-4 rounded-sm"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 ml-1 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block mb-1 font-semibold"
                      >
                        Địa chỉ
                      </label>
                      <Field
                        id="address"
                        name="address"
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Địa chỉ"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="province"
                        className="block mb-1 font-semibold"
                      >
                        Tỉnh/Thành phố
                      </label>
                      <Select
                        id="province"
                        name="province"
                        options={provinces}
                        value={values.province}
                        onChange={handleProvinceChange}
                        onBlur={() =>
                          setFieldValue('province', values.province, true)
                        }
                        styles={customSelectStyles}
                        placeholder="Chọn tỉnh/thành phố"
                      />
                      {touched.province && errors.province && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.province}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="district"
                        className="block mb-1 font-semibold"
                      >
                        Quận/Huyện
                      </label>
                      <Select
                        id="district"
                        name="district"
                        options={districts}
                        value={values.district}
                        onChange={handleDistrictChange}
                        onBlur={() =>
                          setFieldValue('district', values.district, true)
                        }
                        styles={customSelectStyles}
                        placeholder="Chọn quận/huyện"
                        isDisabled={!values.province}
                      />
                      {touched.district && errors.district && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.district}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="ward"
                        className="block mb-1 font-semibold"
                      >
                        Phường/Xã
                      </label>
                      <Select
                        id="ward"
                        name="ward"
                        options={wards}
                        value={values.ward}
                        onChange={handleWardChange}
                        onBlur={() => setFieldValue('ward', values.ward, true)}
                        styles={customSelectStyles}
                        placeholder="Chọn phường/xã"
                        isDisabled={!values.district}
                      />
                      {touched.ward && errors.ward && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.ward}
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="note"
                        className="block mb-1 font-semibold"
                      >
                        Ghi chú
                      </label>
                      <Field
                        id="note"
                        name="note"
                        as="textarea"
                        rows="3"
                        className="w-full border rounded px-3 py-2"
                      />
                      <ErrorMessage
                        name="note"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <Field
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="agreeTerms" className="text-sm">
                        *Tôi đã đọc và đồng ý với điều kiện thu thập thông tin
                        cá nhân của website này
                      </label>
                      <ErrorMessage
                        name="agreeTerms"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Middle Column - Shipping and Payment */}
                  <div className="flex-[1] border-r px-5">
                    <h3 className="font-semibold text-base mb-3">Vận chuyển</h3>
                    {!(
                      values.email &&
                      values.fullName &&
                      values.address &&
                      values.province &&
                      values.district &&
                      values.ward
                    ) ? (
                      <div className="p-3 mb-5 bg-blue-100 text-blue-700 rounded">
                        Vui lòng nhập thông tin giao hàng
                      </div>
                    ) : (
                      <>
                        <div className="border rounded p-3 mb-5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Field
                              type="radio"
                              name="shippingMethod"
                              value="delivery"
                              checked={values.shippingMethod === 'delivery'}
                              onChange={e => {
                                setFieldValue('shippingMethod', e.target.value);
                                setShippingMethod(e.target.value);
                              }}
                              className="mr-2"
                            />
                            <span>Giao hàng tận nơi</span>
                            <span className="ml-auto">40.000₫</span>
                          </label>
                        </div>
                        <div className="border rounded p-3 mb-5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Field
                              type="radio"
                              name="shippingMethod"
                              value="pickup"
                              checked={values.shippingMethod === 'pickup'}
                              onChange={e => {
                                setFieldValue('shippingMethod', e.target.value);
                                setShippingMethod(e.target.value);
                              }}
                              className="mr-2"
                            />
                            <span>Nhận tại cửa hàng</span>
                            <span className="ml-auto">0₫</span>
                          </label>
                        </div>
                      </>
                    )}
                    <h3 className="font-semibold text-base mb-3">Thanh toán</h3>
                    <div className="border rounded p-3">
                      <label className="flex items-center gap-2 cursor-pointer mb-3">
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          className="mr-2"
                        />
                        <span>Chuyển khoản</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-orange-500 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2m0 14v2m7-7h-2m-10 0H5"
                          />
                        </svg>
                      </label>
                      {values.paymentMethod === 'transfer' && (
                        <div className="border p-4 rounded bg-gray-50 flex gap-6 min-w-[300px] flex-grow mb-4">
                          <div className="flex-1 text-sm text-gray-700 space-y-4">
                            <div>
                              <p className="font-semibold">
                                Ngân hàng TMCP Công thương Việt Nam
                              </p>
                              <p>Nguyễn Thị Thanh Yên</p>
                              <p>104883437998</p>
                            </div>
                            <div>
                              <p className="font-semibold">
                                Ngân hàng TMCP Tiên Phong
                              </p>
                              <p>CONG TY TNHH THUONG MAI XNK FANI</p>
                              <p>5678 9899 899</p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 w-32 h-32 border rounded p-2 bg-white">
                            <img
                              src="/path/to/qr-code.png"
                              alt="QR Code"
                              className="w-full h-full object-contain"
                            />
                          </div>
                        </div>
                      )}
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          className="mr-2"
                        />
                        <span>Thu hộ (COD)</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-orange-500 ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8c-1.657 0-3 1.343-3 3v3h6v-3c0-1.657-1.343-3-3-3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v2m0 14v2m7-7h-2m-10 0H5"
                          />
                        </svg>
                      </label>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex-[1] pl-5">
                    {orderPlaced && placedOrderDetails ? (
                      <div className="border p-4 rounded bg-green-50">
                        <h3 className="font-semibold text-lg mb-3 text-green-700">
                          Đơn hàng đã được đặt thành công!
                        </h3>
                        <h4 className="font-semibold mb-2">
                          Thông tin khách hàng:
                        </h4>
                        <p>Email: {placedOrderDetails.customerInfo.email}</p>
                        <p>
                          Họ và tên: {placedOrderDetails.customerInfo.fullName}
                        </p>
                        <p>
                          Số điện thoại: {placedOrderDetails.customerInfo.phone}
                        </p>
                        <p>
                          Địa chỉ: {placedOrderDetails.customerInfo.address}
                        </p>
                        <p>
                          Tỉnh/Thành phố:{' '}
                          {placedOrderDetails.customerInfo.province?.label}
                        </p>
                        <p>
                          Quận/Huyện:{' '}
                          {placedOrderDetails.customerInfo.district?.label}
                        </p>
                        <p>
                          Phường/Xã:{' '}
                          {placedOrderDetails.customerInfo.ward?.label}
                        </p>
                        <p>Ghi chú: {placedOrderDetails.customerInfo.note}</p>
                        <p>
                          Phương thức vận chuyển:{' '}
                          {placedOrderDetails.customerInfo.shippingMethod}
                        </p>
                        <p>
                          Phương thức thanh toán:{' '}
                          {placedOrderDetails.customerInfo.paymentMethod}
                        </p>
                        <h4 className="font-semibold mt-4 mb-2">Sản phẩm:</h4>
                        {placedOrderDetails.items.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {placedOrderDetails.items.map(item => (
                              <li key={item.id}>
                                {item.description} - Số lượng: {item.quantity} -
                                Giá: {item.price.toLocaleString('vi-VN')}₫
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>Không có sản phẩm</p>
                        )}
                        <p className="mt-2">
                          Tạm tính:{' '}
                          {placedOrderDetails.subtotal.toLocaleString('vi-VN')}₫
                        </p>
                        <p>
                          Phí vận chuyển:{' '}
                          {placedOrderDetails.shippingFee.toLocaleString(
                            'vi-VN'
                          )}
                          ₫
                        </p>
                        <p className="font-semibold">
                          Tổng cộng:{' '}
                          {(placedOrderDetails.totalPrice ?? (placedOrderDetails.subtotal + placedOrderDetails.shippingFee)).toLocaleString('vi-VN')}
                          ₫
                        </p>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold text-base mb-3">
                          Đơn hàng ({orderItems.length} sản phẩm)
                        </h3>
                        <hr className="mb-3" />
                        {orderItems.length > 0 ? (
                          <div className="space-y-3 mb-5">
                            {orderItems.map(item => (
                              <div
                                key={item.id}
                                className="flex items-start gap-3"
                              >
                                <div className="relative">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div className="absolute -top-2 -right-2  bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                                    {item.quantity}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold line-clamp-3">
                                    {item.description || item.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {item.unit}
                                  </p>
                                </div>
                                <div className="text-sm font-semibold">
                                  {formatPrice(item.price)}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Không có sản phẩm</p>
                        )}
                        <div className="flex gap-2 mb-5">
                          <Field
                            type="text"
                            name="discountCode"
                            placeholder="Nhập mã giảm giá"
                            className={`flex-grow border rounded px-3 py-2 text-sm `}
                            value={couponCode}
                            onChange={e => {
                              setCouponCode(e.target.value);
                              setApplyCouponValid(false);
                              setCartTotal(0);
                              setTotalPrice(originalTotal); // reset totalPrice to original total on discount code change
                            }}
                          />
                          <button
                            type="button"
                            className="bg-orange-400 text-white rounded px-4 py-2 text-sm font-semibold"
                            onClick={applyCoupon}
                            // disabled={isSubmitting || !values.discountCode}
                          >
                            Áp dụng
                          </button>
                        </div>
                        <div className="text-sm mb-1 border-b border-gray-300 pb-1 flex flex-col gap-1">
                          <span className="flex justify-between">
                            <span>Tạm tính:</span>
                            <span className="font-semibold">
                              {(orderPlaced && placedOrderDetails
                                ? placedOrderDetails.subtotal
                                : total -
                                  (values.shippingMethod === 'delivery'
                                    ? 40000
                                    : 0)
                              ).toLocaleString('vi-VN')}
                              ₫
                            </span>
                          </span>
                          <span className="flex justify-between">
                            <span>Phí vận chuyển:</span>
                            <span className="font-semibold">
                              {(orderPlaced && placedOrderDetails
                                ? placedOrderDetails.shippingFee
                                : values.shippingMethod === 'delivery'
                                ? 40000
                                : 0
                              ).toLocaleString('vi-VN')}
                              ₫
                            </span>
                          </span>
                        </div>
                        <div className="text-lg font-semibold flex justify-between border-t pt-2">
                          <span>Tổng cộng</span>
                          <span className="text-orange-500">
                            {
                              // total.toLocaleString('vi-VN') || cartTotal
                              !applyCouponValid
                                ? total.toLocaleString('vi-VN')
                                : cartTotal.toLocaleString('vi-VN')
                            }
                            ₫
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-5">
                          <div>
                            <NavLink
                              to="/cart"
                              className="text-orange-500 hover:underline text-sm flex items-center gap-1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                              Quay về giỏ hàng
                            </NavLink>
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={`bg-orange-500 text-white rounded px-6 py-3 cursor-pointer text-sm font-semibold ${
                              isSubmitting || !isValid
                                ? 'opacity-50 cursor-not-allowed'
                                : ''
                            }`}
                          >
                            ĐẶT HÀNG
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <Footer />
    </>
  );
};

export default Order;

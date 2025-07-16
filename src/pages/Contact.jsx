import React, { useState } from 'react';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Spin } from 'antd';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  name: Yup.string().required('Họ và tên là bắt buộc'),
  phone: Yup.string()
    .matches(
      /^0(\d{8,10})$/,
      'Số điện thoại không hợp lệ, phải bắt đầu bằng số 0 và có 9-11 chữ số'
    )
    .required('Số điện thoại là bắt buộc'),
  message: Yup.string().required('Nội dung là bắt buộc'),
});

const Contact = () => {
  const URL = 'http://localhost:3001/api/contact';
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Lỗi khi gửi thông tin');
      }
      await response.json();
      setSubmitStatus({ success: true, message: 'Gửi thông tin thành công!' });
      resetForm();
      // Auto-hide success message after 2 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 2000);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Lỗi khi gửi thông tin',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="max-w-[1440px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="list-reset flex text-gray-600">
            <li>
              <a href="/" className="hover:text-orange-600">
                Trang chủ
              </a>
            </li>
            <li>
              <span className="mx-2 text-orange-600">›</span>
            </li>
            <li className="text-orange-600 font-semibold">Liên hệ</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side: Company info and contact form */}
          <div className="flex-1">
            <h2 className="font-bold text-lg mb-4">
              CÔNG TY TNHH TMDV SUKIMOKO
            </h2>
            <ul className="mb-8 space-y-3 text-gray-800">
              <li className="flex items-start">
                <FiMapPin className="mr-2 text-xl text-gray-700" />
                <span>
                  <strong>Địa chỉ:</strong> 68-70 Nguyễn Ngọc Phương, P19, Bình
                  Thạnh, TP. Hồ Chí Minh, Việt Nam
                </span>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2 text-xl text-gray-700" />
                <span>
                  <strong>Email:</strong> csukimoko@gmail.com
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2 text-xl text-gray-700" />
                <span>
                  <strong>Hotline:</strong> 0981.450.145
                </span>
              </li>
            </ul>

            <h3 className="font-semibold mb-3">LIÊN HỆ VỚI CHÚNG TÔI</h3>

            <Spin spinning={isSubmitting} tip="Đang gửi...">
              <Formik
                initialValues={{ name: '', email: '', phone: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          touched.name && errors.name
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          touched.email && errors.email
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Điện thoại"
                        inputMode="tel"
                        pattern="^0\d{8,10}$"
                        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          touched.phone && errors.phone
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <Field
                        as="textarea"
                        name="message"
                        placeholder="Nội dung"
                        rows="5"
                        className={`w-full border rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                          touched.message && errors.message
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Đang gửi...' : 'Gửi thông tin'}
                    </button>

                    {submitStatus && (
                      <div
                        className={`mt-4 text-base ${
                          submitStatus.success
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>
            </Spin>
          </div>

          {/* Right side: Google map */}
          <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d301.41055631235093!2d106.70881453570699!3d10.788772755119005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175291934ecf751%3A0xc8b09ad18121fd1b!2sNichietsu%20Building!5e1!3m2!1sen!2sus!4v1751943160429!5m2!1sen!2sus"
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;

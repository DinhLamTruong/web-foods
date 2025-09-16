import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const About = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Thay đổi URL API cho đúng môi trường
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    fetch(`${apiUrl}/about`)
      .then(async res => {
        if (!res.ok) throw new Error('Không lấy được nội dung');
        const data = await res.json();
        setContent(data?.content || '');
      })
      .catch(() => {
        setContent('<p>Không có nội dung giới thiệu.</p>');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto p-5">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <a href="/" className="hover:underline">
            Trang chủ
          </a>{' '}
          {'>'}{' '}
          <span className="text-orange-600 font-semibold">Giới thiệu</span>
        </nav>

        <div className="mb-8">
          {loading ? (
            <p>Đang tải nội dung...</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;

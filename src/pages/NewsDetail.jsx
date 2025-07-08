import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { MdCalendarToday } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const API_URL =
  typeof window !== 'undefined' &&
  window.process &&
  window.process.env &&
  window.process.env.REACT_APP_API_URL
    ? window.process.env.REACT_APP_API_URL
    : 'http://localhost:3001';

const NewsDetail = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const res = await fetch(`${API_URL}/api/news/${id}`);
        if (!res.ok) {
          throw new Error('News not found');
        }
        const data = await res.json();
        setNews(data);
      } catch (error) {
        console.error('Failed to fetch news detail:', error);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="p-6 min-h-screen">Loading news detail...</div>
        <Footer />
      </>
    );
  }

  if (!news) {
    return (
      <>
        <Header />
        <div className="p-6 min-h-screen text-center text-red-600">
          News not found.
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-100 p-6 min-h-screen ">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li>
                <Link to="/" className="hover:underline">
                  Trang chủ
                </Link>
              </li>
              <li>{'>'}</li>
              <li>
                <Link to="/news" className="hover:underline">
                  Tin tức
                </Link>
              </li>
              <li>{'>'}</li>
              <li className="text-orange-500 font-semibold">{news.title}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-1">{news.name}</h1>
            <h2 className="text-lg text-gray-600 mb-4">{news.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
              <span className="flex items-center space-x-1">
                <MdCalendarToday />
                <span>{news.date}</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaUser />
                <span>{news.author}</span>
              </span>
            </div>
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 object-cover rounded mb-6"
            />
            <div
              className="text-gray-700 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;

/* global process */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const API_URL =
  typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_URL
    ? process.env.REACT_APP_API_URL
    : 'http://localhost:3001';

const News = () => {
  const navigate = useNavigate();
  const [featuredNews, setFeaturedNews] = useState(null);
  const [sideNews, setSideNews] = useState([]);
  const [bottomLeftNews, setBottomLeftNews] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [tipsNews, setTipsNews] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL + '/api/news');
        const data = await res.json();

        if (data.length > 0) {
          setFeaturedNews(data[0]);
          setSideNews(data.slice(1, 6));
          setBottomLeftNews(data.slice(6, 9));
          setFeaturedList(data.slice(0, 6));
          setTipsNews(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  if (!featuredNews) {
    return (
      <>
        <Header />
        <div className="p-6 min-h-screen">Loading news...</div>
        <Footer />
      </>
    );
  }

  const handleClick = id => {
    navigate(`/news/${id}`);
  };

  return (
    <>
      <Header />

      <div className="bg-gray-100 p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-4">
            <ol className="flex space-x-2">
              <li>
                <a href="/" className="hover:underline">
                  Trang chủ
                </a>
              </li>
              <li>{'>'}</li>
              <li className="text-orange-500 font-semibold">Tin tức</li>
            </ol>
          </nav>

          {/* Top Section */}
          <div className="bg-white rounded-lg p-4 mb-6 grid grid-cols-12 gap-6">
            {/* Featured Large */}
            <div
              className="col-span-7 cursor-pointer"
              onClick={() => handleClick(featuredNews.id)}
            >
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-44 md:h-64 lg:h-64 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold mb-1">
                {featuredNews.title}
              </h2>
              <p className="text-sm text-gray-500">
                {featuredNews.date} - {featuredNews.author}
              </p>
            </div>

            {/* Side News List */}
            <div className="col-span-5 space-y-3 overflow-y-auto max-h-64">
              {sideNews.map(item => (
                <div
                  key={item.id}
                  className="flex space-x-3 cursor-pointer"
                  onClick={() => handleClick(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="col-span-8 space-y-6">
              {/* New List Style Section Added */}
              <div className="bg-white rounded-lg p-4 mb-6">
                {featuredList.map(item => (
                  <div
                    key={item.id}
                    className="flex space-x-4 border-b border-gray-200 py-4 cursor-pointer"
                    onClick={() => handleClick(item.id)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {item.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Existing bottomLeftNews Section */}
              {bottomLeftNews.map(item => (
                <div
                  key={item.id}
                  className="flex space-x-4 bg-white rounded-lg p-4 cursor-pointer"
                  onClick={() => handleClick(item.id)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="col-span-4 space-y-6">
              {/* Featured List */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold mb-4">TIN NỔI BẬT</h3>
                <ol className="space-y-3">
                  {featuredList.map((item, idx) => (
                    <li
                      key={item.id}
                      className="flex items-start space-x-3 cursor-pointer"
                      onClick={() => handleClick(item.id)}
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                        {idx + 1}
                      </div>
                      <p className="text-sm line-clamp-3">{item.title}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips Section */}
              <div className="bg-white rounded-lg p-4">
                <h3 className="font-bold mb-4">MẸO VẶT</h3>
                <div>
                  <img
                    src={tipsNews[0].image}
                    alt={tipsNews[0].title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h4
                    className="font-semibold mb-2 cursor-pointer"
                    onClick={() => handleClick(tipsNews[0].id)}
                  >
                    {tipsNews[0].title}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2">
                    {tipsNews.slice(1).map(item => (
                      <div
                        key={item.id}
                        className="text-center cursor-pointer"
                        onClick={() => handleClick(item.id)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-20 object-cover rounded mb-1"
                        />
                        <p className="text-xs">{item.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default News;

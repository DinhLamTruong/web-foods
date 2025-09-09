import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LatestNews = () => {
  const [featuredNews, setFeaturedNews] = useState(null);
  const [sideNews, setSideNews] = useState([]);
  const [tipsNews, setTipsNews] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL + '/news');
        const data = await res.json();

        if (data.length > 0) {
          setFeaturedNews(data[0]);
          setSideNews(data.slice(1, 6));
          setTipsNews(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, [API_URL]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm m-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Tin tức mới nhất</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main News */}
        <div className="col-span-4">
          {featuredNews && (
            <Link to={`/news/${featuredNews.id}`}>
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="font-bold text-base mb-2">{featuredNews.title}</h3>
              <p className="text-sm text-gray-700">
                {featuredNews.description}
              </p>
            </Link>
          )}
        </div>

        {/* News List */}
        <div className="col-span-5 space-y-4">
          {sideNews.map(news => (
            <Link
              key={news.id}
              to={`/news/${news.id}`}
              className="flex items-center space-x-4 cursor-pointer"
            >
              <img
                src={news.image}
                alt={news.title}
                className="w-20 h-16 object-cover rounded-md"
              />
              <p className="text-sm font-semibold">{news.title}</p>
            </Link>
          ))}
        </div>

        {/* Tips Sidebar */}
        <div className="col-span-3 border border-orange-500 rounded-md p-4">
          <h3 className="bg-orange-500 text-white font-bold px-4 py-2 rounded-md mb-4">
            MẸO VẶT
          </h3>
          <div className="space-y-3 overflow-y-auto max-h-[400px]">
            {tipsNews.map(tip => (
              <Link
                key={tip.id}
                to={`/news/${tip.id}`}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-16 h-14 object-cover rounded-md"
                />
                <p className="text-xs">{tip.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <Link
          to="/news"
          className="text-orange-500 font-semibold hover:underline"
        >
          Xem thêm Tin tức mới nhất &rarr;
        </Link>
      </div>
    </div>
  );
};

export default LatestNews;

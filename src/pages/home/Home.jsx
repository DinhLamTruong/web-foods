// import React from 'react';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import LatestNews from '../../components/LatestNews';
import Banner from './Banner';
import BannerVoucher from './BannerVoucher';
import BestSellingProducts from './BestSellingProducts';
import FeatureCategories from './FeaturedCategories';
import TodaySuggestion from './TodaySuggestion';

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <BannerVoucher />
      <FeatureCategories />
      <BestSellingProducts />
      <TodaySuggestion />
      <LatestNews/>
      <Footer />
    </>
  );
};

export default Home;

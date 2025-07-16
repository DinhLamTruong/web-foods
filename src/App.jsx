import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';
import PageTitle from './components/PageTitle';
import Home from './pages/home/Home';
import About from './pages/About';
import Products from './pages/Products';
import Order from './pages/order/Order';
import News from './pages/News';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import NewsDetail from './pages/NewsDetail';
import ProductDetail from './pages/ProductDetail';
import MyOrder from './pages/MyOrder';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <PageTitle title="Sukimoko" />
                <Home />
              </>
            }
          />
          <Route
            path="/products/:category"
            element={
              <>
                <PageTitle title="Sukimoko - product" />
                <Products />
              </>
            }
          />
          <Route
            path="/product/detail/:id"
            element={
              <>
                <PageTitle title="Sukimoko - product detail" />
                <ProductDetail />
              </>
            }
          />
          <Route
            path="/order"
            element={
              <>
                <PageTitle title="Sukimoko - order" />
                <Order />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <PageTitle title="Sukimoko - news" />
                <News />
              </>
            }
          />
          <Route
            path="/news/:id"
            element={
              <>
                <PageTitle title="Sukimoko - news detail" />
                <NewsDetail />
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                <PageTitle title="Sukimoko - favorites" />
                <Favorites />
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <PageTitle title="Sukimoko - cart" />
                <Cart />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <PageTitle title="Sukimoko - contact" />
                <Contact />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <PageTitle title="Sukimoko - about-us" />
                <About />
              </>
            }
          />
          <Route
            path="/search"
            element={
              <>
                <PageTitle title="Sukimoko - search" />
                <SearchResults />
              </>
            }
          />
          <Route
            path="/my-orders"
            element={
              <>
                <PageTitle title="Sukimoko - my-order" />
                <MyOrder />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

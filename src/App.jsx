import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import PageTitle from './components/PageTitle';
import Home from './pages/home/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="foods" />
              <Home />
            </>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;

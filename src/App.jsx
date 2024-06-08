import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import Categories from './pages/Categories'
import SubCategories from './pages/SubCategories'
import NotFound from './pages/NotFound'
import ProductsDisplay from './pages/ProductsDisplay'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import ProfilePage from './pages/ProfilePage'
function App() {

  useEffect(() => {
    if (window.location.pathname !== '/products/filter') {
      return () => {
        localStorage.setItem('formValues', JSON.stringify({}));
      };
    }
  }, []); // Empty dependency array means this effect runs once on mount and cleanup runs on unmount

  return (
    <>
      <NavBar />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/sub-categories" element={<SubCategories />} />
          <Route path="/products/filter" element={<ProductsDisplay />} />
          <Route path="/product/:name" element={<ProductPage />} />
          <Route path="/products/search" element={<ProductsDisplay />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/profile' element={<ProfilePage />} />

          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>

      </BrowserRouter>
      <Footer />  
    </>


  )
}

export default App

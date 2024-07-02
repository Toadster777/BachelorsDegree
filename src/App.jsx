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
import Favorites from './pages/Favorites'
import Contact from './pages/Contact'
import { ChatAssistant } from './components/chatAssistant'
import ResetPassword from './pages/ResetPassword'
import OrderHistory from './pages/OrderHistory'
import OrderPage from './pages/OrderPage'

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
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='user/order-history' element={<OrderHistory />} />
          <Route path='user/order/:orderId' element={<OrderPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </BrowserRouter>
      <ChatAssistant />
      <Footer />
    </>


  )
}

export default App

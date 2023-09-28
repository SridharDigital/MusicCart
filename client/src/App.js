import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./App.css"
import ProtectedRoute from "./utils/ProtectedRoute"

import Navbar from "./components/navbar/Navbar"
import MobileFooterNavbar from "./components/mobileFooterNavbar/MobileFooterNavbar"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Signup from "./pages/signup/Signup"
import ProductDetails from "./pages/productDetails/ProductDetails"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/checkout/Checkout"
import OrderSuccess from "./pages/orderSuccess/OrderSuccess"
import NotFound from "./pages/notFound/NotFound"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <MobileFooterNavbar />
    </BrowserRouter>
  )
}

export default App

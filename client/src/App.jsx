
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import UserLayout from "./components/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import OtpVerification from "./pages/OtpVerification";
import ResetPassword from "./pages/ResetPassword";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import fetchUserDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetauls } from "./store/counterSllice";
import Touras from "./pages/Touras";
import TourDetails from "./pages/TourDetails";
import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  const dispatch = useDispatch();
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return; // 

        const res = await fetchUserDetails(); // GET /api/users/me
        const user =
          res?.data?.userDetails ||
          res?.data?.data?.user ||
          res?.data?.data ||
          res?.data;

        if (user) dispatch(setUserDetauls(user));
      } catch (_) {

      } finally {
        setBootstrapped(true);
      }
    })();
  }, [dispatch]);

  if (!bootstrapped) return null; //  
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
          <Route path="tours" element={<Touras />} />
          <Route path="/tours/:id" element={<TourDetails />} />
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
             <Route path='verification-otp' element={<OtpVerification />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="profile" element={<Profile />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />}/>
          </Route>
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/counterSllice"; 
// import Search from "./Search";
import Logo from "../../public/logo-white.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user); 

  const [menuOpen, setMenuOpen] = useState(false);

  // const isLoggedIn = Boolean(user?._id);
  const isLoggedIn = !!user?._id
  const cartCount =
    Array.isArray(user?.Shopping_cart) ? user.Shopping_cart.length : 0;

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-slate-500">
      <div className="container mx-auto px-4">
        <div className="h-16 lg:h-24 flex items-center justify-between gap-4">
          {/* left: links + search */}
          <div className="flex items-center gap-6 min-w-0">
            <Link
              to="/"
              className="text-white/90 text-sm tracking-widest font-semibold uppercase whitespace-nowrap Login transform transition-transform duration-200 hover:-translate-y-1"
            >
              All tours
            </Link>
          </div>

          {/* center: logo */}
          <Link to="/" className="shrink-0">
            <img
              src={Logo}
              alt="Logo"
              width={130}
              className="h-20 lg:h-10 w-auto mx-auto"
            />
          </Link>

          {/* right: auth/cart */}
          <div className="flex items-center gap-3 relative">
            {/* Auth area */}
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-lg font-medium text-white/90 hover:text-white Login transform transition-transform duration-200 hover:-translate-y-1"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-5 text-sm font-semibold text-white bg-gray-700 rounded-full hover:bg-gray-600 Login transform transition-transform duration-200 hover:-translate-y-1"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-700 transition"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <FaRegUserCircle className="text-white text-2xl" />
                  )}
                  <span className="text-white/90 font-medium">
                    "Hi"{user?.name || "User"}
                  </span>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-md bg-white shadow border py-1">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
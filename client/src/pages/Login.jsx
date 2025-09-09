
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaRegEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUserDetauls } from "../store/counterSllice"; 

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validValue = Object.values(data).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validValue || loading) return;

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.login,
        data
      });

      if (response?.data?.error) {
        toast.error(response.data.message || "Login failed");
        return; 
      }

      if (response?.data?.success) {
        toast.success(response.data.message || "Logged in");

        // localStorage.setItem("accessToken", response.data.data.accessToken);
        // localStorage.setItem("refreshToken", response.data.data.refreshToken);
   const at = response.data?.data?.accessToken;
  const rt = response.data?.data?.refreshToken;

  if (at) localStorage.setItem("accessToken", at);
  if (rt) localStorage.setItem("refreshToken", rt);

        const userRes = await fetchUserDetails()
        const u = 
        userRes?.data?.userDetails ||
        userRes?.data?.data?.user ||
        userRes?.data?.data ||
        userRes?.data;
        dispatch(setUserDetauls(u))
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetauls(userDetails.data));

        setData({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl bg-white shadow-2xl ring-2 p-6 ring-black/5 overflow-hidden">
            <div className="px-6 pt-6 sm:px-8">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Welcome back to <span className="text-indigo-600">Tourism</span>
              </p>
              <p className="mt-1 text-center text-3xl sm:text-4xl font-bold text-gray-900">
                Login
              </p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-6 sm:px-8 sm:pt-8 grid gap-5">
              <div className="grid gap-1">
                <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
                />
              </div>

              <div className="grid gap-1">
                <label htmlFor="password" className="text-gray-700 font-semibold">Password</label>
                <div className="flex items-center gap-3">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="p-2 rounded-md border border-gray-200 hover:bg-gray-50"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              <Link to="/forgot-password" className="block ml-auto hover:text-orange-300">
                Forgot Password
              </Link>

              <button
                type="submit"
                disabled={!validValue || loading}
                className={`${validValue && !loading ? "bg-green-800 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="px-6 pb-6 sm:px-8">
              <p className="text-center text-gray-700">
                Don’t have an account?{" "}
                <Link to="/register" className="font-semibold text-indigo-600 underline-offset-4 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
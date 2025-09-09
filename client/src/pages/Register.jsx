
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password must be the same");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-100">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto w-full max-w-md">
          {/* Card */}
          <div className="rounded-2xl bg-white shadow-2xl ring-2 p-6 ring-black/5 isolate">
            {/* Header */}
            <div className="px-6 pt-6 sm:px-8">
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Welcome to <span className="text-indigo-600">Tourism</span>
              </p>
              <p className="mt-1 text-center text-3xl sm:text-4xl font-bold text-gray-900">
                Register
              </p>
            </div>

            {/* Form */}
            <form
              className="px-6 pb-6 pt-6 sm:px-8 sm:pt-8 grid gap-5"
              onSubmit={handleSubmit}
            >
              {/* Name */}
              <div className="grid gap-1">
                <label htmlFor="name" className="text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 
                             outline-none transition focus:border-indigo-500 
                             focus:ring-4 focus:ring-indigo-200"
                />
              </div>

              {/* Email */}
              <div className="grid gap-1">
                <label htmlFor="email" className="text-gray-700 font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 
                             outline-none transition focus:border-indigo-500 
                             focus:ring-4 focus:ring-indigo-200"
                />
              </div>

              {/* Password */}
              <div className="grid gap-1">
                <label htmlFor="password" className="text-gray-700 font-semibold">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    value={data.password}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10
                               outline-none transition focus:border-indigo-500 
                               focus:ring-4 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="grid gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-semibold"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    className="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10
                               outline-none transition focus:border-indigo-500 
                               focus:ring-4 focus:ring-indigo-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!validValue}
                className={` ${
                  validValue
                    ? "bg-green-800 hover:bg-green-700"
                    : "bg-gray-500"
                } text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
              >
                Register
              </button>
            </form>

            {/* Footer */}
            <div className="px-6 pb-6 sm:px-8">
              <p className="text-center text-gray-700">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-indigo-600 underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
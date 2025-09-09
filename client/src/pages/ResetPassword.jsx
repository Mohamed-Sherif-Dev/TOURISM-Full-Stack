/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfromPassword,setShowConfromPassword ] = useState(false);
  const valideValue = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, [location, navigate]);

  const handleChange = (e)=>{
    const {name , value} = e.target 
    setData((prev)=>{
        return{
            ...prev,
            [name]: value
        }
    })
  }

 console.log("data reset password",data)

 const handleSubmit = async (e) =>{
        e.preventDefault();

        if(data.newPassword !== data.confirmPassword){
     toast.error("New Password and confirm Password must be same.")
            return;
        }
        try {
            const response = await Axios({
                ...SummaryApi.reset_Password,
                data : data
            });

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword:"",
                    confirmPassword:""
                })
            }
        } catch (error) {
            AxiosToastError(error)
        }
 }
   console.log("reseat password page", location);


  return(
    <section className="w-full container mx-auto px-2">
        <div className="bg-white shadow-lg my-4 w-full max-w-lg mx-auto rounded p-7">
            <p className="font-semibold text-lg">Enter Your<span className="text-blue-400">Password</span></p>
            <form action="" className="grid gap-4 py-4" onSubmit={handleSubmit}>
                <div className="grid gap-1">
                    <label htmlFor="newPassword">New Password:</label>
                    <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
                        <input 
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full outline-none"
                        name="newPassword"
                        value={data.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                         />
                         <div
                         onClick={()=> setShowPassword((prev)=> !prev)}
                         className=" cursor-pointer"
                         >
                            {showPassword ? <FaRegEye/> : <FaRegEyeSlash/>}
                         </div>
                    </div>
                </div>

                    <div className="grid gap-1">
                    <label htmlFor="newPassword">Confirm Password  :</label>
                    <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-blue-500">
                        <input 
                        type={showConfromPassword ? "text" : "password"}
                        id="password"
                        className="w-full outline-none"
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                         />
                         <div
                         onClick={()=> setShowConfromPassword((prev)=> !prev)}
                         className=" cursor-pointer"
                         >
                        {showPassword ? <FaRegEye/> : <FaRegEyeSlash/>}
                         </div>
                    </div>
                </div>
            <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
            </form>
        <p>
          Already have account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
        </div>
    </section>
  )
};

export default ResetPassword;

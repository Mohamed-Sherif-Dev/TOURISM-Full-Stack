import React from 'react'
import { useEffect , useRef , useState } from 'react'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link , useLocation , useNavigate } from 'react-router-dom'
import AxiosToastError from "../utils/AxiosToastError"
const OtpVerification = () => {
    const [data , setData ] = useState(["" , "" , "" ,"" , "" , ""])

    const navigate = useNavigate();
    const inputRef = useRef([])
    const location = useLocation()
    console.log("Logictiun Page", location);
    useEffect(()=>{
        if(!location?.state?.email){
            navigate("/forgot-password")
        }
    },[navigate , location])
      const valideValue = data.every((el) => el);

      const handleSubmit = async(e)=>{
            e.preventDefault();

            try {
                const response = await Axios({
                    ...SummaryApi.forgot_password_OTP,
                    data:{
                        otp: data.join(""),
                        email: location?.state?.email
                    }
                })
                if(response.data.error){
                    toast.error(response.data.message)
                }

                if(response.data.success){
                    toast.success(response.data.message)
                    setData(["" , "" , "" , "" , "" , "" ])
                    navigate("/reset-password",{
                        state:{
                            data: response.data,
                            email: location?.state?.email
                        }
                    })
                }
            } catch (error) {
                AxiosToastError(error)
            }
      }
  return (
    <section className='w-full container mx-auto px-2'>
            <div className='bg-white shadow-lg my-4 w-full max-w-lg mx-auto rounded p-6'>
                <p className='font-semibold text-lg mb-3'>Enter <span className='font-semibold text-blue-400'>OTP</span></p>
                <form onSubmit={handleSubmit} className='grid gap-5 py-4'>
                    <div className='grid gap-1'>
                <label htmlFor="otp">Enter your OTP :</label>
                            <div className="flex items-center gap-2 justify-between mt-2">
                                    {
                                        data.map((element , index)=>{
                                            return(
                                                <input 
                                                type="text" 
                                                id='otp'
                                                ref={(ref)=>{
                                                    inputRef.current[index] = ref
                                                    return ref
                                                }}
                                                key={"otp" + index}
                                                value={data[index]}
                                                onChange={(e)=>{
                                                    const value = e.target.value
                                                    console.log(value);
                                                    const newData = [...data]
                                                    newData[index] = value
                                                    setData(newData)
                                                    if(value && index < 5){
                                                        inputRef.current[index + 1].focus()
                                                    }
                                                }}
                                                autoFocus
                                                maxLength={1}
                                                                    className="bg-blue-50 w-full max-m-16 p-2 border text-center text-green-600 rounded font-semibold outline-none focus-within:border-primary-200"
                                                    name="otp"
                                                />
                                            )
                                        })
                                    }
                            </div>
                            </div>
                                      <button
            disabled={!valideValue}
            className={` ${
              valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            }    text-white py-2 rounded font-semibold my-3 tracking-wide cursor-pointer`}
          >
            Verify OTP
          </button>
                </form>
                      <p>
          Already have account ?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-green-700 hover:text-green-600 tran"
          >
            Login
          </Link>
        </p>
            </div>
    </section>
  )
}

export default OtpVerification
import React from 'react'
import { useState } from 'react'
import {useDispatch , useSelector} from "react-redux"
import {updateAvater} from "../store/counterSllice"
import { IoClose } from 'react-icons/io5'
import { FaRegUserCircle } from 'react-icons/fa'
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from "../utils/AxiosToastError"
import Axios from "../utils/Axios"

const UserProfileAvaterEidt = ({close}) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    const handleSubmit = (e) =>{
    e.preventDefault()

    }
    const handleUploadAvatarImage = async(e)=>{
        const file = e.target.files[0]
        if(!file){
            return
        }

        const formData = new FormData()
        formData.append('avatar', file)

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data : formData
            })

            const {data: responseData} = response
            dispatch(updateAvater(responseData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        } finally{
            setLoading(false)
        }
    }
 return(
  <section
  className="fixed inset-0 z-50"
  role="dialog"
  aria-modal="true"
>
  {/* Backdrop */}
  <div
    className="absolute inset-0 bg-black/60"
    onClick={loading ? undefined : close}
  />

  {/* Modal */}
  <div
    className="absolute left-1/2 top-1/2 w-[92vw] max-w-sm -translate-x-1/2 -translate-y-1/2
               rounded-xl bg-white shadow-xl border border-neutral-200 p-4"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Close button */}
    <button
      onClick={close}
      disabled={loading}
      className="ml-auto block p-1 rounded hover:bg-neutral-100 text-neutral-700"
      aria-label="Close"
      type="button"
    >
      <IoClose size={20} />
    </button>

    {/* Avatar */}
    <div className="mt-1 mb-3 w-full flex items-center justify-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-100
                      ring-2 ring-white shadow grid place-items-center">
        {user?.avatar ? (
          <img
            src={user.avatar}           
            alt={user?.name || "avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaRegUserCircle size={65} className="text-neutral-400" />
        )}
      </div>
    </div>

    {/* Upload form */}
    <form onSubmit={handleSubmit} className="grid place-items-center">
      <label htmlFor="uploadProfile" className="cursor-pointer">
        <div
          className={`px-4 py-1 rounded text-sm border
                     ${loading
                       ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                       : "bg-neutral-900 text-white hover:bg-neutral-800 border-neutral-900"
                     }`}
        >
          {loading ? "Loading..." : "Upload"}
        </div>
        <input
          id="uploadProfile"
          type="file"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"  
          onChange={handleUploadAvatarImage}
          disabled={loading}
        />
      </label>
    </form>
  </div>
</section>
 )
}

export default UserProfileAvaterEidt
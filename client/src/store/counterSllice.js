/* eslint-disable no-unused-vars */
import {createSlice} from "@reduxjs/toolkit"
import { jsxs } from "react/jsx-runtime"

const initaValue = {
    _id : "",
    name: "",
    email: "",
    avatar: "",
    mobile: "",
    verify_email: "",
    last_login_data: "",
    status:"",
    address_datails:"",
    Shopping_cart: "",
    orderHistory: "",
    role: ""
}

const presisted = localStorage.getItem("auth_user")
const initialState = presisted ? JSON.parse(presisted) : initaValue

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        setUserDetauls: (state , action) =>{
            state.name = action.payload?.name
            state.email = action.payload?.email
            state._id = action.payload?._id
            state.avatar = action.payload?.avatar
            state.mobile = action.payload?.mobile
            state.verify_email=action.payload?.verify_email
            state.last_login_data=action.payload?.last_login_data
            state.status=action.payload?.status
            state.address_datails=action.payload?.address_datails
            state.Shopping_cart=action.payload?.Shopping_cart
            state.orderHistory=action.payload?.orderHistory
            state.role=action.payload?.role
            localStorage.setItem("auth_user" , JSON.stringify(state))
        },
        updateAvater : (state , action) =>{
            state.avatar=action.payload
            localStorage.setItem("auth_user" , JSON.stringify(state))
        },
        logout : (state )=>{
            state._id= ""
            state.name=""
            state.email=""
            state.avatar=""
            state.mobile=""
            state.verify_email=""
            state.last_login_data=""
            state.status=""
            state.address_datails=[]
            state.Shopping_cart=[]
            state.orderHistory=[]
            state.role= ""
            Object.assign(state , initaValue)
            localStorage.removeItem("auth_user")
        }
    }
})


export const {setUserDetauls , logout , updateAvater } = userSlice.actions
export default userSlice.reducer
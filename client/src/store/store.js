import {configureStore} from "@reduxjs/toolkit"
import  userReducer from "./counterSllice"

export const store = configureStore({
    reducer:{
        user : userReducer
    }
})
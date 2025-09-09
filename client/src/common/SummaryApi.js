export const baseURL = import.meta.env.VITE_API_URL


const SummaryApi = {
    register:{
        url : "/api/users/register",
        method : "post"
    },
    login:{
        url: "/api/users/login",
        method : "post"
    },
    userDetails:{
        url: "/api/users/user-details",
        method: "get"
    },
    forgot_password:{
        url: "/api/users/forgot-password",
        method:"put"
    },
    forgot_password_OTP:{
        url: "/api/users/verify-forgot-password-otp",
        method:"put"
    },
    reset_Password:{
        url:"/api/users/reset-password",
        method:"put"
    },
   refreshToken :{
        url: "/api/users/refresh-token",
        method:"get"
    },
   logout :{
        url:"/api/users/logout",
        method:"get"
    },
      uploadAvatar: {
    url: "/api/users/upload-avatar",
    method: "put"
  },
   updateUserDetails :{
        url:"/api/users/update-user",
        method:"put"
    },
// ===== TOURS (Public + Admin) =====
getTours: {                      
  url: "/api/tours",
  method: "get",
},
getTourById: (id) => ({          
  url: `/api/tours/${id}`,
  method: "get",
}),
createTour: {                    
  url: "/api/tours",
  method: "post",
},
updateTour: (id) => ({           
  url: `/api/tours/${id}`,
  method: "put",
}),
deleteTour: (id) => ({         
  url: `/api/tours/${id}`,
  method: "delete",
}),

// ===== REVIEWS (Nested + Single) =====
getReviewsForTour: (tourId) => ({ 
  url: `/api/tours/${tourId}/reviews`,
  method: "get",
}),
createReview: (tourId) => ({       
  url: `/api/tours/${tourId}/reviews`,
  method: "post",
}),
updateReview: (reviewId) => ({     
  url: `/api/reviews/${reviewId}`,
  method: "put",
}),
deleteReview: (reviewId) => ({     
  url: `/api/reviews/${reviewId}`,
  method: "delete",
}),
}


export default SummaryApi;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require("./config/db");
const userRouter = require("./routes/user.route");
const addressRouter = require("./routes/addres.route");
const uploadRouter = require('./routes/upload.route');
const routertour = require("./routes/tour.routes");
const reviewRoutes = require("./routes/review.routes");
const cartRoutes = require("./routes/cart.routes")
const orderRoutes = require("./routes/order.routes")
dotenv.config();
const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}
    
));
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy : false
}));





const PORT = process.env.PORT || 3000;
//connect to database
connectDB();
app.get("/", (req , res)=>{
    res.send("WELCOME Connected to MongoDB SUCCESSFULLY ✅")
})

//routes
app.use("/api/users" , userRouter)
app.use("/api/file" , uploadRouter)
app.use("/api/address" ,addressRouter )
app.use("/api/tours", routertour);
app.use("/api/tours/:tourId/reviews", reviewRoutes); // nested
app.use("/api/cart" , cartRoutes)
app.use("/api/orders" , orderRoutes)



const path = require("path");
app.use("/img/tours", express.static(
  path.resolve(__dirname, process.env.STATIC_TOUR_DIR || "public/img/tours") 
));

app.use(
    "/img/users",
    express.static(
        path.resolve(__dirname, process.env.STATIC_TOUR_DIR || "public/img/users") 
    )
)



app.listen(PORT,()=>{
    console.log(`Server is running on port 🚀  ${PORT}`);
})
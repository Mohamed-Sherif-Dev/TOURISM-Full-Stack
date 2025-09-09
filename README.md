# 🌍 Tourism MERN Project

The **Tourism MERN Project** is a full-stack web application designed for **tour booking and management**.  
It provides a seamless experience for travelers to explore tours, check availability, read reviews, add bookings to cart, and proceed with reservations.  
The project is built with the **MERN stack** (MongoDB, Express.js, React, Node.js), ensuring a scalable, modern, and high-performance solution.

The app is divided into two main sections:
1. **Frontend (React)** → A fast, responsive, and user-friendly interface.
2. **Backend (Express & MongoDB)** → Secure and efficient APIs with authentication, authorization, and database connectivity.

---

## ✨ Key Features

### 🔑 User Authentication & Security
- Register new accounts with email verification.
- Login & logout with secure JWT-based authentication.
- Refresh tokens for seamless user sessions.
- Forgot password & OTP email verification.
- Role-based access control (Admin vs Regular User).

### 🧳 Tours & Booking System
- Browse tours with **details (price, duration, difficulty, ratings)**.
- Filter tours by **price range, month, rating, and difficulty**.
- Add tours to **cart** before confirming bookings.
- View booking history and payment details.

### ⭐ Review System
- Users can leave reviews on tours.
- Star rating system (1–5 stars).
- Filter reviews (e.g., show only ⭐ 2 or ⭐ 3).
- Upload images with reviews.

### 🛠️ Admin Dashboard
- Add, update, or delete tours.
- Manage users (assign admin roles, deactivate accounts).
- Manage reviews & orders.
- View system logs.

### 📱 Responsive UI
- Fully responsive design for **desktop, tablet, and mobile**.
- Optimized performance with React + Vite.
- Elegant UI powered by TailwindCSS.

---

## 🏗️ Tech Stack

### Frontend
- ⚛️ React (with Vite for fast builds)
- TailwindCSS for modern styling
- Redux Toolkit for state management
- Axios (with interceptors for token handling)
- React Router for navigation

### Backend
- 🟢 Node.js + Express.js
- MongoDB + Mongoose for data modeling
- JWT for authentication
- Middleware:
  - `cors` (cross-origin requests)
  - `helmet` (security headers)
  - `morgan` (HTTP request logging)
  - `cookie-parser`
- Multer for file/image uploads

### Deployment
- ⚡ Vercel (both client and server)
- Environment variables configured via `.env`

---

## 📂 Project Structure

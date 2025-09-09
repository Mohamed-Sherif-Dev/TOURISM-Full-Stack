
// server/seeder.js
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/user.model");
const Tour = require("./models/Tour.model");
const Review = require("./models/Review.model");

// 1) اتصال DB
const MONGO = process.env.MONGO_URL;
mongoose.connect(MONGO)
  .then(() => console.log("✅ DB connected"))
  .catch(err => { console.error("❌ DB error:", err.message); process.exit(1); });

const base = path.join(__dirname, "data");
const usersRaw = JSON.parse(fs.readFileSync(path.join(base, "users.json"), "utf-8"));
const toursRaw = JSON.parse(fs.readFileSync(path.join(base, "tours.json"), "utf-8")); // ← المهم
const reviewsRaw = JSON.parse(fs.readFileSync(path.join(base, "reviews.json"), "utf-8"));

const users = usersRaw.map(u => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  password: u.password,               // 
  photo: u.photo || "",
  role: u.role || "user",
  active: u.active !== false,
}));

const tours = toursRaw.map(t => ({
  _id: t._id,
  name: t.name,
  duration: t.duration,
  maxGroupSize: t.maxGroupSize,
  difficulty: t.difficulty,
  ratingsAverage: t.ratingsAverage,
  ratingsQuantity: t.ratingsQuantity,
  price: t.price,
  summary: t.summary,
  description: t.description,
  imageCover: t.imageCover,
  images: t.images || [],
  startDates: (t.startDates || []).map(d => new Date(d)),

  startLocation: t.startLocation ? {
    type: t.startLocation.type || "Point",
    coordinates: t.startLocation.coordinates,
    address: t.startLocation.address,
    description: t.startLocation.description,
  } : undefined,

  locations: (t.locations || []).map(l => ({
    type: l.type || "Point",
    coordinates: l.coordinates,
    description: l.description,
    day: l.day,
    _id: l._id,
  })),

  guides: t.guides || [], // 
}));

const reviews = reviewsRaw.map(r => ({
  _id: r._id,
  review: r.review,
  rating: r.rating,
  createdAt: r.createdAt ? new Date(r.createdAt) : new Date(),
  tour: r.tour, 
  user: r.user,  // 
}));

async function importData() {
  try {
    await Promise.all([User.deleteMany(), Tour.deleteMany(), Review.deleteMany()]);

    await User.insertMany(users, { ordered: false });
    await Tour.insertMany(tours, { ordered: false });
    await Review.insertMany(reviews, { ordered: false });

    console.log("🚀 Data imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Import error:", err);
    process.exit(1);
  }
}

async function deleteData() {
  try {
    await Promise.all([User.deleteMany(), Tour.deleteMany(), Review.deleteMany()]);
    console.log("🗑️ Data deleted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Delete error:", err);
    process.exit(1);
  }
}

if (process.argv.includes("--import")) importData();
else if (process.argv.includes("--delete")) deleteData();
else {
  console.log("Usage: node seeder.js --import  OR  node seeder.js --delete");
  process.exit(0);
}
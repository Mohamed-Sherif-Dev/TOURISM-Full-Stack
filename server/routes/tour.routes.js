const { Router } = require("express");

const auth = require("../middleware/auth");      //  
const  Admin  = require("../middleware/Admin");             //  

const {
 getTours, getTour, createTour, updateTour, deleteTour
} = require("../controllers/tour.controller");
const routertour = Router();
// Public
routertour.get("/", getTours);
routertour.get("/:id", getTour);

// Admin-only
routertour.post("/", auth, Admin, createTour);
routertour.put("/:id", auth, Admin, updateTour);
routertour.delete("/:id", auth, Admin, deleteTour);

module.exports = routertour;


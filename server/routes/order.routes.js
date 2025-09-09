const router = require("express").Router();
const auth = require("../middleware/auth");
const { checkout, getMyOrders } = require("../controllers/order.controller");

router.use(auth); // كله محمي

router.post("/checkout", checkout);
router.get("/my", getMyOrders);

module.exports = router;
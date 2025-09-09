const { Router } = require("express");
const auth = require("../middleware/auth");
const {
  addAddressController,
  getAddressController,
  updateAddressController,
  deleteAddressController,
} = require("../controllers/address.controller");

const addressRouter = Router();

addressRouter.post("/create", auth, addAddressController);
addressRouter.get("/get", auth, getAddressController);
addressRouter.put("/update", auth, updateAddressController);
addressRouter.delete("/delete", auth, deleteAddressController);

module.exports = addressRouter;

const express = require("express");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const {
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
  getFoodItems,
} = require("../controllers/foodItemController");

router.post("/create", authenticate, createFoodItem);
router.put("/update/:id", authenticate, updateFoodItem);
router.delete("/delete/:id", authenticate, deleteFoodItem);
router.get("/list", authenticate, getFoodItems);

module.exports = router;

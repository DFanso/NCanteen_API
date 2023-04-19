const express = require("express");
const router = express.Router();

const {
  getOrderHistoryByUserId,
  getOrderByOrderId,
  getOrderHistoryByCanteenId,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authenticate");

router.get("/", authMiddleware, getOrderHistoryByUserId);
router.get("/:orderId", getOrderByOrderId);
router.get("/canteen/id", authMiddleware, getOrderHistoryByCanteenId);

module.exports = router;

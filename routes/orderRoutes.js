const express = require("express");
const router = express.Router();

const {
  getOrderHistoryByUserId,
  getOrderByOrderId,
  getOrderHistoryByCanteenId,
  fetchOrderByOrderId,
} = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authenticate");

router.get("/", authMiddleware, getOrderHistoryByUserId);
router.get("/:orderId", getOrderByOrderId);
router.get("/fetch/:orderId", fetchOrderByOrderId);
router.get("/canteen/id", authMiddleware, getOrderHistoryByCanteenId);

module.exports = router;

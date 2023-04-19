const express = require("express");
const router = express.Router();
const {
  createCheckout,
  cancelOrder,
  updateOrder,
} = require("../controllers/checkoutController");
const authenticate = require("../middlewares/authenticate");

const logRouteHit = (req, res, next) => {
  console.log("Route hit: " + req.method + " " + req.originalUrl);
  next();
};

router.post("/", logRouteHit, authenticate, createCheckout);
router.put("/cancel/:orderId", authenticate, cancelOrder);
router.put("/update/:orderId", authenticate, updateOrder);

module.exports = router;

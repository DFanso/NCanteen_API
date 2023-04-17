const express = require("express");
const router = express.Router();
const { createCheckout } = require("../controllers/checkoutController");
const authenticate = require("../middlewares/authenticate");

const logRouteHit = (req, res, next) => {
  console.log("Route hit: " + req.method + " " + req.originalUrl);
  next();
};

router.post("/", logRouteHit, authenticate, createCheckout);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerClient,
  clientLogin,
} = require("../controllers/clientController");

router.post("/register", registerClient);
router.post("/login", clientLogin);

module.exports = router;

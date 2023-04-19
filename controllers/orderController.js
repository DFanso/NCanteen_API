const Checkout = require("../models/checkoutModel");
const path = require("path");
const ejs = require("ejs");

const getOrderHistoryByUserId = async (req, res) => {
  try {
    const userId = req.userId;

    const orderHistory = await Checkout.find({ userId: userId }).populate(
      "items"
    );

    res
      .status(200)
      .json({ message: "Order history fetched successfully", orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order history" });
  }
};

const getOrderByOrderId = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Checkout.findById(orderId).populate("items");

    ejs.renderFile(
      path.join(__dirname, "../views/order.ejs"),
      { order },
      (err, html) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Error rendering order template" });
        } else {
          res.status(200).send(html);
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

const getOrderHistoryByCanteenId = async (req, res) => {
  try {
    const canteenId = req.canteenId;
    console.log(canteenId);

    const orderHistory = await Checkout.find({ canteenId: canteenId }).populate(
      "items"
    );

    res
      .status(200)
      .json({ message: "Order history fetched successfully", orderHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order history" });
  }
};

module.exports = {
  getOrderHistoryByUserId,
  getOrderByOrderId,
  getOrderHistoryByCanteenId,
};

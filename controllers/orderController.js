const Checkout = require("../models/checkoutModel");

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

    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order" });
  }
};

const getOrderHistoryByCanteenId = async (req, res) => {
  try {
    const canteenId = req.params.canteenId;

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

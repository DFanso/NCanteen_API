const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodItem",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const CheckoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "client",
    required: true,
  },
  items: [ItemSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  canteenId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "canteen",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Delivered", "Canceled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Checkout", CheckoutSchema);

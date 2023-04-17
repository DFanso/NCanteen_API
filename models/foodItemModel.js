const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  canteen: {
    type: Schema.Types.ObjectId,
    ref: "Canteen",
  },
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);

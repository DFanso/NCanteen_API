const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  mealType: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
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
  },
});

module.exports = mongoose.model("FoodItem", FoodItemSchema);

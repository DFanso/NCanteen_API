const FoodItem = require("../models/foodItemModel");
const Canteen = require("../models/canteenModel");

exports.createFoodItem = async (req, res) => {
  const { name, quantity, mealType, imageUrl, price } = req.body;
  const canteenId = req.canteenId;

  const canteen = await Canteen.findById(canteenId);
  if (!canteen) {
    return res.status(400).json({ message: "Canteen not found" });
  }

  const foodItem = new FoodItem({
    name,
    quantity,
    mealType,
    canteen: canteenId,
    imageUrl,
    price,
  });
  await foodItem.save();

  res.status(201).json({ message: "Food item created successfully", foodItem });
};

exports.updateFoodItem = async (req, res) => {
  const { id } = req.params;

  try {
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }

    const { name, quantity, mealType, price, imageUrl } = req.body;

    if (name !== "") foodItem.name = name;
    if (quantity !== "") foodItem.quantity = quantity;
    if (mealType !== "") foodItem.mealType = mealType;
    if (price !== "") foodItem.price = price;
    if (imageUrl !== "") foodItem.imageUrl = imageUrl;

    await foodItem.save();

    res
      .status(200)
      .json({ message: "Food item updated successfully", foodItem });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the food item",
      error,
    });
  }
};

exports.deleteFoodItem = async (req, res) => {
  const { id } = req.params;

  const foodItem = await FoodItem.findByIdAndDelete(id);

  if (!foodItem) {
    return res.status(404).json({ message: "Food item not found" });
  }

  res.status(200).json({ message: "Food item deleted successfully" });
};

exports.getFoodItems = async (req, res) => {
  const { canteenId, mealType } = req.query;

  let query = {};

  if (canteenId) {
    query.canteen = canteenId;
  }

  if (mealType) {
    query.mealType = mealType;
  }

  const foodItems = await FoodItem.find(query).populate("canteen");

  res.status(200).json({ foodItems });
};

exports.getFoodItemsByCanteenId = async (req, res) => {
  const canteenId = req.canteenId;
  console.log(canteenId);

  const canteen = await Canteen.findById(canteenId);
  if (!canteen) {
    return res.status(400).json({ message: "Canteen not found" });
  }

  const foodItems = await FoodItem.find({ canteen: canteenId }).populate(
    "canteen"
  );

  res.status(200).json({ foodItems });
};

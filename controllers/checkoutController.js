const Checkout = require("../models/checkoutModel");
const CheckoutItem = require("../models/checkoutItemModel");
const FoodItem = require("../models/foodItemModel"); // Change this line

const createCheckout = async (req, res) => {
  console.log(req.body);
  try {
    const { items } = req.body;
    const canteenId = req.body.canteenId;
    const userId = req.userId;
    const price = req.body.amount;

    const checkoutItems = await CheckoutItem.insertMany(
      items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        name: item.name,
      }))
    );

    const checkout = new Checkout({
      userId,
      items: checkoutItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        name: item.name,
      })),
      canteenId,
      price,
    });

    await checkout.save();

    // Update item quantities
    for (const item of items) {
      await FoodItem.findByIdAndUpdate(item.id, {
        // Change this line
        $inc: { quantity: -item.quantity },
      });
    }

    res
      .status(201)
      .json({ message: "Checkout created successfully", checkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating checkout" });
  }
};

module.exports = {
  createCheckout,
};

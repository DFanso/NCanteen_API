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
        foodItemId: item.id,
        id: item.id,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
        name: item.name,
        price,
      }))
    );

    const checkout = new Checkout({
      userId,
      items: checkoutItems.map((item) => ({
        foodItemId: item.foodItemId,
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

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    // Find the order by ID and update its status to "Canceled"
    const order = await Checkout.findByIdAndUpdate(
      orderId,
      { status: "Canceled" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the food item quantities by adding back the canceled quantities
    for (const item of order.items) {
      await FoodItem.findByIdAndUpdate(item.id, {
        $inc: { quantity: item.quantity },
      });
    }

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error canceling order" });
  }
};

module.exports = {
  createCheckout,
  cancelOrder,
};

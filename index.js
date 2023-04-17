const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const canteenRoutes = require("./routes/canteenRoutes");
const clientRoutes = require("./routes/clientRoutes");
const foodItemRoutes = require("./routes/foodItemRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/checkouts", checkoutRoutes);
app.use("/api/canteen", canteenRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/food-items", foodItemRoutes);
app.use("/api/order-history", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

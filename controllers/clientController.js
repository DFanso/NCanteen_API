const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("../models/clientModel");

exports.registerClient = async (req, res) => {
  const { fullName, email, studentId, mobileNumber, password } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (client) {
      return res.status(400).json({ message: "Client already exists" });
    }

    client = new Client({
      fullName,
      email,
      studentId,
      mobileNumber,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(password, salt);

    await client.save();

    const payload = {
      id: client.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.clientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let client = await Client.findOne({ email });

    if (!client) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, client.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const payload = {
      id: client.id,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

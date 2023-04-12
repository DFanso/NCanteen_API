const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Client = require('../models/clientModel');


exports.clientRegister = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingClient = await Client.findOne({ username });
  if (existingClient) {
    return res.status(400).json({ message: 'Client already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new client
  const client = new Client({ username, password: hashedPassword });
  await client.save();

  res.status(201).json({ message: 'Client registered successfully' });
};

exports.clientLogin = async (req, res) => {
  const { username, password } = req.body;

  // Find the client
  const client = await Client.findOne({ username });
  if (!client) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, client.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Canteen = require('../models/canteenModel');


exports.canteenRegister = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingCanteen = await Canteen.findOne({ username });
  if (existingCanteen) {
    return res.status(400).json({ message: 'Canteen already exists' });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new canteen
  const canteen = new Canteen({ username, password: hashedPassword });
  await canteen.save();

  res.status(201).json({ message: 'Canteen registered successfully' });
};

exports.canteenLogin = async (req, res) => {
  const { username, password } = req.body;

  // Find the canteen
  const canteen = await Canteen.findOne({ username });
  if (!canteen) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, canteen.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: canteen._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token });
};


const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.log("hi");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid token format, authorization denied" });
  }

  const token = tokenParts[1];
  console.log(token);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.canteenId = decoded.id;
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

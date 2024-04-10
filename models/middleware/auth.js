const jwt = require("jsonwebtoken");

// Middleware function to generate JWT for admins
const generateAdminToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

// Middleware function to verify JWT for admins
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.token;
  console.log(token);
  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("decoded : ", decoded);
    // Check if the decoded token contains adminId
    if (!decoded) {
      return res.status(403).json({ message: "Access denied. Not an admin" });
    }

    // If token is valid and contains adminId, attach it to the request object
    // req.adminId = decoded.adminId;
    next();
  });
};

module.exports = { generateAdminToken, verifyAdminToken };

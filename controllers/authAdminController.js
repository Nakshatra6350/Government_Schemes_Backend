const { generateAdminToken } = require("../middleware/auth.js");
const admin = require("../models/admin.js");
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isAlreadyUser = await admin.findOne({ username: username });
    if (isAlreadyUser) {
      return res.status(401).json({
        message:
          "User already exists with this username, please use a different one",
      });
    }
    const isUserEmail = await admin.findOne({ email: email });
    if (isUserEmail) {
      return res.status(401).json({
        message:
          "User already exists with this email, please use a different one",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new admin({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User created successfully", body: newUser });
  } catch (error) {
    console.group("Error in admin signup controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await admin.findOne({ username: username });
    if (!isUser) {
      return res
        .status(404)
        .json({ message: "User not found with this username" });
    }
    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = {
      username: isUser.username,
      password: isUser.password,
    };
    const token = generateAdminToken(payload);
    res.setHeader("token", token);
    console.log("Admin Token", token);

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    console.log("Error in admin login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in admin logout", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { signup, login, logout };

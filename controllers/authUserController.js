const user = require("../models/user.js");
const bcrypt = require("bcryptjs");
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isAlreadyUser = await user.findOne({ username: username });
    if (isAlreadyUser) {
      return res.status(401).json({
        message:
          "User already exists with this username, please use a different one",
      });
    }
    const isUserEmail = await user.findOne({ email: email });
    if (isUserEmail) {
      return res.status(401).json({
        message:
          "User already exists with this email, please use a different one",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ message: "User created successfully", body: newUser });
  } catch (error) {
    console.group("Error in user signup controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUser = await user.findOne({ username: username });
    if (!isUser) {
      return res
        .status(404)
        .json({ message: "User not found with this username" });
    }
    const validPassword = await bcrypt.compare(password, isUser.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Login successful", body: isUser });
  } catch (error) {
    console.log("Error in user login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Error in user logout", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = { signup, login, logout };

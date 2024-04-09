const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
});

module.exports = mongoose.model("Admin", adminSchema);

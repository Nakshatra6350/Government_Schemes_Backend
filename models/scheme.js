const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  date: {
    type: Date,
    default: Date.now,
  },
  imageURL: { type: String, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("Scheme", schemeSchema);

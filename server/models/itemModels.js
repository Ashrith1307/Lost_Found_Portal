const mongoose = require("mongoose");

// Schema (structure of an item)
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  status: { type: String, enum: ["lost", "found"], required: true },
  reportedBy: String,
  date: { type: Date, default: Date.now },
});

// Model (to interact with MongoDB)
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

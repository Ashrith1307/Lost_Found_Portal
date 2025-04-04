// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: false,  // Disable automatic timestamps
  versionKey: false   // Disable __v field
});

module.exports = mongoose.model('Item', itemSchema);
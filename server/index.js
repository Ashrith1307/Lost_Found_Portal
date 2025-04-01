const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/lostfound", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const express = require("express");
const app = express();
app.use(express.json()); // Middleware to parse JSON request body
  
const Item = require("./models/itemModels"); // Import Model

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items from MongoDB
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const { name, description, status, reportedBy } = req.body;
    const newItem = new Item({ name, description, status, reportedBy });
    await newItem.save(); // Save to MongoDB
    res.json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Invalid data" });
  }
});

app.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true } // Returns updated item
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: "Invalid update" });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    res.json({ message: "Item deleted successfully", deletedItem });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

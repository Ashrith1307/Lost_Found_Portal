require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON request body
app.use(
  cors({
    origin: "https://wonderful-axolotl-49e1ac.netlify.app", // Allow only your frontend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type",
  })
);
const Item = require("./models/itemModels"); // Import Model

app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find({}); // Fetch all items from MongoDB
    res.status(201).json(items);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/items", async (req, res) => {
  try {
    // Destructure ONLY the allowed fields
    const { name, description, status, reportedBy } = req.body;

    // Create document with ONLY the allowed fields
    const newItem = await Item.create({
      name,
      description,
      status,
      reportedBy,
    });

    // Create response using ONLY the input fields
    const response = {
      status: newItem.status,
      name: newItem.name,
      description: newItem.description,
      reportedBy: newItem.reportedBy,
    };

    res.json(response);
  } catch (err) {
    console.error("Error saving item:", err);
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

    console.log("Successfully updated");
    res.status(201).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: "Invalid update" });
  }
});

app.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    res.status(201).json({ message: "Item deleted successfully", deletedItem });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log("Server running successfully"));

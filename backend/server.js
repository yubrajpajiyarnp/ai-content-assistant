const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./database/db");

const aiRoutes = require("./routes/ai");
const contentRoutes = require("./routes/content");
const uploadRoutes = require("./routes/upload");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Content Assistant API Running",
  });
});

// Test Route
app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "POST route works",
  });
});

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/upload", uploadRoutes);

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
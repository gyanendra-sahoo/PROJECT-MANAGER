require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db.js");
const path = require("path");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");

const app = express();
const corsOptions = {
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET,HEAD,PUT,PATCH,POST,DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions()));

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/task", taskRoutes);
// app.use("/api/reports", reportRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import formRoutes from "./routes/formRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Form Submit API 🚀",
    version: "1.0.0",
    endpoints: {
      "GET /": "Health check",
      "GET /api/forms": "Get all forms",
      "POST /api/forms": "Submit new form",
    },
  });
});

// Routes
app.use("/api/forms", formRoutes);

// Connect to MongoDB & Start server
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI as string;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

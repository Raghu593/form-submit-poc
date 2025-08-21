// src/index.ts
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import formRoutes from "./routes/formRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/forms", formRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Server is running!");
});

// Use Railway-provided PORT and listen on all network interfaces (0.0.0.0)
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
});

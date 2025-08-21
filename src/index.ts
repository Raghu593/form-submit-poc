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
  res.json({
    success: true,
    message: "Form Submit API is running!",
    version: "1.0.0",
    endpoints: {
      "GET /": "Health check",
      "GET /api/forms": "Get all forms",
      "POST /api/forms": "Submit new form",
      "GET /api/forms/:id": "Get form by ID",
      "PUT /api/forms/:id": "Update form",
      "DELETE /api/forms/:id": "Delete form",
    },
  });
});

// Handle 404 for unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// Use Railway-provided PORT and listen on all network interfaces (0.0.0.0)
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
});

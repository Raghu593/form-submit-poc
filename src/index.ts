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

// DB + Server
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

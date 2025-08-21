import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import formRoutes from "./routes/formRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/forms", formRoutes);

// Use Railway-provided PORT and listen on all network interfaces (0.0.0.0)
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

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

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

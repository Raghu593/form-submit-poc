import { Router } from "express";
import { submitForm } from "../controllers/formController";

const router = Router();

// Test route (GET)
router.get("/", (req, res) => {
  res.send("Form API is running 🚀");
});

// Submit form (POST)
router.post("/", submitForm);

export default router;

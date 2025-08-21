import { Router } from "express";
import {
  submitForm,
  getForms,
  getFormById,
  updateForm,
  deleteForm,
} from "../controllers/formController";

const router = Router();

// Handle all HTTP methods for the root route
router.all("/", (req, res, next) => {
  switch (req.method) {
    case "GET":
      getForms(req, res);
      break;
    case "POST":
      submitForm(req, res);
      break;
    default:
      res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`,
      });
  }
});

// Handle all HTTP methods for specific form ID
router.all("/:id", (req, res, next) => {
  switch (req.method) {
    case "GET":
      getFormById(req, res);
      break;
    case "PUT":
      updateForm(req, res);
      break;
    case "DELETE":
      deleteForm(req, res);
      break;
    default:
      res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`,
      });
  }
});

export default router;

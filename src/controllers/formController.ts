import { Request, Response } from "express";
import Form from "../models/Form";

// GET /api/forms - Get all forms
export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms,
    });
  } catch (err) {
    console.error("Error fetching forms:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// POST /api/forms - Submit a new form
export const submitForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    const newForm = new Form({ name, email, message });
    await newForm.save();
    res.status(201).json({ success: true, data: newForm });
  } catch (err) {
    console.error("Error submitting form:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// GET /api/forms/:id - Get a specific form by ID
export const getFormById = async (req: Request, res: Response) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        error: "Form not found",
      });
    }
    res.status(200).json({ success: true, data: form });
  } catch (err) {
    console.error("Error fetching form:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// PUT /api/forms/:id - Update a form
export const updateForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      { name, email, message },
      { new: true, runValidators: true }
    );

    if (!form) {
      return res.status(404).json({
        success: false,
        error: "Form not found",
      });
    }

    res.status(200).json({ success: true, data: form });
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// DELETE /api/forms/:id - Delete a form
export const deleteForm = async (req: Request, res: Response) => {
  try {
    const form = await Form.findByIdAndDelete(req.params.id);
    if (!form) {
      return res.status(404).json({
        success: false,
        error: "Form not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

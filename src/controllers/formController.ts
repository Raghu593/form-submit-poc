import { Request, Response } from "express";
import Form from "../models/Form";

// @desc    Create new form
// @route   POST /api/forms
export const submitForm = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
    }

    const newForm = new Form({ name, email });
    await newForm.save();

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get all forms
// @route   GET /api/forms
export const getForms = async (req: Request, res: Response) => {
  try {
    const forms = await Form.find();
    res.json({ success: true, count: forms.length, data: forms });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

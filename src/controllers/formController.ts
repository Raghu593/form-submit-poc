import { Request, Response } from "express";
import Form from "../models/Form";

export const submitForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const newForm = new Form({ name, email, message });
    await newForm.save();
    res.status(201).json({ success: true, data: newForm });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
};

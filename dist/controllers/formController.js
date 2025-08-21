"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const Form_1 = __importDefault(require("../models/Form"));
const submitForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newForm = new Form_1.default({ name, email, message });
        await newForm.save();
        res.status(201).json({ success: true, data: newForm });
    }
    catch (err) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};
exports.submitForm = submitForm;

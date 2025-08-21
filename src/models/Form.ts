import mongoose, { Schema, Document } from "mongoose";

export interface IForm extends Document {
  name: string;
  email: string;
}

const FormSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IForm>("Form", FormSchema);

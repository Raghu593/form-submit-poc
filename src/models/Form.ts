import mongoose, { Schema, Document } from "mongoose";

export interface IForm extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const formSchema = new Schema<IForm>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IForm>("Form", formSchema);

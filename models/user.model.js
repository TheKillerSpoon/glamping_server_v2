import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const productSchema = new Schema(
  {
    name: { type: string, required: true },
    email: { type: String, unique: true, required: true },
    Image: { type: String },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.product || mongoose.model("user", productSchema);

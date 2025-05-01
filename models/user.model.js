import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    hashedPassword: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
  },
  { timestamps: true }
);

export default mongoose.models.user || mongoose.model("user", userSchema);

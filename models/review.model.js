import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const ReviewSchema = new Schema(
  {
    review: { type: String, require: true },
    age: { type: Number },
    name: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.review ||
  mongoose.model("review", ReviewSchema);
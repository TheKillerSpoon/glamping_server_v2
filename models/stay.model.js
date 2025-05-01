import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const productSchema = new Schema(
  {
    title: { type: String, require: true },
    numberofperon: { type: Number },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.product ||
  mongoose.model("product", productSchema);

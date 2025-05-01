import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const activitySchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String },
    weekday: { type: String },
    image: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.activity ||
  mongoose.model("activity", activitySchema);
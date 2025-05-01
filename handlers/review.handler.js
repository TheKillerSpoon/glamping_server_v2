import dbConnect from "../dbConnect.js";
import reviewModel from "../models/review.model.js";

// Get alle reviews
export const getreviews = async () => {
  try {
    await dbConnect();
    const reviews = await reviewModel.find({});
    return reviews;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};
// create
export const createreview = async (body) => {
  try {
    await dbConnect();
    const review = await reviewModel.create(body);

    return review;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error);
    // throw stop alt og smid fejlen videre
  }
};

// Get by id
export const getreviewById = async (id) => {
  try {
    await dbConnect();
    const review = await reviewModel.findByIdAndDelete(id);
    return review;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
// Update
export const updatereview = async (body) => {
  try {
    await dbConnect();
    const review = await reviewModel.findById(body.id);

    if (!review) {
      return null;
    }

    const { id, ...updateData } = body;

    const updatedreview = await reviewModel.findByIdAndUpdate(id, updateData);

    return updatedreview;
  } catch (error) {
    throw new Error("Opdatering af review fejlede: " + error.message);
  }
};

// Delete
export const deletedreview = async (id) => {
  try {
    await dbConnect();
    const deletedreview = await reviewModel.findByIdAndDelete(id);
    return deletedreview;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af review", error);
  }
};

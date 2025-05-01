import dbConnect from "../dbConnect.js";
import activityModel from "../models/activity.model.js";

// Get alle activitys
export const getActivities = async () => {
  try {
    await dbConnect();
    const activitys = await activityModel.find({});
    return activitys;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};
// create
export const createActivity = async (body) => {
  try {
    await dbConnect();
    const activity = await activityModel.create(body);

    return activity;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error);
    // throw stop alt og smid fejlen videre
  }
};

// Get by id
export const getActivityById = async (id) => {
  try {
    await dbConnect();
    const activity = await activityModel.findByIdAndDelete(id);
    return activity;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
// Update
export const updateActivity = async (body) => {
  try {
    await dbConnect();
    const activity = await activityModel.findById(body.id);

    if (!activity) {
      return null;
    }

    const { id, ...updateData } = body;

    const updatedActivity = await activityModel.findByIdAndUpdate(id, updateData);

    return updatedActivity;
  } catch (error) {
    throw new Error("Opdatering af activity fejlede: " + error.message);
  }
};

// Delete
export const deletedActivity = async (id) => {
  try {
    await dbConnect();
    const deletedActivity = await activityModel.findByIdAndDelete(id);
    return deletedActivity;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af activity", error);
  }
};

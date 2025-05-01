
import dbConnect from "../dbConnect.js";
import userModel from "../models/user.model.js";

//Get all users 
export const getUsers = async () => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const users = await userModel.find({});

    return users;
  } catch (error) {
    throw new Error("Der skete en fejl", error);
  }
};

// Create
export const createUser = async (body) => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const user = await userModel.create(body);

    return user;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl", error); // Throwing: stop alt og smid fejlen videre til route
  }
};

// Update
export const updateUser = async (body) => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const user = await userModel.findById(body.id);

    if (!user) {
      throw new Error("Produktet blev ikke fundet", error); // Throwing: stop alt og smid fejlen videre til route
    }

    const { id, ...updateData } = body; // Destructuring: id er ikke en del af updateData

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData);
    return updatedUser; // Returner det opdaterede produkt
  } catch (error) {
    throw new Error("Der skete en fejl", error); // Throwing: stop alt og smid fejlen videre til route
  }
};

//Deleted
export const deleteUser = async (id) => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const deleteUser = await userModel.findByIdAndDelete(id);

    return deleteUser;
  } catch (error) {
    throw new Error("Der skete en fejl", error); // Throwing: stop alt og smid fejlen videre til route
  }
};

// Get by ID
export const getUsersById = async (id) => {
  try {
    await dbConnect(); // Ensure the database connection is established
    const user = await userModel.findById(id);
    return user;
  } catch (error) {
    throw new Error("Der skete en fejl", error); // Throwing: stop alt og smid fejlen videre til route
  }
};




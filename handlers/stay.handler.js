import dbConnect from "../dbConnect.js";
import  productModel from "../models/stay.model.js"

// Get alle products
export const getProducts = async () => {
  try {
    await dbConnect();
    const products = await productModel.find({});
    return products;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create
export const createProduct = async (body) => {
 
  try {
        await dbConnect();
    const product = await productModel.create(body);

    return product;
  } catch (error) {
    console.error("Der skete en fejl:", error);
    throw new Error("Der skete en fejl:", error);
    // throw stop alt og smid fejlen videre
  }
};

// Get by id
export const getProductsById = async (id) => {
  
  try {
        await dbConnect();
    const product = await productModel.findByIdAndDelete(id);
    return product;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};

// Update
export const updateProduct = async (body) => {
  try {
    await dbConnect();
    const product = await productModel.findById(body.id);

    if (!product) {
      return null;
    }

    const { id, ...updateData } = body;

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData);

    return updatedProduct;
  } catch (error) {
    throw new Error("Opdatering af produktet fejlede: " + error.message);
  }
};

// Delete
export const deletedProduct = async (id) => {
  try {
    await dbConnect();
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af product", error);
  }
};
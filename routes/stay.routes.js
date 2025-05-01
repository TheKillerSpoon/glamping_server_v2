import express from "express";
import multer from "multer";
import { createProduct, getProducts, getProductsById, updateProduct, deletedProduct} from "../handlers/stay.handler.js";

const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  }, 
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// get alle products
productRoute.get("/products", async (req, res) => {
  try {
    const result = await getProducts();

    return res.status(200).send({
      status: "ok",
      message: "Producterne blev hentet!",
      data: result,
    });
  } catch (error) {
    console.error("Server-fejl", error);
    return res.status(500).send({
      status: "error",
      message: "Server-fejl",
      error: error.message,
    });
  }
});

// Create
productRoute.post("/product", upload.single("image"), async (req, res) => {
  try {
    const { title, description, numberofperon, price, category } = req.body;
    // const image = req.file ? `uploads/products${req.file.filename}` : "";

    if (!title) {
      return res.status(400).send({
        status: "error",
        message: "Produktet skal have en titel!",
      });
    }
    const product = { title, description, numberofperon, price, category };


    // req.file bliver automatisk tilføjet af multer
    if (req.file) {
      product.image =
        process.env.SERVER_HOST + "/products/" + req.file.filename;
    }

    const result = await createProduct(product);

    return res.status(201).send({
      status: "Oprettet",
      message: "Product oprettet!",
      data: result,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);

    return res.status(500).send({
      status: "error",
      message: "Der skete en fejl:",
      error: error.message,
    });
  }
});

// Get by id
productRoute.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "product ID mangler!",
      });
    }

    const product = await getProductsById(id);
    return res.status(200).send({
      status: "ok",
      message: "Product hentet",
      data: product,
    });
  } catch (error) {
    console.error("Fejl ved hentning af product:", error);
    return res.status(500).send({
      status: "error",
      message: "Intern serverfejl",
      error: error.message,
    });
  }
});

// Update
productRoute.put("/product", upload.single("image"), async (req, res) => {
  try {
    const { id, title, description, price, category } = req.body;

    if (!id) {
      return res.status(400).send({
        status: "error",
        product: "Product ID mangler!",
        data: [],
      });
    }

    // Tjekker, om en eller flere af variablerne er undefined eller tomme
    if (!title || !description || !price || !category) {
      return res.status(400).send({
        status: "error",
        message:
          "Produktet mangler title, description, price og/eller category",
        data: [],
      });
    }

    // Saml produktdata i et objekt
    const productData = { id, title, description, price, category };

    // Send det videre som argument til handler
    const result = await updateProduct(productData);

    return res.status(200).send({
      status: "ok",
      message: "Produkt opdateret!",
      data: result,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).send({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete
productRoute.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        status: "error",
        message: "product ID mangler!",
      });
    }
    const result = await deletedProduct(id);

    return res.status(200).send({
      status: "ok",
      message: "Produkt slettet!",
      data: result.title,
    });
  } catch (error) {
    console.error("Der skete en fejl:", error);

    return res.status(500).send({
      status: "error",
      message: "Der skete en fejl:",
      data: result,
      error: error.message,
    });
  }
});

export default productRoute;